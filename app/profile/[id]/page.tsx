'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import PromptCard from '@components/PromptCard'
import { FullPrompt } from '@types'

interface IParams {
  id?: string
}

const UserProfile = ({ params }: { params: IParams }) => {
  const searchParams = useSearchParams()
  const userName = searchParams.get('name')
  const [userPosts, setUserPosts] = useState<FullPrompt[]>()
  console.log(userPosts)
  useEffect(() => {
    axios
      .get(`/api/users/${params?.id}/posts`)
      .then((data) => setUserPosts(data.data))
      .catch(() => toast.error('Something went wrongs'))
  }, [params?.id])
  return (
    <section className="container mx-auto">
      <h1 className="head_text text-left">
        <span className="black_gradient">{userName}&apos;s Prompts</span>
      </h1>
      <div className="prompt_layout mt-10 ">
        {userPosts?.map((prompt) => (
          <PromptCard key={prompt.id} post={prompt} />
        ))}
      </div>
    </section>
  )
}

export default UserProfile
