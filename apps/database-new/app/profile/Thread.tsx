'use client'

import { timeAgo } from '@/lib/utils'
import Link from 'next/link'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconEdit2,
  IconMoreVertical,
  IconTrash2,
} from 'ui'
import ConfirmDeleteThreadModal from './ConfirmDeleteThreadModal'
import EditThreadModal from './EditThreadModal'
import { ThreadType } from './Threads'
import { useState } from 'react'

const Thread = ({
  thread,
}: // handleThreadActions,
// onSelectEdit,
// onSelectDelete,
{
  thread: ThreadType
  // handleThreadActions: (formData: FormData) => void
}) => {
  const formattedTimeAgo = timeAgo(thread.modified_at)

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  //[Joshen] Just FYI Terry sorry i had to peel out your form component here which handled the delete
  // Ideal UX for delete is to have a confirmation modal, and edit to be in a modal too so need client
  // <form action={handleThreadActions} className="flex gap-2 items-center">
  //   <input type="hidden" name="threadID" value={thread.thread_id} />
  // </form>

  return (
    <>
      <Link
        className="flex text-sm group-hover:underline truncate"
        href={`/${thread.thread_id}/${thread.run_id}`}
      >
        <div
          key={thread.id}
          className="group w-full flex flex-row items-center gap-6  border rounded px-5 transition bg-surface-100 hover:bg-surface-200 h-14"
        >
          <div className="flex flex-col grow overflow-hidden">
            <span className="truncate">{thread.thread_title}</span>

            <span className="text-xs text-foreground-light">Last updated {formattedTimeAgo}</span>
          </div>
          <div className="flex shrink">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="text" icon={<IconMoreVertical />} className="px-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32" align="end">
                <DropdownMenuItem className="space-x-2" onClick={() => setEditOpen(true)}>
                  <IconEdit2 size={14} />
                  <p>Edit name</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="space-x-2" onClick={() => setDeleteOpen(true)}>
                  <IconTrash2 size={14} />
                  <p>Delete thread</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Link>

      <ConfirmDeleteThreadModal
        key={`${thread.id}-delete-dialog`}
        thread={thread}
        visible={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
      <EditThreadModal
        key={`${thread.id}-edit-dialog`}
        thread={thread}
        visible={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </>
  )
}

export default Thread
