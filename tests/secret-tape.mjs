import {readFile, access} from 'node:fs/promises';
import {resolve} from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

// Regression test for the VHS 007 error: in the first AISI edition the code
// list contained "sib" while the display metadata contained "aisi", which
// threw a TypeError during a React render and cleared #root.
const root=resolve(import.meta.dirname,'..');
const js=await readFile(resolve(root,'js/site.js'),'utf8');
const jMatch=js.match(/J=(\[(?:`[^`]+`,?)+\]);function nd/);
const oMatch=js.match(/var Op=(\{.*?\});function kp/);
const kStart=js.indexOf('function kp(){');
const kEnd=js.indexOf('var Ap=',kStart);
assert.ok(jMatch&&oMatch&&kStart!==-1&&kEnd>kStart,'Secret tape implementation missing');
const source=`var J=${jMatch[1]}; var Op=${oMatch[1]}; ${js.slice(kStart,kEnd)}\n({kp,J,Op})`;
const box={
  R:{jsx:(tag,props)=>({tag,props}),jsxs:(tag,props)=>({tag,props})},
  Cf:function achievementIcon(){},
  Vf:(slug,size)=>`/assets/${slug}-${size}.webp`,
  K:()=>box.ctx,
};
const {kp,J,Op}=vm.runInNewContext(source,box);
assert.deepEqual([...J],['konami','aisi','rewind','fiat']);
assert.ok(J.every(k=>Array.isArray(Op[k])&&Op[k].length===2),'Every code requires display metadata');
const flatten=(v)=>{
  if(v==null||typeof v==='boolean')return '';
  if(Array.isArray(v))return v.map(flatten).join(' ');
  if(typeof v==='string'||typeof v==='number')return String(v);
  if(v.props)return flatten(v.props.children);
  return '';
};
// Test the locked tape and every combination of unlocked cheat codes.
box.ctx={unlocked:false,codes:new Set()};
assert.ok(flatten(kp()).includes('TAPE DAMAGED'));
for(let bits=0;bits<(1<<J.length);bits++){
  box.ctx={unlocked:true,codes:new Set(J.filter((_,i)=>bits&(1<<i)))};
  const render=kp();
  const text=flatten(render);
  assert.ok(text.includes('Breaking news')&&text.includes('Local AI refuses to be rewound'),`Secret news missing for subset ${bits}`);
  assert.ok(text.includes('Cheat codes found'),`Cheat list missing for subset ${bits}`);
  assert.ok(text.includes('Overdue Member'),`Achievement missing for subset ${bits}`);
}
await access(resolve(root,'assets/blue-hour-md.webp'));
await access(resolve(root,'assets/logo.webp'));
const dist=await readFile(resolve(root,'dist/js/site.js'),'utf8');
assert.ok(dist.includes('J=[`konami`,`aisi`,`rewind`,`fiat`]'),'Production bundle contains outdated code map');
assert.ok(!dist.includes('J=[`konami`,`sib`,`rewind`,`fiat`]'),'Production bundle still contains crashing code map');
console.log('VHS 007 passed: locked screen, 16 unlocked code combinations, AISI shortcut, local images, and production build.');
