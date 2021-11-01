import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <section>
      <Head>
        <title>Title Genius | Home</title>
        <meta name="keywords" content="ninjas"/>
      </Head>
      <div className="dummy">
        <h1>THIS IS OUR HOME PAGE</h1>
      </div>
    </section>
  )
}
