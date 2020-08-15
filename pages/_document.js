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
          <meta name="theme-color" content="#042A2B"/>
          <link rel="apple-touch-icon" sizes="180x180" href={'/favicons/' + dayOfWeek + '/apple-touch-icon.png'}/>
          <link rel="icon" type="image/png" sizes="32x32" href={'/favicons/' + dayOfWeek + '/favicon-32x32.png'}/>
          <link rel="icon" type="image/png" sizes="16x16" href={'/favicons/' + dayOfWeek + '/favicon-16x16.png'}/>
          <link rel="manifest" href={'/favicons/' + dayOfWeek + '/site.webmanifest'}/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
        </Head>
        <body className="relative overflow-x-hidden w-full h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument