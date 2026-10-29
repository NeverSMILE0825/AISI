/** Apply optional social links and real post-launch contract address to the compiled frontend. */
import {readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const path=resolve(root,'js/site.js');
let bundle=await readFile(path,'utf8');
const links=JSON.parse(await readFile(resolve(root,'site-links.json'),'utf8'));
for(const [label,key] of [['X','x'],['Telegram','telegram']]) {
 const url=links[key] || '';
 if(url && (!/^https:\/\//.test(url) || url.includes('`'))) throw new Error(`Bad ${label} URL`);
}
bundle=bundle.replace(/links:\{x:`[^`]*`,telegramChannel:`[^`]*`,telegramGroup:`[^`]*`,website:`[^`]*`\}/,
 `links:{x:\`${links.x||''}\`,telegramChannel:\`${links.telegram||''}\`,telegramGroup:\`\`,website:\`\`}`);
// Optional CA requires --contract 0x<40 hex>. Preserves Coming Soon if omitted.
const i=process.argv.indexOf('--contract');
if (i>=0) {const ca=process.argv[i+1];if(!/^0x[a-fA-F0-9]{40}$/.test(ca||''))throw Error('Contract must be 0x followed by 40 hex chars');
 bundle=bundle.replace(/ca:`(?:Coming Soon\.\.|0x[a-fA-F0-9]{40})`/,`ca:\`${ca}\``);
}
await writeFile(path,bundle);
console.log('Updated AISI social links'+(i>=0?' and contract address':''));
