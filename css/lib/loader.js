module.exports = function(source, map) {
  return `import {html} from '@polymer/lit-element/lit-element.js';

const style = html\`<style>${source.substring(0, source.length-1)}</style>\`;
export default style;
`;
};
