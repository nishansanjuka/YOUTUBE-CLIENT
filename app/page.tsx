import Footer from '@/components/Footer'
import Form from '../components/Form'
import Image from 'next/image'
import Notification from '@/components/Notification'


export default function Home() {

  return (
    <main className="">
      <Form/>
      <Footer/>
      <Notification/>
    </main>
  )
}
