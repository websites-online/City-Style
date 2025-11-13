// Firebase Functions v2 (Callable)
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

initializeApp();
const db = getFirestore();

type BookPayload = { date: string; time: string; serviceId: string; };

export const bookSlot = onCall({ region: 'europe-west1' }, async (request) => {
  const { date, time, serviceId } = (request.data || {}) as Partial<BookPayload>;
  const uid = request.auth?.uid;

  if (!uid) throw new HttpsError('unauthenticated', 'Login required');
  if (!date || !time || !serviceId) throw new HttpsError('invalid-argument', 'date, time, serviceId required');

  const slotRef = db.doc(`timeslots/${date}/slots/${time}`);
  const bookingRef = db.collection('bookings').doc();

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(slotRef);
    if (snap.exists && snap.get('booked') === true) {
      throw new HttpsError('already-exists', 'Slot already booked');
    }
    tx.set(slotRef, {
      booked: true,
      serviceId,
      by: uid,
      bookedAt: FieldValue.serverTimestamp(),
      createdAt: snap.exists ? (snap.get('createdAt') ?? FieldValue.serverTimestamp()) : FieldValue.serverTimestamp()
    }, { merge: true });

    tx.set(bookingRef, {
      slotPath: slotRef.path,
      userId: uid,
      serviceId,
      createdAt: FieldValue.serverTimestamp()
    });
  });

  return { ok: true };
});
