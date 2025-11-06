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
    { value: 'damenhaarschnitt', label: 'Damenhaarschnitt & Styling' },
    { value: 'herrenhaarschnitt', label: 'Herrenhaarschnitt' },
    { value: 'kinderhaarschnitt', label: 'Kinderhaarschnitt (bis 12 Jahre)' },
    { value: 'balayage', label: 'Balayage / Strähnen' },
    { value: 'ansatzfarbe', label: 'Ansatzfarbe' },
    { value: 'intensivtoenung', label: 'Intensivtönung / Gloss' },
    { value: 'keratin-treatment', label: 'Keratin Treatment' },
    { value: 'pflegekur', label: 'Pflegekur & Kopfhautmassage' },
    { value: 'event-styling', label: 'Event- / Brautstyling' }
  ];

  protected readonly stylists: Option[] = [
    { value: 'egal', label: 'Beliebig' },
    { value: 'max', label: 'Max' },
    { value: 'filip', label: 'Filip' },
    { value: 'marko', label: 'Marko' }
  ];

  protected readonly timeSlots = this.createTimeSlots(9, 20, 30);
  protected readonly appointmentForm: FormGroup;
  protected submitted = false;
  protected selectedTime: string | null = null;

  constructor(private readonly formBuilder: FormBuilder) {
    this.appointmentForm = this.formBuilder.group({
      service: ['', Validators.required],
      stylist: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      notes: ['']
    });
  }

  selectTime(slot: string): void {
    this.selectedTime = slot;
    const control = this.appointmentForm.get('time');
    control?.setValue(slot);
    control?.markAsDirty();
    control?.markAsTouched();
  }

  submit(): void {
    this.submitted = true;
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    console.table(this.appointmentForm.value);
    this.appointmentForm.reset();
    this.selectedTime = null;
  }

  private createTimeSlots(startHour: number, endHour: number, intervalMinutes: number): string[] {
    const slots: string[] = [];
    const startTotal = startHour * 60;
    const endTotal = endHour * 60;

    for (let minutes = startTotal; minutes <= endTotal; minutes += intervalMinutes) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }

    return slots;
  }
}
