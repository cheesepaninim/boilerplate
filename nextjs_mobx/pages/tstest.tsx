import * as React from 'react'
import {NextPage} from "next";

const tstest: NextPage<{ userAgent: string }> = ({ userAgent }) => (
    <h1>Hello world - user agent: {userAgent}</h1>
)

tstest.getInitialProps = async ({ req }) => {
  // req.headers['user-agent'] may not guqrantee str type
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent

  return { userAgent }
}

export default tstest;
