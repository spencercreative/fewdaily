import Link from 'next/link'
import { FiSearch } from "react-icons/fi"
import { FaInstagram } from "react-icons/fa"

const SocialLink = (props) => (
    <li className="p-4">
        <a href={props.to} target="_blank" className="block">
            {props.icon}
            <span className="sr-only">{props.title}</span>
        </a>
    </li>
)

function SocialToggle() {
    var menu = document.getElementById('social-nav'),
        button = document.getElementById('social-toggle')

    if ( menu.classList.contains('hidden') ) {
        menu.classList.remove('hidden')
        menu.classList.add('block', 'active')
        button.classList.add('z-30')
    } else {
        menu.classList.add('hidden')
        menu.classList.remove('block', 'active')
        button.classList.remove('z-30')
    }
}

function Header(props) {

    return (
        <header role="banner" className={'flex w-full px-wrap items-center text-2xl py-2 font-black' + ' ' + props.day}>

            <button className="flex items-center leading-none transition-all text-lg font-bold" title="Search">
                <FiSearch aria-hidden="true"/><span className="ml-2 hidden md:block">Search</span>
            </button>

            <div className="flex-1 px-4 text-center uppercase">
                <Link href="/"><a className="inline-block leading-none transition-all">Front-End Web Daily</a></Link>
            </div>

            <button id="social-toggle" title="Social Media" className="flex items-center leading-none transition-all text-lg font-bold" onClick={SocialToggle}>
                @<span className="hidden md:block">fewdaily</span>
            </button>

            <nav id="social-nav" className="absolute hidden translate-x-full top-0 left-0 w-full h-full py-20 px-wrap bg-white z-10 overflow-y-auto transition-transform duration-500">
                <ul className="flex flex-wrap justify-center gap-10 text-3xl -m-4">
                    <SocialLink icon={<FaInstagram/>} to="/" title="Instagram" />
                </ul>
            </nav>
        </header>
    )
}

export default Header