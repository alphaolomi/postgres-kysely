'use client'

import { redirect } from 'next/navigation'
import { useState, useTransition } from 'react'

export default function CreatePage() {
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)

  const isMutating = isFetching || isPending;


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsFetching(true)
    const formData = new FormData(event.currentTarget)
   const response = await fetch('/api/users', {
      method: 'POST',
      body: formData,
    })
    if (response.ok) {
      const user = await response.json()
      alert(`User ${user.name} created!`)
      startTransition(() => {
        redirect('/')
      })
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add User</h1>
        <label htmlFor='name'>
          Name:
          <input type='text' name='name' id='name' />
        </label>
        <label htmlFor='email'>
          Email:
          <input type='email' name='email' id='email' />
        </label>
        <label htmlFor='image'>
          Image:
          <input type='url' name='image' id='image' />
        </label>
        <button type='submit'
          disabled={isMutating} 
        >
          {isMutating ? 'Loading...' : 'Add'}
        </button>
      </form>
    </div>
  )
}
