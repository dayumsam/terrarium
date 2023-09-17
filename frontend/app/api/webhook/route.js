import { NextResponse } from 'next/server'

import { app, db } from '@/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(NextRequest) {

    const axios = require("axios");
    const body = await NextRequest.json()

    const createCreature = async (data) => {
        const user = data.user_id
        const level = 1
        const name = "Aria Evergreen"
        const xp = 1
        const strength = Number((data.measurements_data.measurements[0].lean_mass_g + data.measurements_data.measurements[0].muscle_mass_g) / 2)
        const endurance = Number((100 - data.measurements_data.measurements[0].bodyfat_percentage) + (data.measurements_data.measurements[0].water_percentage - 50))
        const stamina = Number((data.measurements_data.measurements[0].muscle_mass_g + data.measurements_data.measurements[0].lean_mass_g) / 2 + (90 - data.measurements_data.measurements[0].estimated_fitness_age))

        await addDoc(collection(db, "pets"),
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

    if (body.type == "body") {
        createCreature(body.data[0]);
    }

    else if ((body.type === "activity")) {
        updateStats(body.data[0]);
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