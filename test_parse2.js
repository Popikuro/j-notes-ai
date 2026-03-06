const { marked } = require('marked');
const text = `## What is 'Ma'?
Often translated simply as "negative space," *Ma* is much more profound. It is the silence between the notes that makes the music. It is the empty space in a room that makes it livable. It is the pause between sentences that gives your words weight.`;
console.log(marked.parse(text));
