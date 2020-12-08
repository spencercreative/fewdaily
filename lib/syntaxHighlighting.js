import hljs from 'highlight.js/lib/core'
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))

export default function startHighlight() {

    hljs.initHighlighting()

}