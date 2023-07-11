'use client'
import { useState, useEffect, useMemo } from 'react'
import PromptCard from './PromptCard'
import { FullPrompt } from '@types'
import useDebounce from '@hooks/useDebounce'
import { MdClear } from 'react-icons/md'
import { filterPrompts } from '@utils/filterPrompts'
interface PromptCardListProps {
  data: FullPrompt[] | undefined
  handleTagClick?: (tagName: string) => void
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
    const resultArray: FullPrompt[] | undefined = filterPrompts(
      debouncedValue,
      posts!
    )
    if (resultArray) {
      setSearchedResults(resultArray)
    }
  }, [debouncedValue, posts])

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName)
    const resultArray: FullPrompt[] | undefined = filterPrompts(tagName, posts!)
    if (resultArray) {
      setSearchedResults(resultArray)
    }
  }

  return (
    <section className="">
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="relative  mx-auto w-[300px] p-5"
      >
        {searchText && (
          <MdClear
            className="absolute right-6 top-8 z-50 h-5 w-5 text-slate-800"
            onClick={() => setSearchText('')}
          />
        )}
        <input
          className="glassmorphism search_input p-5"
          placeholder="Search..."
          type="text"
          onChange={handleSearchChange}
          value={searchText}
        />
      </form>

      {/* All Prompts */}

      {searchText ? (
        <div>
          <h4 className="head_text">Search Results</h4>
          {searchedResults.length === 0 ? (
            <p>No Results Found</p>
          ) : (
            <PromptCardList
              data={searchedResults}
              handleTagClick={handleTagClick}
            />
          )}
        </div>
      ) : (
        <div>
          <h4 className="head_text">Latest Prompts</h4>
          <PromptCardList data={posts} handleTagClick={handleTagClick} />
        </div>
      )}
    </section>
  )
}
export default Feed
