const minify = require('html-minifier').minify;
const cheerio = require('cheerio');

module.exports = function(source, map) {
  var data = cheerio.load(source, {xmlMode: false, decodeEntities: false, recognizeSelfClosing: false});
  var contexts = [];
  for(var ctx = data('context').first(); ctx.length > 0; ctx = ctx.next()){
    contexts.push(ctx);
  }
  var miniOpt = {collapseBooleanAttributes: true, collapseInlineTagWhitespace: true, collapseWhitespace: true, removeComments: true};

  if(contexts.length < 1) {
    return `const template = () => \`null\`
export default template`;
  }

  return `import {html} from '@polymer/lit-element/lit-element.js';

${contexts.map(
  (ctx) => `const ${ctx.attr('name') || 'template'} = (${ctx.attr('params')}) => html\`${minify(ctx.html(), miniOpt)}\`;`
  ).join("\n")}
export default template;
`;
};
