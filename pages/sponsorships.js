import MainLayout from 'layouts/MainLayout'
import { getCurrentDay } from 'lib/helpers'

const Sponsorships = (props) => (
    <MainLayout day={getCurrentDay()}>
        <h1>Sponsorships</h1>
    </MainLayout>
)

export default Sponsorships