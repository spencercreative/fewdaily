import Link from 'next/link'
import { FiTag, FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiLinkedin, FiMic } from "react-icons/fi"

const SocialLink = (props) => (
    <li className="p-4">
        <a href={props.to} target="_blank" className="block" title={props.title}>
            {props.icon}
            <span className="sr-only">{props.title}</span>
        </a>
    </li>
)

function SocialToggle() {
    var menu = document.getElementById('social-nav'),
        button = document.getElementById('social-toggle'),
        body = document.body,
        main = document.getElementById('main'),
        headerHome = document.getElementById('header-home'),
        footer = document.getElementById('footer')

    if ( menu.classList.contains('hidden') ) {
        menu.classList.remove('hidden')
        menu.classList.add('flex', 'active')
        button.classList.add('z-30')
        body.classList.add('overflow-hidden')
        main.classList.add('hidden')
        footer.classList.add('hidden')
        headerHome.setAttribute('tabindex', -1)
    } else {
        menu.classList.add('hidden')
        menu.classList.remove('flex', 'active')
        button.classList.remove('z-30')
        body.classList.remove('overflow-hidden')
        main.classList.remove('hidden')
        footer.classList.remove('hidden')
        headerHome.removeAttribute('tabindex')
    }
}

function Header(props) {

    return (
        <header role="banner" className={'flex w-full px-wrap items-center text-2xl py-2 font-black' + ' ' + props.day}>

            <button className="flex items-center leading-none text-lg font-bold" title="Search">
                <FiTag aria-hidden="true"/><span className="ml-1 hidden md:block">Tags</span>
            </button>

            <div className="flex-1 px-4 text-center uppercase">
                <Link href="/"><a className="inline-block leading-none">Front-End Web Daily</a></Link>
            </div>

            <button id="social-toggle" title="Social Media" className="flex items-center leading-none text-lg font-bold" onClick={SocialToggle}>
                @<span className="hidden md:block">fewdaily</span>
            </button>

            <nav id="social-nav" className="absolute hidden items-center justify-center translate-x-full top-0 left-0 w-full h-full py-20 px-wrap bg-white z-10 overflow-y-auto transition-transform duration-500">
                <ul className="flex flex-wrap justify-center items-center gap-10 text-6xl -m-4">
                    <SocialLink icon={<FiInstagram className="stroke-1-1/2"/>} to="https://www.instagram.com/fewdaily/" title="Instagram" />
                    <SocialLink icon={<FiTwitter className="stroke-1-1/2"/>} to="https://twitter.com/fewdaily" title="Twitter" />
                    <SocialLink icon={<FiFacebook className="stroke-1-1/2"/>} to="https://www.facebook.com/fewdaily/" title="Facebook" />
                    <SocialLink icon={<FiYoutube className="stroke-1-1/2"/>} to="https://www.youtube.com/channel/UC4IfUmMAi_-vT4ELn4GgVLQ" title="YouTube" />
                    <SocialLink icon={<FiLinkedin className="stroke-1-1/2"/>} to="https://www.linkedin.com/company/fewdaily/" title="LinkedIn" />
                    <SocialLink icon={<FiMic className="stroke-1-1/2"/>} to="https://anchor.fm/fewdaily" title="Podcast on Anchor.fm" />
                </ul>
            </nav>
        </header>
    )
}

export default Header