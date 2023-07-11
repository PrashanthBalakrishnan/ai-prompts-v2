import Nav from '@components/Nav'
import AuthContext from '@context/AuthContext'
import ToasterContext from '@context/ToastContext'
import '@styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI prompts',
  description:
    'This is a social media application to share and create prompts.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <main className="app">
            <Nav />
            {children}
          </main>
        </AuthContext>
      </body>
    </html>
  )
}
