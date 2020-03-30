import Link from 'next/link'
import Head from 'next/head'

const Playground = () => (
  <>
    <Head>
      <title>놀이터</title>
    </Head>

    <h1>Playground</h1>
    <p>Welcome to Playground.</p>
    <div>
      <Link href="/"><a>Home</a></Link>
    </div>
  </>
)

export default Playground
