import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

interface Props {
    status: Status
}

const statusMap: Record<Status, { color: 'red' | 'violet' | 'green'; label: string }> = {
    OPEN: { color: 'red', label: 'Open' },
    CLOSED: { color: 'green', label: 'Closed' },
    IN_PROGRESS: { color: 'violet', label: 'In Progress' }
}

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{ statusMap[status].label}</Badge>
  )
}

export default IssueStatusBadge