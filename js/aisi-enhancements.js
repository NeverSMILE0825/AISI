
/** Editable external URLs live in site-links.json, not hardcoded fake accounts. */
(async () => {
 let cfg={};try { cfg=await (await fetch('./site-links.json')).json(); }catch{}
 const aisiNav=document.createElement('nav'); aisiNav.className='aisi-social'; aisiNav.setAttribute('aria-label','AISI social media');
 const xSvg='<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-6.42L6.42 22H3.28l7.26-8.3L1 2h6.4l4.43 5.86L18.9 2Zm-1.1 18h1.73L6.46 3.89H4.6L17.8 20Z"/></svg>';
 const tgSvg='<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m22 2-3.7 19c-.28 1.34-1.03 1.66-2.09 1.03l-5.8-4.29-2.8 2.7c-.31.31-.58.58-1.19.58l.42-5.89L17.58 5.4c.47-.42-.1-.65-.73-.23L3.01 13.9l-5.35-1.68c-1.16-.36-1.18-1.16.24-1.71L19.09 2.3c.98-.36 1.84.23 1.53 1.7Z"/></svg>'.replace('M22 2','M22 2');
 for (const [label,key,svg] of [['X','x',xSvg],['Telegram','telegram',tgSvg]]) {
   const url=(cfg[key]||'').trim();const el=document.createElement(url?'a':'span');
   if(url){el.href=url;el.target='_blank';el.rel='noopener noreferrer';}
   else el.title=label+' account coming soon';
   el.innerHTML=svg+' '+label+(url?'':' · Soon');aisiNav.append(el);
 }
 document.body.prepend(aisiNav);
 const foot=document.createElement('div');foot.className='aisi-footer-note';
 foot.innerHTML='<strong>APU IS SUPER INTELLIGENT · $AISI · ETHEREUM</strong><br>Prelaunch concept. Contract: Coming Soon.. · Total supply: 1,000,000,000 · Tax: 0% · Uniswap V3 liquidity lock intended, not yet verified.<br>Independent meme project. No wallet-connection functionality on this website.';
 document.body.append(foot);
})();


