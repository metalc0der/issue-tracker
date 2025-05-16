import React from 'react'
import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  { 
    loading: () => <IssueFormSkeleton />
  }
);
interface Props {
    params: { id: string }
}

const EditIssuePage = async (props: Props) => {
    const params = await props.params;

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue) {
        notFound();
    }

  return (
    <IssueForm issue={issue} />
  )
}

export default EditIssuePage