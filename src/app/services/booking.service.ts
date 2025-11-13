import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

export interface AppointmentPayload {
  name: string;
  email: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  notes?: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly firestore = inject(Firestore);

  bookAppointment(payload: AppointmentPayload) {
    const collectionRef = collection(this.firestore, 'appointments');
    return addDoc(collectionRef, {
      ...payload,
      createdAt: serverTimestamp()
    });
  }
}
