import { NextResponse } from 'next/server'

import { db } from '@/firebase/config';
import { collection, getDocs, updateDoc } from 'firebase/firestore';

export async function POST(request) {

    const querySnapshot = await getDocs(collection(db, "pets"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data())

        const currentStats = doc.data()
        currentStats['rest'] -= Math.round(Number(Math.random() * 10))
        currentStats['energy'] -= Math.round(Number(Math.random() * 10))

        updateDoc(doc.ref, currentStats);
    });

    return { status: 200 }
}