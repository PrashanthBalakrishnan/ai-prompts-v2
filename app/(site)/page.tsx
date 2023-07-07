import getAllPrompts from '@app/actions/getAllPrompts'
import getCurrentUser from '@app/actions/getCurrentUser'
import Feed from '@components/Feed'

export default async function Home() {
  const user = await getCurrentUser()

  const allPrompts = await getAllPrompts()

  return (
    <section>
      <section className="flex-center w-full flex-col">
        <p className="desc">
          Welcome Back <span className="font-semibold">{user?.name}</span>
        </p>
        <h1 className="head_text black_gradient text-center">
          Unleash Your Creativity and Witness the Power of AI
          <br className="max-md:hidden" />
        </h1>
        <p className="desc mb-2 text-center">
          Create, Share, and Run Limitless AI Prompts with Ease!
        </p>
      </section>
      <Feed allPrompts={allPrompts} />
    </section>
  )
}
