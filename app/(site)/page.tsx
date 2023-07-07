import getAllPrompts from '@app/actions/getAllPrompts'
import Feed from '@components/Feed'

export default async function Home() {
  const allPrompts = await getAllPrompts()
  console.log(allPrompts)

  return (
    <section>
      <section className="flex-center w-full flex-col">
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
