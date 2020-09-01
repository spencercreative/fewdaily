import Link from 'next/link';
import { sponsors } from 'lib/sponsors';

export default function Sponsor(props) {
	if (
		typeof sponsors != 'undefined' &&
		sponsors != null &&
		sponsors.length != null &&
		sponsors.length
	) {
		return (
			<>
				{sponsors.map(
					(sponsor, i) =>
						sponsor.day === props.day && (
							<aside
								role='complementary'
								className={
									'sponsor px-4 py-8 mb-10 rounded-md text-center relative' +
									' bg-' +
									props.day
								}
								key={i}
							>
								<div className='font-black leading-none'>
									<p className='text-xl mb-3'>
										Our{' '}
										<span className='capitalize'>
											{props.day}
										</span>{' '}
										posts are sponsored by{' '}
										<a href={sponsor.link} target='_blank'>
											{sponsor.name}
										</a>
										.
									</p>
									<p className='mb-0 font-normal text-base'>
										{sponsor.message}
									</p>
								</div>
								<p className='text-xs text-right mb-0 absolute bottom-0 right-0 py-1 px-2'>
									<Link href='/sponsorships'>
										<a>Learn more about our sponsorships</a>
									</Link>
								</p>
							</aside>
						)
				)}
			</>
		);
	} else {
		return null;
	}
}
