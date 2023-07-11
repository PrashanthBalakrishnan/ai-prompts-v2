import Image from 'next/image'

const Loading = () => {
  return (
    <div className="flex-center flex w-full">
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl">
          Please wait while A.I is analyzing your Prompt
        </p>
        <Image
          src="/images/loader.svg"
          width={50}
          height={50}
          alt="loader"
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default Loading
