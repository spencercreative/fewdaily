import PageLayout from 'layouts/PageLayout';
import NetlifyForm from 'react-netlify-form';
import MetaHead from 'components/MetaHead';
import { getCurrentDay } from 'lib/helpers';

const title = 'Sponsorships';

const Sponsorships = (props) => (
	<PageLayout day={getCurrentDay()}>
		<MetaHead
			title={title}
			description='Become a sponsor of Front-End Web Daily to promote your business.'
			day={getCurrentDay()}
		/>
		<h1 className='mt-0'>{title}</h1>
		<p>
			Interested in promoting your business with Front-End Web Daily? We
			offer sponsorship opportunities in a variety of way across all our
			media channels.
		</p>
		<p>
			Please fill out the form below to get in touch with us for more
			information.
		</p>
		<NetlifyForm name={title}>
			{({ loading, error, success }) => (
				<div>
					{loading && <div className='font-black'>Loading...</div>}
					{error && (
						<div className='font-black'>
							Your information was not sent. Please try again
							later.
						</div>
					)}
					{success && (
						<div className='font-black'>
							Thank you for contacting us!
						</div>
					)}
					{!loading && !success && (
						<div>
							<label>
								<span>Name *</span>
								<input
									type='text'
									name='name'
									required
								/>
							</label>
							<label>
								<span>Email *</span>
								<input
									type='email'
									name='email'
									required
								/>
							</label>
							<label>
								<span>Company *</span>
								<input
									type='text'
									name='company'
									required
								/>
							</label>
							<label>
								<span>Phone Number *</span>
								<input
									type='tel'
									name='phone'
									required
								/>
							</label>
							<fieldset
								className='relative text-base'
							>
								<legend className='mb-4 font-bold text-sm'>
									What promotion opportunities are you
									interested in? *
								</legend>
								<label className='block'>
									<input type='checkbox' name='blog' />
									Blog
								</label>
								<label className='block'>
									<input type='checkbox' name='podcast' />
									Podcast
								</label>
								<label className='block'>
									<input type='checkbox' name='social' />
									Social Media (Instagram, Twitter, Facebook,
									LinkedIn)
								</label>
								<label className='block'>
									<input type='checkbox' name='other' />
									Other
								</label>
							</fieldset>
							<label>
								<span>Message</span>
								<textarea
									name='message'
									placeholder='Message'
								/>
							</label>
							<button className='mt-1 font-bold uppercase'>
								Submit
							</button>
						</div>
					)}
				</div>
			)}
		</NetlifyForm>
	</PageLayout>
);

export default Sponsorships;
