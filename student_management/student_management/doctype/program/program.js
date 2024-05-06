// Copyright (c) 2024, Abhinav jain and contributors
// For license information, please see license.txt

frappe.ui.form.on("Program", {
    onload: function(frm) {

        // Filter employee list based on type
        frm.set_query('instructor', () => {
            return {
                filters: {
                    "type": 'Instructor'
                }
            };
        });
    },


    after_save: function(frm) {
        
        // Calculate total credits
        frm.call({
            doc: frm.foc,
            method: 'student_management.student_management.doctype.program.program.calculate_credits', 
            args:{
                courses: frm.doc.courses,
            },
            callback:function(r){
               credits = parseFloat(r.message);
                frm.set_value('total_credits', credits);
            }   
           
        })
       
    },

});

frappe.ui.form.on('Participant', {
    // Add event listener for changes in the "preview" field
    preview: function(frm, cdt, cdn) {
        var item = locals[cdt][cdn];
        var student = item.student;

        // Call the server-side function to get the profile image URL
        frappe.call({
            method: 'student_management.student_management.doctype.program.program.get_student_profile_image',
            args: {
                student: student
            },
            callback: function(response) {
                console.log(response)
                if (response.message) {
                    var image_url = response.message;
                    // Call a function to show the preview with the student's profile image
                    showPreview(image_url);
                }
            }
        });
    }
});


// Function to show image preview in a modal
function showPreview(image_url) {
    // Create a modal dialog
    var dialog = new frappe.ui.Dialog({
        title: 'Image Preview',
        fields: [
            {
                fieldtype: 'HTML',
                fieldname: 'preview_area',
                label: 'Preview',
                options: `<img src="${image_url}" style="max-width: 100%; max-height: 100%;" />`
            }
        ],
        primary_action_label: 'Close',
        primary_action: function() {
            dialog.hide();
        }
    });

    // Show the modal dialog
    dialog.show();
}
