'use client'

import React, { createRef, useEffect } from 'react'
import { cn } from '../../lib/utils'
import { TextArea } from '../shadcn/ui/text-area'

export interface ExpandingTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * This is a custom TextArea component that expands based on the content.
 */
const ExpandingTextArea = ({ className, value, ...props }: ExpandingTextAreaProps) => {
  const textAreaRef = createRef<HTMLTextAreaElement>()

  /**
   * This effect is used to resize the textarea based on the content
   */
  useEffect(() => {
    if (textAreaRef) {
      if (!value && textAreaRef && textAreaRef.current) {
        textAreaRef.current.style.height = '40px'
      } else if (textAreaRef && textAreaRef.current) {
        const newHeight = textAreaRef.current.scrollHeight + 'px'
        textAreaRef.current.style.height = newHeight
      }
    }
  }, [value, textAreaRef])

  return (
    <TextArea
      ref={textAreaRef}
      rows={1}
      aria-expanded={false}
      className={cn('transition-all resize-none leading-6 box-border', className)}
      value={value}
      {...props}
    />
  )
}

ExpandingTextArea.displayName = 'ExpandingTextArea'

export { ExpandingTextArea }
