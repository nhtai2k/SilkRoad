import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-table-row',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss'
})
export class TableRowComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' }
  ];

  addUserForm: FormGroup;
  editUserForm: FormGroup;
  editingUserId: number | null = null;
  showAddForm = false;

  constructor(private fb: FormBuilder) {
    this.addUserForm = this.createUserForm();
    this.editUserForm = this.createUserForm();
  }

  // Create form with validation
  private createUserForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]]
    });
  }

  // Add new user
  addUser() {
    if (this.addUserForm.valid) {
      const formValue = this.addUserForm.value;
      const maxId = Math.max(...this.users.map(u => u.id), 0);
      const newUser: User = {
        id: maxId + 1,
        name: formValue.name,
        email: formValue.email,
        role: formValue.role
      };
      this.users.push(newUser);
      this.resetAddForm();
      this.showAddForm = false;
    } else {
      this.markFormGroupTouched(this.addUserForm);
    }
  }

  // Start editing a user
  editUser(user: User) {
    this.editingUserId = user.id;
    this.editUserForm.patchValue({
      name: user.name,
      email: user.email,
      role: user.role
    });
    this.showAddForm = false;
  }

  // Save edited user
  saveUser() {
    if (this.editUserForm.valid && this.editingUserId !== null) {
      const formValue = this.editUserForm.value;
      const index = this.users.findIndex(u => u.id === this.editingUserId);
      if (index !== -1) {
        this.users[index] = {
          id: this.editingUserId,
          name: formValue.name,
          email: formValue.email,
          role: formValue.role
        };
      }
      this.editingUserId = null;
      this.editUserForm.reset();
    } else {
      this.markFormGroupTouched(this.editUserForm);
    }
  }

  // Cancel editing
  cancelEdit() {
    this.editingUserId = null;
    this.editUserForm.reset();
  }

  // Delete user
  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(u => u.id !== id);
      if (this.editingUserId === id) {
        this.editingUserId = null;
        this.editUserForm.reset();
      }
    }
  }

  // Show add form
  showAddUserForm() {
    this.showAddForm = true;
    this.editingUserId = null;
    this.resetAddForm();
  }

  // Cancel add
  cancelAdd() {
    this.showAddForm = false;
    this.resetAddForm();
  }

  // Reset add user form
  private resetAddForm() {
    this.addUserForm.reset();
  }

  // Mark all form controls as touched to show validation errors
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Get form control for validation display
  getFormControl(form: FormGroup, controlName: string) {
    return form.get(controlName);
  }

  // Check if form control has error
  hasError(form: FormGroup, controlName: string, errorType: string): boolean {
    const control = form.get(controlName);
    return !!(control && control.errors && control.errors[errorType] && control.touched);
  }

  // Get error message for form control
  getErrorMessage(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);
    if (control && control.errors && control.touched) {
      if (control.errors['required']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['maxlength']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must not exceed ${control.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  // TrackBy function for better performance
  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
