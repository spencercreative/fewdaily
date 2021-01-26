import {markdown} from 'markdown'

export default function markdownToHtml(markdownFile) {
	return markdown.toHTML(markdownFile);
}
