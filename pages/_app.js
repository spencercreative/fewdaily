import App from 'next/app';
import TagManager from 'react-gtm-module';
import 'fontsource-mulish/500.css';
import 'fontsource-mulish/700.css';
import 'fontsource-mulish/900.css';
import '../styles/index.css';

const tagManagerArgs = {
	gtmId: 'GTM-PDBZG4Q',
};

class MyApp extends App {
	componentDidMount() {
		TagManager.initialize(tagManagerArgs);
	}

	render() {
		const { Component, pageProps } = this.props;
		return <Component {...pageProps} />;
	}
}

export default MyApp;
