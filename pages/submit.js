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
								<span>Name *</span>
								<input type='text' name='name' required />
							</label>
							<label>
								<span>Email *</span>
								<input type='email' name='email' required />
							</label>
							<label>
								<span>Link to Story *</span>
								<input type='text' name='link' required />
							</label>
							<label>
								<span>Twitter Handle</span>
								<input type='text' name='link' />
							</label>
							<label>
								<span>Instagram Handle</span>
								<input type='text' name='link' />
							</label>
							<label>
								<span>Message</span>
								<textarea name='message' />
							</label>
							<button type="submit">Submit</button>
						</div>
					)}
				</div>
			)}
		</NetlifyForm>
	</PageLayout>
);

export default Submit;
