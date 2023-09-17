import { NextResponse } from 'next/server'

export async function POST(NextRequest) {

    const axios = require("axios");
    const body = await NextRequest.json()

    console.log(body.data[0].calories_data)

    const xp = Math.round(body?.data[0].calories_data.net_activity_calories)

    lvl = (round((pow(x, 3))20))
    strength = round(strength 1.05)
    endurance = round(endurance * 1.025)

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