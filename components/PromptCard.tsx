'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { BiCopy, BiPaste } from 'react-icons/bi'
import { BsRobot } from 'react-icons/bs'
import { FullPrompt } from '@types'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface PromptCardProps {
  post: FullPrompt
  handleTagClick?: (tagName: string) => void
}

const PromptCard: React.FC<PromptCardProps> = ({ post, handleTagClick }) => {
  const [copied, setCopied] = useState('')
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(''), 3000)
  }

  const handleEdit = () => {
    router.push(`/update-prompt?id=${post.id}`)
  }

  const handleDelete = () => {
    axios
      .delete(`/api/prompt/${post.id}`)
      .catch((err) => toast.error(err.message))
      .finally(router.refresh)
  }

  const handleProfileClick = () => {
    if (post.user.email === session?.user?.email) return router.push('/profile')

    router.push(`/profile/${post.userId}?name=${post.user.name}`)
  }

  const handleCardClick = () => {
    router.push(`/prompt/${post.id}`)
  }

  return (
    <div className="glassmorphism ">
      {session?.user?.email === post.user.email && pathName === '/profile' && (
        <div className="flex-center flex gap-2  py-2">
          <p
            className="cursor-pointer rounded-lg bg-gray-100 p-2 font-inter text-base transition-colors hover:bg-gray-300"
            onClick={() => handleEdit()}
          >
            Edit
          </p>
          <p
            className="cursor-pointer rounded-lg bg-gray-100 p-2 font-inter text-base transition-colors hover:bg-gray-300"
            onClick={() => handleDelete()}
          >
            Delete
          </p>
        </div>
      )}
      <div className="flex  items-start justify-between gap-5 ">
        <div
          className="flex flex-1  cursor-pointer items-center justify-start gap-3 "
          onClick={handleProfileClick}
        >
          <Image
            className="rounded-full object-contain"
            src={post.user.image || '/images/placeholder.jpg'}
            alt="user profile"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.user.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.user.email}
            </p>
          </div>
        </div>

        <div onClick={handleCopy} className="copy_btn">
          {copied ? <BiPaste /> : <BiCopy />}
        </div>
      </div>
      <p className="my-4 overflow-hidden font-satoshi text-sm text-gray-700">
        {post.prompt}
      </p>
      <div className="flex justify-between">
        <p
          className="cursor-pointer font-inter text-sm text-gray-400 hover:text-gray-950"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>
        {session?.user?.email && (
          <div
            className="inline-flex cursor-pointer items-center  gap-2 text-sm text-gray-500 transition hover:text-gray-950"
            onClick={handleCardClick}
          >
            <p>Ask A.I</p>
            <BsRobot />
          </div>
        )}
      </div>
    </div>
  )
}
export default PromptCard
