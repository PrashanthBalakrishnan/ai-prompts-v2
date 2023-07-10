import Form from '@components/form/Form'

const CreatePrompt = () => {
  return (
    <section className="flex-start w-full max-w-full flex-col">
      <h1 className="head_text text-left">
        <span className="black_gradient">Create Prompt</span>
      </h1>
      <p className="desc max-w-md text-left text-gray-600">
        Create and share amazing prompts with world, and let your imagination
        run wild.
      </p>
      <Form />
    </section>
  )
}
export default CreatePrompt
