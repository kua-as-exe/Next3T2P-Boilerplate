import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import axios from 'axios'
import { useRouter } from "next/router";
import { API } from "lib/utils/trpc";

export default function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = API.auth.register.useMutation({})

  const router = useRouter()

  const registerUser = async (event) => {
    event.preventDefault();

    register.mutateAsync({
      username,
      email,
      password,
    }).then(( user ) => {
        console.log("THEN", user)

    }).catch(( error ) => {
      console.error("ERR", error)
    })

  }

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={registerUser}>
        <label>
          Username: <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Email: <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type='submit'>Register User</button>

        <Link href='/register'>Register</Link>
      </form>
    </>
  )
}
