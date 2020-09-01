import PageLayout from 'layouts/PageLayout';
import NetlifyForm from 'react-netlify-form';
import { getCurrentDay } from 'lib/helpers';
import MetaHead from 'components/MetaHead';

const title = 'Submit a Story';

const Submit = (props) => (
	<PageLayout day={getCurrentDay()}>
		<MetaHead
			title={title}
			description='Submit your story to be featured in a Front-End Web Daily post!'
			day={getCurrentDay()}
		/>
		<h1 className='mt-0'>{title}</h1>
		<p>
			Have a great story or latest news? We appreciate all the help we can
			get, so feel free to submit a link below! Include your Instagram and
			Twitter handles if you wish to be credited.
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
								<span className='sr-only'>Name *</span>
								<input
									type='text'
									name='name'
									required
									placeholder='Name *'
									className='rounded-b-none border-b-0'
								/>
							</label>
							<label>
								<span className='sr-only'>Email *</span>
								<input
									type='email'
									name='email'
									required
									placeholder='Email *'
									className='rounded-none border-b-0'
								/>
							</label>
							<label>
								<span className='sr-only'>Link to Story *</span>
								<input
									type='text'
									name='link'
									required
									placeholder='Link to Story *'
									className='rounded-none border-b-0'
								/>
							</label>
							<label>
								<span className='sr-only'>Twitter Handle</span>
								<input
									type='text'
									name='link'
									required
									placeholder='Twitter Handle'
									className='rounded-none border-b-0'
								/>
							</label>
							<label>
								<span className='sr-only'>
									Instagram Handle
								</span>
								<input
									type='text'
									name='link'
									required
									placeholder='Instagram Handle'
									className='rounded-none border-b-0'
								/>
							</label>
							<label>
								<span className='sr-only'>Message</span>
								<textarea
									name='message'
									placeholder='Message'
									className='rounded-t-none min-h-screen-25'
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

export default Submit;
