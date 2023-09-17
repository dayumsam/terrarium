"use client"

import { useContext } from 'react';
import UserForm from './components/forms/page';
import { useRouter } from 'next/navigation'

import loginwithGoogle from "../firebase/auth/googleAuth"
import logOut from "@/firebase/auth/logout";

import { useAuthContext } from './context/AuthContext';

export default function Home() {

  const router = useRouter()
  const {user} = useAuthContext()
  
  const handleForm = async () => {

    const { result, error } = await loginwithGoogle();

    if (error) {
        return console.log(error)
    }

    console.log(result)
    return router.push("/")
}

  return (
    <div className=' m-auto max-w-sm h-[720px] border-2 border-black '>
      <button onClick={handleForm}>login</button>
      <button onClick={logOut}>logout</button>

      <h1>Hello {user?.displayName}</h1> 
<UserForm/>
    </div>
  )
}
