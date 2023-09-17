"use client"

import { useContext, useState, useEffect } from 'react';
import UserForm from './components/forms/page';
import { useRouter } from 'next/navigation'
import Image from 'next/image';

import loginwithGoogle from "../firebase/auth/googleAuth"
import logOut from "@/firebase/auth/logout";

import { useAuthContext } from './context/AuthContext';

import { app, db } from '@/firebase/config';
import { doc, onSnapshot } from "firebase/firestore";

import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

export default function Home() {

  const router = useRouter()
  const { user } = useAuthContext()

  const [data, setData] = useState({})
  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "pets", user.uid), (doc) => {
        setData(doc.data())
      });
      return () => {
        unsub();
      };
    }
  }, [user]);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#4a723e", // Set your desired background color
      height: 20, // Increase the height of the progress bar
    },
  }));

  const handleForm = async () => {

    const { result, error } = await loginwithGoogle();

    if (error) {
      return console.log(error)
    }

    console.log(result)
    return router.push("/")
  }

  return (
    <div className='m-auto max-w-md p-6 border-8 border-black rounded-3xl shadow-lg'>
      <div className='flex justify-between items-center mb-4'>
        <p className='text-2xl font-bold'>Hello {user?.displayName}</p>
        {!user ? (
          <button
            onClick={handleForm}
            className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
          >
            Login
          </button>
        ) : (
          <button
            onClick={logOut}
            className='px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300'
          >
            Logout
          </button>
        )}
      </div>
      {
        Object.keys(data).length == 0 ? <p>Generate pet</p> :
          <div className='text-lg font-semibold'>
            <div className='my-3'>
              <Image
                src="/avatar.png"
                alt="Avatar"
                width={500}
                height={300}
              />
            </div>
            <span className='block text-3xl font-bold'>{data.name} (lvl: {data.level})</span>
            <span className='block text-2xl font-bol'>{data.xp}/{Math.round(Math.pow(data.level, 3) * 20)}</span>
            <div className="mt-4">
              <BorderLinearProgress variant="determinate" value={(data.strength / 500) * 100} />
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold">Strength:</p>
              <span className="ml-2">{data.strength}</span>
            </div>

            <div className="mt-4">
              <BorderLinearProgress variant="determinate" value={(data.endurance / 500) * 100} />
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold">Endurance:</p>
              <span className="ml-2">{data.endurance}</span>
            </div>

            <div className="mt-4">
              <BorderLinearProgress variant="determinate" value={(data.stamina / 500) * 100} />
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold">Stamina:</p>
              <span className="ml-2">{data.stamina}</span>
            </div>

            <div className="mt-4">
              <BorderLinearProgress variant="determinate" value={data.rest} />
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold">Rest:</p>
              <span className="ml-2">{data.rest}</span>
            </div>

            <div className="mt-4">
              <BorderLinearProgress variant="determinate" value={data.energy} />
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold">Energy:</p>
              <span className="ml-2">{data.energy}</span>
            </div>
          </div>
      }
    </div>
  )
}
