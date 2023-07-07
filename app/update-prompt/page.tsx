'use client'
import Button from '@components/form/Button'
import Input from '@components/form/Input'
import Textarea from '@components/form/Textarea'
import axios from 'axios'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

const UpdatePrompt = () => {
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const [post, setPost] = useState({ prompt: '', tag: '' })
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    axios.get(`/api/prompt/${promptId}`).then((res) => {
      setPost(res.data)
    })
  }, [promptId])

  const values = post
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      prompt: '',
      tag: '',
    },
    values,
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios
      .patch(`/api/prompt/${promptId}`, { ...data })
      .catch(() => toast.error('Unable to update post'))
      .finally(() => {
        setIsLoading(false)
        router.push('/profile')
        router.refresh()
      })
  }

  return (
    <div>
      <section className="flex-start w-full max-w-full flex-col">
        <h1 className="head_text text-left">
          <span className="black_gradient">Update Post</span>
        </h1>
        <p className="desc max-w-md text-left text-gray-600">
          Update and share amazing prompts with world, and let your imagination
          run wild.
        </p>
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
      </section>
    </div>
  )
}
export default UpdatePrompt
