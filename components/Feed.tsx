'use client'
import { useState, useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from './form/Input'
import PromptCard from './PromptCard'
import { FullPrompt } from '@types'

interface PromptCardListProps {
  data: FullPrompt[] | undefined
  handleTagClick?: () => void
}

const PromptCardList: React.FC<PromptCardListProps> = ({
  data,
  handleTagClick,
}) => {
  return (
    <div className="prompt_layout mt-10">
      {data?.map((post: FullPrompt) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

interface FeedProps {
  allPrompts: FullPrompt[]
}

const Feed: React.FC<FeedProps> = ({ allPrompts }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState<FullPrompt[]>()

  useEffect(() => {
    setPosts(allPrompts)
  }, [allPrompts])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      search: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
  }

  return (
    <section className="">
      <form className="relative  mx-auto w-[300px] p-5">
        {/* <Input
          id="search"
          register={register}
          disabled={isLoading}
          errors={errors}
          placeholder="Search for a tag or a username"
          required
        /> */}
      </form>
      <h4 className="head_text">Latest Prompts</h4>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}
export default Feed
