import Link from 'next/link'

import Layout from '../components/Layout'
import ProfileImage from '../components/ProfileImage'

import Profile from '../test/Profile'

const Index = () => (
  <Layout>
    <h1>Index</h1>
    <div>
      <Link href="/playground"><a>Go Playground</a></Link>
      <Link href="/fakerDemo"><a>Go Faker Demo</a></Link>
    </div>
    <button className='btn btn-primary'>bbb</button>

    <div>
      <ProfileImage />
      <ProfileImage size={ 50 }/>
      <ProfileImage url={ 'https://placeimg.com/250/250/any' }/>
    </div>

    <Profile username="velog" name="vlo"/>

  </Layout>
)

export default Index
