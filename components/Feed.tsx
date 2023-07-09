'use client'
import { useState, useEffect, useMemo } from 'react'
import PromptCard from './PromptCard'
import { FullPrompt } from '@types'
import useDebounce from '@hooks/useDebounce'
import Input from './form/Input'

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

  const [searchText, setSearchText] = useState<string>('')
  const [searchedResults, setSearchedResults] = useState<FullPrompt[]>([])

  const [posts, setPosts] = useState<FullPrompt[]>()

  useEffect(() => {
    setPosts(allPrompts)
  }, [setPosts, allPrompts])

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  const debouncedValue = useDebounce(searchText)

  useMemo(() => {
    const filterPrompts = (searchtext: string) => {
      const regex = new RegExp(searchtext, 'i') // 'i' flag for case-insensitive search
      return posts?.filter(
        (item) =>
          regex.test(item.tag) ||
          regex.test(item.prompt) ||
          regex.test(item.user.name!)
      )
    }
    const resultArray: FullPrompt[] | undefined = filterPrompts(debouncedValue)
    if (resultArray) {
      setSearchedResults(resultArray)
    }
  }, [debouncedValue, posts])

  return (
    <section className="">
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="relative  mx-auto w-[300px] p-5"
      >
        <input
          className="glassmorphism search_input"
          placeholder="Search for a tag or a username"
          type="text"
          onChange={handleSearchChange}
          value={searchText}
        />
      </form>

      {/* All Prompts */}

      {searchText ? (
        <PromptCardList data={searchedResults} />
      ) : (
        <div>
          <h4 className="head_text">Latest Prompts</h4>
          <PromptCardList data={posts} handleTagClick={() => {}} />
        </div>
      )}
    </section>
  )
}
export default Feed
