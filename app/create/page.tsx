import { db } from '@/lib/kysely'
import { redirect } from 'next/navigation'

async function create(formData: FormData) {
  'use server'
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const image = formData.get('image') as string

  const result = await db.insertInto('users').values({ name, email, image }).executeTakeFirst()

  console.log("insertId", result.insertId)

  redirect(`/`)
}

export default function CreatePage() {
  return (
    <div>
      <form action={create} method='post' >
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
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
