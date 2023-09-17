import { NextResponse } from 'next/server'

import { app, db } from '@/firebase/config';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export async function POST(NextRequest) {

    const axios = require("axios");
    const body = await NextRequest.json()

    const createCreature = async (data, uid) => {
        const user = String(uid)
        const level = 1
        const name = String("Aria Evergreen")
        const xp = 1
        const strength = Math.trunc(Number((data.measurements_data.measurements[0].lean_mass_g + data.measurements_data.measurements[0].muscle_mass_g) / 2))
        const endurance = Math.trunc(Number((100 - data.measurements_data.measurements[0].bodyfat_percentage) + (data.measurements_data.measurements[0].water_percentage - 50)))
        const stamina = Math.trunc(Number((data.measurements_data.measurements[0].muscle_mass_g + data.measurements_data.measurements[0].lean_mass_g) / 2 + (90 - data.measurements_data.measurements[0].estimated_fitness_age)))

        await setDoc(doc(db, "pets", uid),
            {
                uid: user,
                level: level,
                name: name,
                xp: xp,
                strength: strength,
                endurance: endurance,
                stamina: stamina,
            });
    }

    const updateStats = async (data, uid) => {
        const docRef = doc(db, "pets", uid)
        const docSnap = await getDoc(docRef);

        const currentStats = docSnap.data()

        const calories = Math.trunc(Number(data.calories_data.net_activity_calories))

        if ((currentStats['xp'] + calories) >= Math.round(Math.pow(currentStats['level'], 3) * 20)) {
            currentStats['strength'] = Math.round(currentStats['strength'] * 1.0080) + 3
            currentStats['endurance'] = Math.round(currentStats['endurance'] * 1.025)
            currentStats['stamina'] = Math.round(Math.log(Math.pow(currentStats['level'], 5)) * 3) + 1
            currentStats['level'] += 1
        }

        currentStats['xp'] += calories

        updateDoc(docRef, currentStats);
    }

    if (body.type == "body") {
        if (!(await getDoc(doc(db, "pets", body.user.user_id))).data()) {
            createCreature(body.data[0], body.user.user_id);
        }
        else {
            console.log("error")
            return NextResponse.json({ "error": "invalid method" }, { status: 200 })
        }
    }

    else if ((body.type === "activity")) {
        updateStats(body.data[0], body.user.user_id);
    }
    // lvl = (round((pow(x, 3))20))
    // strength = round(strength 1.05)
    // endurance = round(endurance * 1.025)

    // response = body

    //   try {
    //     const options = {
    //       method: 'POST',
    //       url: 'https://tldrthis.p.rapidapi.com/v1/model/extractive/summarize-url/',
    //       headers: {
    //         'content-type': 'application/json',
    //         'X-RapidAPI-Key': process.env.RAPIDAPI,
    //         'X-RapidAPI-Host': 'tldrthis.p.rapidapi.com'
    //       },
    //       data: `{"url":"${body['url']}","num_sentences":10,"is_detailed":true}`
    //     };

    //     const { data, error } = await axios.request(options)
    //     const response = data

    //     if (error) throw new Error(error)

    return NextResponse.json({ body }, { status: 200 })
    // } catch (error) {
    //     return NextResponse.json({ error: error.message }, { status: 500 })
    // }
}