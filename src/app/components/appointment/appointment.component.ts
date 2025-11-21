// src/app/components/appointment/appointment.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
    // Herren
    { value: 'herren-schneiden-foehnen', label: 'Herren · Schneiden/Föhnen' },
    { value: 'herren-waschen-schneiden-foehnen', label: 'Herren · Waschen/Schneiden/Föhnen' },
    { value: 'herren-nassrasur', label: 'Herren · Nassrasur' },
    { value: 'herren-schneiden-formen-schere', label: 'Herren · Schneiden/Formen mit Schere' },
    { value: 'herren-bart-stutzen', label: 'Herren · Bart stutzen' },
    { value: 'herren-bart-formen', label: 'Herren · Bart formen' },
    { value: 'herren-augenbrauen-faden', label: 'Herren · Augenbrauen zupfen mit Faden' },
    { value: 'herren-wachs-gesicht', label: 'Herren · Wachs Gesicht komplett' },
    { value: 'herren-augenbrauen-messer', label: 'Herren · Augenbrauen mit Messer' },
    { value: 'herren-farbe-strahnen', label: 'Herren · Farbe/Strähnen' },
    { value: 'herren-dauerwelle', label: 'Herren · Dauerwelle' },
    { value: 'herren-haare-glaettung', label: 'Herren · Haare Glättung' },
    { value: 'herren-haare-waschen', label: 'Herren · Haare Waschen' },

    // Damen
    { value: 'damen-waschen-schneiden-kurz', label: 'Damen · Waschen/Schneiden (kurz)' },
    { value: 'damen-waschen-schneiden-lang', label: 'Damen · Waschen/Schneiden (lang)' },
    { value: 'damen-waschen-schneiden-foehnen', label: 'Damen · Waschen/Schneiden/Föhnen' },
    { value: 'damen-haarmaske', label: 'Damen · Haarmaske' },
    { value: 'damen-pony-schneiden', label: 'Damen · Pony schneiden' },
    { value: 'damen-ansaetze-faerben', label: 'Damen · Ansätze färben' },
    { value: 'damen-komplett-faerben', label: 'Damen · Komplett färben' },
    { value: 'damen-strahnen-oberkopf', label: 'Damen · Strähnen am Oberkopf' },
    { value: 'damen-strahnen-komplett', label: 'Damen · Strähnen komplett' },
    { value: 'damen-foehnen', label: 'Damen · Föhnen' },
    { value: 'damen-dauerwelle', label: 'Damen · Dauerwelle' },
    { value: 'damen-haare-glaettung', label: 'Damen · Haare Glättung' },
    { value: 'damen-augenbrauen-faden', label: 'Damen · Augenbrauen zupfen (Faden)' },
    { value: 'damen-augenbrauen-faerben', label: 'Damen · Augenbrauen färben' },
    { value: 'damen-wimpern-faerben', label: 'Damen · Wimpern färben' },
    { value: 'damen-balayage', label: 'Damen · Balayage' },

    // Kinder
    { value: 'kinder-jungs-bis-7', label: 'Kinder · Jungs bis 7 Jahre' },
    { value: 'kinder-maedchen-bis-7', label: 'Kinder · Mädchen bis 7 Jahre' }
  ];

  protected readonly stylists: Option[] = [
    { value: 'egal', label: 'Beliebig' },
    { value: 'mahmoud', label: 'Mahmoud' },
    { value: 'tarek', label: 'Tarek' }
  ];

  protected readonly timeSlots = this.createTimeSlots(8, 21, 30);

  protected readonly appointmentForm: FormGroup = this.formBuilder.group({
    service: ['', Validators.required],
    stylist: ['', Validators.required],
    date: ['', [Validators.required, this.validateAllowedWeekdays.bind(this)]],
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
    console.log('✅ submit() aufgerufen');

    this.submitted = true;
    this.submitError = '';
    this.submitSuccess = false;

    if (this.appointmentForm.invalid) {
      console.warn('❌ Formular ist ungültig', this.appointmentForm.value);
      this.appointmentForm.markAllAsTouched();
      return;
    }

    const val: AppointmentPayload = this.appointmentForm.value;
    console.log('📦 Payload für Firestore & Mail:', val);

    this.isSubmitting = true;
    try {
      // Schritt 1: Termin in Firestore speichern
      console.log('💾 Speichere Termin in Firestore …');
      await this.bookingService.bookAppointment(val);
      console.log('✅ Termin in Firestore gespeichert');

      // Schritt 2: Email-Versand über Vercel + Resend
      console.log('📨 Sende Daten an Vercel/Resend …');
      const response = await fetch('https://city-style-mail-api.vercel.app/api/send-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(val)
      });

      console.log('🔁 Response von Vercel:', response.status, response.statusText);
      let bodyText = '';
      try {
        bodyText = await response.text();
        console.log('📨 Response-Body:', bodyText);
      } catch (e) {
        console.warn('Konnte Response-Body nicht lesen', e);
      }

      if (!response.ok) {
        throw new Error(`E-Mail API Fehler: ${response.status} ${bodyText}`);
      }

      this.submitSuccess = true;
      this.appointmentForm.reset();
      this.selectedTime = null;
      this.submitted = false;
      console.log('🎉 Alles erfolgreich – Termin + E-Mails');

    } catch (e: any) {
      console.error('❌ Fehler bei Buchung oder Mail-Versand:', e);
      this.submitError = 'Ups! Etwas ist schiefgelaufen. Bitte versuche es erneut.';
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

  private validateAllowedWeekdays(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const day = new Date(control.value).getDay(); // 0 = Sonntag, 1 = Montag, ... 6 = Samstag
    if (day === 0 || day >= 5) {
      return { disallowedDay: true };
    }
    return null;
  }
}
