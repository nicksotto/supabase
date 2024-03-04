'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode, forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import {
  Admonition,
  AlertDescription_Shadcn_,
  AlertTitle_Shadcn_,
  Alert_Shadcn_,
  Button,
  DialogContent_Shadcn_,
  DialogSectionSeparator_Shadcn_,
  DialogSection_Shadcn_,
  DialogTitle_Shadcn_,
  Dialog_Shadcn_,
  FormControl_Shadcn_,
  FormDescription_Shadcn_,
  FormField_Shadcn_,
  FormItem_Shadcn_,
  FormLabel_Shadcn_,
  FormMessage_Shadcn_,
  Form_Shadcn_,
  IconAlertCircle,
  Input_Shadcn_,
} from 'ui'
import { z } from 'zod'

export interface TextConfirmModalProps {
  loading: boolean
  visible: boolean
  title: string
  size?: React.ComponentProps<typeof DialogContent_Shadcn_>['size']
  cancelLabel?: string
  confirmLabel?: string
  confirmPlaceholder: string
  confirmString: string
  text?: string | ReactNode
  onConfirm: () => void
  onCancel: () => void
  variant: React.ComponentProps<typeof Alert_Shadcn_>['variant']
  alert?: {
    base?: React.ComponentProps<typeof Alert_Shadcn_>
    title?: string
    description?: string
  }
  input?: React.ComponentProps<typeof Input_Shadcn_>
  label?: React.ComponentProps<typeof FormLabel_Shadcn_>
  formMessage?: React.ComponentProps<typeof FormMessage_Shadcn_>
  description?: React.ComponentProps<typeof FormDescription_Shadcn_>
  blockDeleteButton?: boolean
}

const TextConfirmModal = forwardRef<
  React.ElementRef<typeof DialogContent_Shadcn_>,
  React.ComponentPropsWithoutRef<typeof Dialog_Shadcn_> & TextConfirmModalProps
>(
  (
    {
      title,
      size = 'small',
      onConfirm,
      visible,
      onCancel,
      loading,
      cancelLabel = 'Cancel',
      confirmLabel = 'Submit',
      confirmPlaceholder,
      confirmString,
      alert,
      input,
      label,
      description,
      formMessage,
      text,
      children,
      blockDeleteButton = true,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const formSchema = z.object({
      confirmValue: z.literal(confirmString, {
        required_error: 'Value entered does not match.',
      }),
    })

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        confirmValue: '',
      },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      onConfirm()
    }

    return (
      <Dialog_Shadcn_
        open={visible}
        {...props}
        onOpenChange={() => {
          if (visible) {
            onCancel()
          }
        }}
      >
        <DialogContent_Shadcn_ ref={ref} className="p-0 gap-0 pb-5" size={size}>
          <DialogTitle_Shadcn_ className="border-b px-5 py-4">{title}</DialogTitle_Shadcn_>
          {alert && (
            <Admonition
              type={variant as 'default' | 'destructive' | 'warning'}
              label={alert.title}
              description={alert.description}
              className="border-r-0 border-l-0 rounded-none -mt-px [&_svg]:ml-0.5 mb-0"
              {...alert?.base}
            />
          )}
          {children && (
            <>
              <DialogSection_Shadcn_ className="p-5">{children}</DialogSection_Shadcn_>
              <DialogSectionSeparator_Shadcn_ />
            </>
          )}
          {/* // older prop from before refactor */}
          {text !== undefined && (
            <>
              <DialogSection_Shadcn_ className="p-5">
                <p className="mb-2 block text-sm break-all">{text}</p>
              </DialogSection_Shadcn_>
              <DialogSectionSeparator_Shadcn_ />
            </>
          )}
          <Form_Shadcn_ {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="px-5 flex flex-col gap-2 pt-3">
              <FormField_Shadcn_
                control={form.control}
                name="confirmValue"
                render={({ field }) => (
                  <FormItem_Shadcn_>
                    <FormLabel_Shadcn_ {...label}>
                      Type <span className="text-foreground break-all">{confirmString}</span> to
                      confirm.
                    </FormLabel_Shadcn_>
                    <FormControl_Shadcn_>
                      <Input_Shadcn_ placeholder={confirmPlaceholder} {...input} {...field} />
                    </FormControl_Shadcn_>
                    <FormDescription_Shadcn_ {...description} />
                    <FormMessage_Shadcn_ {...formMessage} />
                  </FormItem_Shadcn_>
                )}
              />
              <div className="flex justify-end gap-2">
                {!blockDeleteButton && (
                  <Button size="medium" block type="default" disabled={loading}>
                    {cancelLabel}
                  </Button>
                )}
                <Button
                  size="medium"
                  type={
                    variant === 'destructive'
                      ? 'danger'
                      : variant === 'warning'
                        ? 'warning'
                        : 'primary'
                  }
                  htmlType="submit"
                  block
                  loading={loading}
                  disabled={loading}
                >
                  {confirmLabel}
                </Button>
              </div>
            </form>
          </Form_Shadcn_>
        </DialogContent_Shadcn_>
      </Dialog_Shadcn_>
    )
  }
)

TextConfirmModal.displayName = 'TextConfirmModal'

export default TextConfirmModal
