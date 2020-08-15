import Link from 'next/link'
import { getCurrentDay } from 'lib/helpers'

const Wrapper = (props) => (
    <aside role="complementary" className={'sponsor px-4 py-8 mb-10 rounded-md text-center relative' + ' bg-' + props.day}>
        <div className="text-2xl font-bold leading-none">{props.children}</div>
        <p className="text-xs text-right mb-0 absolute bottom-0 right-0 py-1 px-2"><Link href="/sponsorships"><a>Learn more about our sponsorships</a></Link></p>
    </aside>
)

const Monday = () => (
    <>This is a <a>Monday</a> sponsor.</>
)

const Tuesday = () => (
    <>This is a <a>Tuesday</a> sponsor.</>
)

const Wednesday = () => (
    <>This is a Wednesday sponsor.</>
)

const Thursday = () => (
    <>This is a Thursday sponsor.</>
)

const Friday = () => (
    <>This is a Friday sponsor.</>
)

const Saturday = () => (
    <>This is a Saturday sponsor.</>
)

const Sunday = () => (
    <>This is a Sunday sponsor.</>
)

const General = () => (
    <>This is a general sponsor.</>
)

export default function Sponsor(props) {

    if ( props.day === 'monday' ) {
        return (
            <Wrapper day={props.day}>
                <Monday/>
            </Wrapper> 
        )
    } else if ( props.day === 'tuesday' ) {
        return (
            <Wrapper day={props.day}>
                <Tuesday/>
            </Wrapper> 
        )
    } else if ( props.day === 'wednesday' ) {
        return (
            <Wrapper day={props.day}>
                <Wednesday/>
            </Wrapper> 
        )
    } else if ( props.day === 'thursday' ) {
        return (
            <Wrapper day={props.day}>
                <Thursday/>
            </Wrapper> 
        )
    } else if ( props.day === 'friday' ) {
        return (
            <Wrapper day={props.day}>
                <Friday/>
            </Wrapper> 
        )
    } else if ( props.day === 'saturday' ) {
        return (
            <Wrapper day={props.day}>
                <Saturday/>
            </Wrapper> 
        )
    } else if ( props.day === 'sunday' ) {
        return (
            <Wrapper day={props.day}>
                <Sunday/>
            </Wrapper> 
        )
    } else {
        return (
            <Wrapper day={getCurrentDay()}>
                <General/>
            </Wrapper> 
        )
    }
    
}