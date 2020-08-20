import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getCurrentDay } from 'lib/helpers'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    var dayOfWeek = getCurrentDay()
    return (
      <Html lang="en" className="overflow-x-hidden w-full h-full">
        <Head>
          <meta name="theme-color" content="#282828"/>
        </Head>
        <body className="relative overflow-x-hidden w-full h-full text-slate">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument