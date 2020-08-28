import Link from 'next/link'
import { FiFileText, FiAward } from "react-icons/fi"

const Footer = (props) => (
    <footer id="footer" role="contentinfo" className={'text-xs flex flex-col md:flex-row justify-between px-wrap py-2' + ' ' + props.day}>
        <Link href="/submit"><a className="flex items-center mx-auto md:mx-0"><FiFileText className="mr-1"/>Submit a Story</a></Link>
        <p className="mx-3 my-3 md:my-0 text-center flex-1">Copyright &copy; { new Date().getFullYear() } <Link href="/"><a>Front-End Web Daily</a></Link>. All rights reserved. | <a href="/feed.xml" target="_blank">Feed</a></p>
        <Link href="/sponsorships"><a className="flex items-center mx-auto md:mx-0"><FiAward className="mr-1"/>Promote Your Business</a></Link>
    </footer>
)

export default Footer