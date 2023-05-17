import Footer from '@/components/Footer'
import Form from '../components/Form'
import Image from 'next/image'
import Notification from '@/components/Notification'


export default function Home() {

  const Is_notification = false;

  return (
    <main className="">
      <Form/>
      <Footer/>
      {Is_notification && <Notification/>}
    </main>
  )
}
