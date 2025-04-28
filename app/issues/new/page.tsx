'use client';

import { Button, Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic'
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = useState('');

  return (
    <div className="max-w-xl">
      {error && <Callout.Root color="red" className="mb-5">
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>}
      <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues'); 
        } catch (error) {
          setError('Failed to create issue');
        }
      })}>
          <TextField.Root placeholder= 'Title' {...register('title')} />
          <Controller
            name="description"
            control={control}
            render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
          />

          <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage