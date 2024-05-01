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

