import MainLayout from 'layouts/Main'
import { day } from 'utils/getDay'

const Home = (props) => (
    <MainLayout day={day}>
        <a>Home page</a>
    </MainLayout>
)

export default Home