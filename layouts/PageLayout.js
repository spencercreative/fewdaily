import MainLayout from 'layouts/MainLayout';

function PageLayout(props) {
	return (
		<MainLayout day={props.day}>
			<article className='max-w-4xl mx-auto'>{props.children}</article>
		</MainLayout>
	);
}

export default PageLayout;
