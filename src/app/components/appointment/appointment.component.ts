import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService, AppointmentPayload } from '../../services/booking.service';

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
  private readonly formBuilder = inject(FormBuilder);
  private readonly bookingService = inject(BookingService);

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

  protected readonly timeSlots = this.createTimeSlots(8, 21, 30);

  protected readonly appointmentForm: FormGroup = this.formBuilder.group({
    service: ['', Validators.required],
    stylist: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    notes: ['']
  });

  protected selectedTime: string | null = null;
  protected isSubmitting = false;
  protected submitError = '';
  protected submitSuccess = false;
  protected submitted = false;

  selectTime(slot: string): void {
    this.selectedTime = slot;
    const control = this.appointmentForm.get('time');
    control?.setValue(slot);
    control?.markAsDirty();
    control?.markAsTouched();
  }

  async submit() {
    this.submitted = true;
    this.submitError = '';
    this.submitSuccess = false;

    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    const val: AppointmentPayload = this.appointmentForm.value;

    this.isSubmitting = true;
    try {
      await this.bookingService.bookAppointment(val);
      this.submitSuccess = true;
      this.appointmentForm.reset();
      this.selectedTime = null;
      this.submitted = false;
    } catch (e: any) {
      const msg = e?.message || '';
      this.submitError = msg || 'Ups! Termin konnte nicht gespeichert werden. Bitte versuche es später erneut.';
      console.error('Firebase booking error:', e);
    } finally {
      this.isSubmitting = false;
    }
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
