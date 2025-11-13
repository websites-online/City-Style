import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
  collectionData,
  query,
  orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface AppointmentPayload {
  name: string;
  email: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  notes?: string;
}

export interface AppointmentWithId extends AppointmentPayload {
  id: string;
  createdAt?: any; // kann später genauer typisiert werden
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly firestore = inject(Firestore);

  /** Termin speichern (wie bisher) */
  bookAppointment(payload: AppointmentPayload) {
    const collectionRef = collection(this.firestore, 'appointments');
    return addDoc(collectionRef, {
      ...payload,
      createdAt: serverTimestamp()
    });
  }

  /** Alle Termine laden, sortiert nach Datum & Zeit */
  getAllAppointments(): Observable<AppointmentWithId[]> {
    const collectionRef = collection(this.firestore, 'appointments');
    const q = query(collectionRef, orderBy('date'), orderBy('time'));
    return collectionData(q, { idField: 'id' }) as Observable<AppointmentWithId[]>;
  }
}
