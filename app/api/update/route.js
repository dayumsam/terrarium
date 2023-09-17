import { NextResponse } from 'next/server'

import { db } from '@/firebase/config';
import { collection, getDocs, updateDoc } from 'firebase/firestore';

export async function GET(request) {

    const querySnapshot = await getDocs(collection(db, "pets"));
    querySnapshot.forEach((doc) => {

        const currentStats = doc.data()
        currentStats['rest'] -= Math.round(Number(Math.random() * 10))
        currentStats['energy'] -= Math.round(Number(Math.random() * 10))

        updateDoc(doc.ref, currentStats);
    });

    return NextResponse.json({ status: 200 })
}