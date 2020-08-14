import Link from 'next/link'

const Wrapper = (props) => (
    <aside role="complementary" className={'sponsor px-4 py-3 my-4 rounded-md' + ' bg-' + props.day}>
        <div className="text-2xl font-bold">{props.children}</div>
        <p className="text-sm text-right"><Link href="/sponsorships">Learn more about our sponsorships</Link></p>
    </aside>
)

const Monday = () => (
    <>This is a <a>Monday</a> sponsor.</>
)

const Tuesday = () => (
    <>This is a Tuesday sponsor.</>
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
        return null
    }
    
}