import Header from '@/components/Header'
import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'] , weight:['100' , '200' , '300' , '400' , '500' , '600' , '700' , '800' , '900'] })

export const metadata = {
  title: `Let's Download some youtube stuff`,
  description: 'Youtube downloader by Nipuna Nishan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-zinc-900`}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
