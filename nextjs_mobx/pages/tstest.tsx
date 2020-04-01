import * as React from 'react'

const app = ({ userAgent }) => <h1>Hello world - user agent: {userAgent}</h1>

app.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
};

export default app;
