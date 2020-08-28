import PageLayout from 'layouts/PageLayout'
import NetlifyForm from 'react-netlify-form'
import MetaHead from 'components/MetaHead'
import { getCurrentDay } from 'lib/helpers'

const title = "Sponsorships"

const Sponsorships = (props) => (
    <PageLayout day={getCurrentDay()}>
        <MetaHead title={title} description="Become a sponsor of Front-End Web Daily to promote your business." day={getCurrentDay()} />
        <h1 className="mt-0">{title}</h1>
        <p>Interested in promoting your business with Front-End Web Daily? We offer sponsorship opportunities in a variety of way across all our media channels.</p>
        <p>Please fill out the form below to get in touch with us for more information.</p>
        <NetlifyForm name={title}>
            {({ loading, error, success }) => (
            <div>
                {loading &&
                    <div className="font-black">Loading...</div>
                }
                {error &&
                    <div className="font-black">Your information was not sent. Please try again later.</div>
                }
                {success &&
                    <div className="font-black">Thank you for contacting us!</div>
                }
                {!loading && !success &&
                    <div>
                        <label>
                            <span className="sr-only">Name *</span>
                            <input type='text' name='name' required placeholder="Name *" className="rounded-b-none border-b-0" />
                        </label>
                        <label>
                            <span className="sr-only">Email *</span>
                            <input type='email' name='email' required placeholder="Email *" className="rounded-none border-b-0" />
                        </label>
                        <label>
                            <span className="sr-only">Company *</span>
                            <input type='text' name='company' required placeholder="Company *" className="rounded-none border-b-0" />
                        </label>
                        <label>
                            <span className="sr-only">Phone Number *</span>
                            <input type='tel' name='phone' required placeholder="Phone Number *" className="rounded-none border-b-0" />
                        </label>
                        <fieldset className="bg-gray bg-opacity-25 border border-solid border-gray border-b-0 relative p-2 pt-12 text-base" style={{color: 'darkGray'}}>
                            <legend className="text-base absolute top-0 left-0 m-2 text-gray-900">What promotion opportunities are you interested in? *</legend>
                            <label className="block">
                                <input type='checkbox' name='blog' />Blog
                            </label>
                            <label className="block">
                                <input type='checkbox' name='podcast' />Podcast
                            </label>
                            <label className="block">
                                <input type='checkbox' name='social' />Social Media (Instagram, Twitter, Facebook, LinkedIn)
                            </label>
                            <label className="block">
                                <input type='checkbox' name='other' />Other
                            </label>
                        </fieldset>
                        <label>
                            <span className="sr-only">Message</span>
                            <textarea name='message' placeholder="Message" className="rounded-t-none min-h-screen-25" />
                        </label>
                        <button className="mt-1 font-bold uppercase">Submit</button>
                    </div>
                }
            </div>
            )}
        </NetlifyForm>
    </PageLayout>
)

export default Sponsorships