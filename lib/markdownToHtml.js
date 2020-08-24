import remark from 'remark'
import html from 'remark-html'

export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown)
  var stringResult = result.toString()
  stringResult = stringResult.split('<a href').join('<a target="_blank" href')
  return stringResult
}