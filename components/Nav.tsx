'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Button from './form/Button'

type ProviderType = {
  callbackUrl: string
  id: string
  name: string
  signinUrl: string
  type: string
}

const Nav = () => {
  const [providers, setProviders] = useState<ProviderType>()
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const loginProviders = async () => {
      const res = await getProviders()
      setProviders(res!.google)
    }

    loginProviders()
  }, [])

  const { data: session } = useSession()

  return (
    <nav className="flex-between mb-16 flex pt-3">
      <Link href="/" className="flex-center flex gap-2">
        <Image
          className="object-contain"
          src="/images/ailogo.png"
          width={80}
          height={80}
          alt="Logo"
        />
        <p className="logo_text">A.I Prompts</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="items-center">
        {session ? (
          <div className="relative flex gap-3 md:gap-5">
            <Link className="mr-4 hidden sm:flex" href="/create-prompt">
              <Button>Create Post</Button>
            </Link>

            <Image
              src={session.user?.image || '/images/placeholder.jpg'}
              width={37}
              height={37}
              alt="profile"
              className="cursor-pointer rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  className="dropdown_link"
                  href="/profile"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  className="dropdown_link"
                  href="/create-prompt"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <Button
                  type="button"
                  onClick={() => {
                    signOut()
                    setToggleDropdown(false)
                  }}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && (
              <Button
                type="button"
                key={providers.name}
                onClick={() => {
                  signIn(providers.id)
                }}
              >
                Sign in
              </Button>
            )}
          </>
        )}
      </div>
    </nav>
  )
}
export default Nav
