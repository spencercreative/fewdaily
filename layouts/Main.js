import Header from 'components/Header'
import Footer from 'components/Footer'
import { day } from 'utils/getDay'

function MainLayout(props) {

    var theDay = props.day !== undefined ? props.day : day;

    return(
        <>
        <div className="min-h-screen flex flex-col">
            <Header day={theDay} />
            <main className={'text-2xl leading-snug w-full flex-1 px-wrap py-10 max-w-5xl mx-auto' + ' ' + theDay}>
                {props.children}
            </main>
            <Footer day={theDay}/>
        </div>
        </>
    )
}

export default MainLayout