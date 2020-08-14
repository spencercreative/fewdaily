import App from 'next/app'
import TagManager from 'react-gtm-module'

import '../styles/index.css';

const tagManagerArgs = {
  gtmId: 'GTM-K33MKGJ'
}

class MyApp extends App {
//   componentDidMount () {
//     TagManager.initialize(tagManagerArgs)
//   }

  render () {
    const { Component, pageProps } = this.props
    return (
        <Component {...pageProps} />
    )
  }
}

export default MyApp