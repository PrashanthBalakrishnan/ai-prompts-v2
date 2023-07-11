'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { FullPromptwithAIresponse } from '@types'
import Loading from './loading'

const FullPrompt = () => {
  const [post, setPost] = useState<FullPromptwithAIresponse>()
  const { id } = useParams()
  console.log(id)
  useEffect(() => {
    axios.get(`/api/prompt/${id}`).then((res) => {
      setPost(res.data)
    })
  }, [id])

  if (!post) {
    return <Loading />
  }

  return (
    <div className="flex flex-col gap-12 md:flex-row">
      <div className="glassmorphism mb-4 h-auto md:w-[60%]">
        <div className="mb-5 text-2xl text-gray-950">
          <h3>Prompt: </h3>
          <span>{post?.prompt}</span>
        </div>
        <div className="flex items-start justify-start gap-3">
          <h3>AI Response:</h3>
          <div>
            <p>{post?.aiResponse}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FullPrompt
