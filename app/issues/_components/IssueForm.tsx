'use client';

import { Button, Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue
}

const IssueForm = ({ issue }: Props) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues/list');
      router.refresh(); 
    } catch (error) {
      setIsSubmitting(false);
      setError('Failed to create issue');
    }
  })

  return (
    <div className="max-w-xl">
      {error && <Callout.Root color="red" className="mb-5">
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>}
      <form className='space-y-3' onSubmit={onSubmit}>
          <TextField.Root defaultValue={issue?.title} placeholder= 'Title' {...register('title')} />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          <Controller
            name="description"
            defaultValue={issue?.description}
            control={control}
            render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
          />
          {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
          <Button disabled={isSubmitting}>
            {issue ? 'Update Issue' : 'Submit New Issue'}{' '}{isSubmitting && <Spinner />}
          </Button>
      </form>
    </div>
  )
}

export default IssueForm