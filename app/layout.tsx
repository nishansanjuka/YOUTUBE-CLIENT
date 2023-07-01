import Header from '@/components/Header'
import './globals.css'
import { Poppins } from 'next/font/google'
import { Providers } from './Redux/provider'

const poppins = Poppins({ subsets: ['latin'] , weight:['100' , '200' , '300' , '400' , '500' , '600' , '700' , '800' , '900'] })

export const metadata = {
  title:{
    default:`Let's Download some youtube stuff`,
  },
  description: 'Youtube mp3 downloader by Nipuna Nishan',
  keywords:['Youtube' , 'youtube mp3' , 'youtube mp3 download' , 'youtube mp3 downloader' ,'youtube mp3 converter' , 'playlist' , 'playlist downloader' , 'youtube playlist downloader' , 'youtube playlist mp3 downloader' , 'download youtube mp3' , 'download youtube mp3 playlist'],
  authors:{
    name:'Nipuna Nishan'
  },
  creator:'Nipuna Nishan' 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-zinc-900 select-none`}>
        <Providers>
          <Header/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
