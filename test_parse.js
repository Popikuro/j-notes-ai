const fs = require('fs');
const { marked } = require('marked');

const content = fs.readFileSync('articles/the-art-of-ma-digital-pause.mdx', 'utf8');
const contentBody = content.replace(/---[\s\S]*?---/, '').trim();
const html = marked.parse(contentBody);
console.log(html);
