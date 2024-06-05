'use client'

import { Checkbox_Shadcn_ } from 'ui'

export default function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox_Shadcn_ id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  )
}
