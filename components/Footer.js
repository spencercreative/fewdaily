import Link from 'next/link'

const Footer = (props) => (
    <footer role="contentinfo" className={'px-wrap text-center py-2' + ' ' + props.day}>
        <p className="text-xs mb-0">Copyright &copy; { new Date().getFullYear() } <Link href="/"><a>Front-End Web Daily</a></Link>. All rights reserved.</p>
    </footer>
)

export default Footer