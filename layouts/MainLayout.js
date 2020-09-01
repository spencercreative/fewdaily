import Header from 'components/Header';
import Footer from 'components/Footer';
import { getCurrentDay } from 'lib/helpers';

function MainLayout(props) {
	var theNamedDay = props.day !== undefined ? props.day : getCurrentDay();

	return (
		<>
			<div className='min-h-screen flex flex-col'>
				<Header day={theNamedDay} />
				<main
					id='main'
					className={
						'leading-snug w-full flex-1 px-wrap py-10' +
						' ' +
						theNamedDay
					}
				>
					{props.children}
				</main>
				<Footer day={theNamedDay} />
			</div>
		</>
	);
}

export default MainLayout;
