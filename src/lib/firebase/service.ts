/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { addDoc, where, query, collection, doc, getDoc, getDocs, getFirestore, updateDoc, deleteDoc } from 'firebase/firestore';
import app from './init';

const firestore = getFirestore(app);

export async function retriveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retriveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function retriveDataByField(collectionName: string, field: string, value: string) {
  const q = query(collection(firestore, collectionName), where(field, '==', value));

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function addData(collectionName: string, data: any, callback: (success: boolean, result?: any) => void): Promise<void> {
  try {
    await addDoc(collection(firestore, collectionName), data);
    callback(true);
  } catch (error) {
    callback(false);
    console.log(error);
  }
}

export async function updateData(collectionName: string, id: string, data: any, callback: Function) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}

export async function deleteData(collectionName: string, id: string, callback: Function) {
  const docRef = doc(firestore, collectionName, id);
  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
}