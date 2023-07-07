'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { BiCopy, BiPaste } from 'react-icons/bi'
import { FullPrompt } from '@types'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface PromptCardProps {
  post: FullPrompt
  handleTagClick?: () => void
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

  return (
    <div className="prompt_card glassmorphism">
      <div className="flex items-start justify-between gap-5">
        <div
          className="flex flex-1 cursor-pointer items-center justify-start gap-3"
          onClick={() => {}}
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
      <p className="mt-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="cursor-pointer font-inter text-sm text-gray-400"
        onClick={handleTagClick}
      >
        #{post.tag}
      </p>

      {session?.user?.email === post.user.email && pathName === '/profile' && (
        <div className="flex-center mt-5 gap-4 border-t border-gray-100 pt-3">
          <p
            className="cursor-pointer font-inter text-sm"
            onClick={() => handleEdit()}
          >
            Edit
          </p>
          <p
            className="cursor-pointer font-inter text-sm"
            onClick={() => handleDelete()}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}
export default PromptCard
