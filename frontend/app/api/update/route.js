"use client"

import { NextResponse } from 'next/server'

import { useAuthContext } from './context/AuthContext';

export async function POST(NextRequest) {
    const { user } = useAuthContext()

    const docRef = doc(db, "pets", user.uid)
    const docSnap = await getDoc(docRef);

    const currentStats = docSnap.data()

    currentStats['sleep'] -= Math.round(Number(Math.random() * 10))
    currentStats['energy'] -= Math.round(Number(Math.random() * 10))

    updateDoc(docRef, currentStats);

    return NextResponse.json({ status: 200 })
}