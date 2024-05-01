# Copyright (c) 2024, Abhinav jain and contributors
# For license information, please see license.txt

import frappe
import datetime
from frappe.model.document import Document

class Student(Document):

    def before_save(self):
        self.full_name = f'{self.first_name} {self.middle_name or ""} {self.last_name or ""}'


@frappe.whitelist()
def create_user_if_not_exists(name):

    if not frappe.db.exists("User", name):
        # Fetch student details
        student = frappe.get_doc("Student", name)
        
        # Create a new user document
        new_user = frappe.new_doc("User")
        new_user.first_name = student.first_name
        new_user.last_name = student.last_name
        new_user.email = student.email
        new_user.append("roles", {
            "role": "Student"  
        })
        
        # Save the user
        new_user.insert(ignore_permissions=True)  
        
        frappe.msgprint("User created successfully.")
    else:
        frappe.msgprint("User already exists.")