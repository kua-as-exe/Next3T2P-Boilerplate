import * as React from "react";
import { useState } from "react";
import Link from 'next/link'

export default function Home() {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const handleLogin = (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleLogin}>
      {loginError}
      <label>
        Email: <input type='text' value={user} onChange={(e) => setUser(e.target.value)} />
      </label>
      <label>
        Password: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type='submit'>Submit login</button>

      <Link href='/register'>Register</Link>
    </form>
  )
}
