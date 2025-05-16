import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import React from 'react'

const DeleteIssueButton = ({ issueId }: {issueId: number}) => {
  return (
    <Button color="red">
        <Pencil2Icon />
        Delete Issue
    </Button>
  )
}

export default DeleteIssueButton