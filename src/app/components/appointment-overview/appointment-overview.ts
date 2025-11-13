import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, AppointmentWithId } from '../../services/booking.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-appointment-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-overview.html',
  styleUrl: './appointment-overview.css'
})
export class AppointmentOverviewComponent {
  private readonly bookingService = inject(BookingService);

  appointments$: Observable<AppointmentWithId[]> = this.bookingService.getAllAppointments();
}
