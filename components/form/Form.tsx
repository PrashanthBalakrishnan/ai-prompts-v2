'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import Input from './Input'
import Button from './Button'
import Link from 'next/link'
import Textarea from './Textarea'
import { toast } from 'react-hot-toast'
import { Prompt } from '@prisma/client'

const Form = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      prompt: '',
      tag: '',
    },
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios
      .post('/api/prompt/new', { ...data })
      .catch(() => toast.error('Something went wrong.'))
      .finally(() => {
        setIsLoading(false)
        router.push('/')
        router.refresh()
      })
  }

  return (
    <form
      className="glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Textarea
        label="Your AI Prompt"
        id="prompt"
        register={register}
        placeholder="Write your post here..."
        disabled={isLoading}
        required
      />

      <Input
        id="tag"
        label="Tag"
        register={register}
        placeholder="Write your tag here..."
        errors={errors}
      />

      <div className="flex justify-end gap-2">
        <Link href="/">
          <Button secondary>Cancel</Button>
        </Link>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? `Submiting...` : 'Submit'}
        </Button>
      </div>
    </form>
  )
}
export default Form
