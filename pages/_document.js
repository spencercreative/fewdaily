import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang='en' className='overflow-x-hidden w-full min-h-full'>
				<Head>
					<meta name='theme-color' content='#282828' />
					<link
						rel='stylesheet'
						href='//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.2/build/styles/a11y-dark.min.css'
					/>
				</Head>
				<body className='relative overflow-x-hidden w-full min-h-full text-slate font-sans md:text-xl'>
					<Main />
					<NextScript />
					{/* <script src='//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.2/build/highlight.min.js'></script> */}
                    <script>
                        if (window.netlifyIdentity) {
                            window.netlifyIdentity.on("init", user => {
                                if (!user) {
                                    window.netlifyIdentity.on("login", () => {
                                        document.location.href = "/admin/";
                                    })
                                }
                            })
                        }
                    </script>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
