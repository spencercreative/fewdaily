import Link from 'next/link'

const Footer = (props) => (
    <footer id="footer" role="contentinfo" className={'px-wrap text-center py-2' + ' ' + props.day}>
        <p className="text-xs mb-0">Copyright &copy; { new Date().getFullYear() } <Link href="/"><a>Front-End Web Daily</a></Link>. All rights reserved. | <Link href="/submit"><a>Submit a Story</a></Link> | <Link href="/sponsorships"><a>Promote Your Business</a></Link></p>
    </footer>
)

export default Footer