import Document, { Html, Head, Main, NextScript } from 'next/document'

// 각각의 개별 page 에서 Head 사용시
// import Head from 'next/head'

export default class CustomDocument extends Document {

// _documnet.js 역시 라이프 사이클을 지님
// componentDidMount, getInitialProps 등등의 작업 역시 처리 가능

  render() {
    return (
      <Html>
        <Head>
          {/* meta tag & ...(e.g. libraries link) */}
          {/* title 은 _app.js 에서 사용 */}
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossOrigin="anonymous" />
        </Head>
        <body>

          {/* _document.js 에서는 동적 데이터 처리가 이루어 질 수 없다 */}
          {/* <Main/> 내부에서 가능 */}

            {/* Main: 각각의 page 가 들어가는 위치 */}
            <Main/>

          <NextScript/>

        </body>
      </Html>
    )
  }
}
