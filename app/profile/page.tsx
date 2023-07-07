import getCurrentUser from '@actions/getCurrentUser'
import getMyPrompts from '@actions/getMyPrompts'
import PromptCard from '@components/PromptCard'

const MyProfile = async () => {
  const prompts = await getMyPrompts()
  const user = await getCurrentUser()
  return (
    <section className="container mx-auto">
      <h1 className="head_text text-left">
        <span className="black_gradient">{user?.name}&apos;s Prompts</span>
      </h1>
      <div className="prompt_layout mt-10 ">
        {prompts?.map((prompt) => (
          <PromptCard key={prompt.id} post={prompt} />
        ))}
      </div>
    </section>
  )
}
export default MyProfile
