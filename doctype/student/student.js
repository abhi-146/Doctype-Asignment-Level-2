// Copyright (c) 2024, Abhinav jain and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Student", {
// 	refresh(frm) {

// 	},
frappe.ui.form.on('Student', {
    refresh: function(frm) {
        
        frm.add_custom_button(__('Create User'), function() {
            frappe.call({
                method: 'student_management.student_management.doctype.student.student.create_user_if_not_exists',
                args: {
                    name: frm.doc.name
                },
                callback: function(response) {
                    if (response.message) {
                        frappe.msgprint(response.message);
                    } else {
                        frappe.msgprint('Failed to create user.');
                    }
                }
            });
        });
    },

});



// function create_user(frm) {

//     var email = frm.doc.email;
//     var first_name = frm.doc.first_name;
    
//     if (!email) {
//         frappe.msgprint('Please provide an email address.');
//         return;
//     }

//     frappe.call({
//         method: 'student_management.student_management.doctype.student.student.create_user_if_not_exists',
//         args: {
//             email: email,
//             first_name: first_name
//         },
//         callback: function(r) {
//             if (r.message === 'exists') {
//                 frappe.msgprint('User already exists.');
//             } else if (r.message === 'created') {
//                 frappe.msgprint('User created successfully.');
//             }
//         }
//     });
// }