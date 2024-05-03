import Head from 'next/head'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'

export default function Home() {
  
  return (
    <>
      <Head>
        <title>
          Tools for Code Formatting, Beautification, and Conversion Online |
          DevFinds
        </title>
        <meta
          name="description"
          content="Whether you need to format code, beautify HTML, or convert files, we've got you covered. Find the best developer tools for code formatting, beautification, & conversion online at DevFinds."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <SecondaryFeatures />
      </main>
      <Footer />
    </>
  )
}
