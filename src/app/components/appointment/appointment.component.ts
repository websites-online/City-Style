import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  protected readonly services: Option[] = [
    { value: 'signature-cut', label: 'Signature Cut' },
    { value: 'balayage', label: 'Balayage & Color' },
    { value: 'styling', label: 'Runway Styling' },
    { value: 'grooming', label: 'Grooming Deluxe' }
  ];

  protected readonly stylists: Option[] = [
    { value: 'lara', label: 'Lara · Colour Artist' },
    { value: 'milan', label: 'Milan · Master Stylist' },
    { value: 'sora', label: 'Sora · Texture Specialist' }
  ];

  protected readonly appointmentForm: FormGroup;
  protected submitted = false;

  constructor(private readonly formBuilder: FormBuilder) {
    this.appointmentForm = this.formBuilder.group({
      service: ['', Validators.required],
      stylist: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      notes: ['']
    });
  }

  submit(): void {
    this.submitted = true;
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    console.table(this.appointmentForm.value);
    this.appointmentForm.reset();
  }
}
