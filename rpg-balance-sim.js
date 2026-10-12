// v5: finalni C1 experiment — Strazce autowin fix (obrana), boss Lv3 hratelnost
const CLASSES={
 strazce:{hpMul:1.25,baseSila:12,baseObrana:8,baseSvetlo:6,silaPerLvl:2,obrPerLvl:1.5,svetloPerLvl:1},
 posel:{hpMul:1.0,baseSila:10,baseObrana:5,baseSvetlo:8,silaPerLvl:2,obrPerLvl:1,svetloPerLvl:1.5},
 ucednik:{hpMul:0.9,baseSila:6,baseObrana:4,baseSvetlo:12,silaPerLvl:1,obrPerLvl:1,svetloPerLvl:2.5}};
function hs(c,l,g){const C=CLASSES[c];g=g||{};return{
 sila:Math.round(C.baseSila+(l-1)*C.silaPerLvl+(g.sila||0)),
 obrana:Math.round(C.baseObrana+(l-1)*C.obrPerLvl+(g.obrana||0)),
 svetlo:Math.round(C.baseSvetlo+(l-1)*C.svetloPerLvl+(g.svetlo||0)),
 maxHp:Math.round((60+(l-1)*8)*C.hpMul)};}
// EXPERIMENTAL: defSoft 20→14, defRed 0.38→0.30 (Strazce fix)
const K={dmgBase:1.6,spellBase:2.0,defRed:0.30,defSoft:14,critBase:0.12,critMark:0.30,critCap:0.85,critMul:1.6,weaken:0.65,enrageStart:14};
const TIERS={light:0.62,standard:1.0,hard:1.28,boss:1.15};
// EXPERIMENTAL: nepratele dmg +15% (compensace def fix neni treba — def fix uz snizuje strazce); Lenost dmgB 8.6→9.0 (challenge)
const EN={
 lenost:{hpB:118,hpL:21,dmgB:9.0,dmgL:0.80,tempo:1.5,charge:1.7,ce:4.5},
 strach:{hpB:88,hpL:16,dmgB:7.2,dmgL:0.66,tempo:0.8,charge:1.3,ce:5.0,multi:2},
 pycha:{hpB:98,hpL:18,dmgB:8.2,dmgL:0.75,tempo:1.1,charge:1.5,ce:4.8,debuff:0.22},
 // EXPERIMENTAL: Had — boss tier 1.15 ale dmg skalovani zaridi, aby Lv3 byl hratelny (posel/uc maji na Lv3 slabe staty)
 had:{hpB:130,hpL:22,dmgB:6.8,dmgL:0.62,tempo:1.2,charge:1.7,ce:4.0,boss:true}};
function es(e,l,t){const E=EN[e];const T=TIERS[t];
 return{hp:Math.round((E.hpB+E.hpL*(l-1))*T),dmg:(E.dmgB+E.dmgL*(l-1))*T,tempo:E.tempo,charge:E.charge,ce:E.ce,multi:E.multi||1,debuff:E.debuff||0,boss:!!E.boss};}
function act(c,st,S,strat,rng){
 const a=[];
 if(c==='strazce'){a.push('attack');if(S.cdP===0)a.push('postoj');if(S.cdO===0)a.push('odrazeni');}
 else if(c==='posel'){a.push('attack');if(S.cdK===0)a.push('krok');if(S.cdM===0)a.push('misto');}
 else{a.push('paprsek');if(S.cdOc===0&&S.zare>=25)a.push('ocisteni');if(S.cdS===0&&S.zare>=40)a.push('slovo');}
 let p;const ch=S.eIntent==='charge';
 if(strat==='random')p=a[Math.floor(rng()*a.length)];
 else if(strat==='simple'){
  if(c==='strazce')p=S.guard?(S.cdO===0?'odrazeni':'attack'):(S.cdP===0&&rng()<0.4?'postoj':'attack');
  else if(c==='posel')p=S.cdM===0&&S.marked===0?'misto':'attack';
  else p=S.cdS===0&&S.zare>=40?'slovo':(S.hp<st.maxHp*0.4&&S.cdOc===0&&S.zare>=25?'ocisteni':'paprsek');}
 else{
  if(c==='strazce'){
   if(ch&&S.cdP===0&&!S.gN)p='postoj';
   else if(S.riposte>0&&S.cdO===0)p='odrazeni';
   else if(!ch&&S.cdO===0&&rng()<0.5)p='odrazeni';
   else p='attack';}
  else if(c==='posel'){
   if(ch&&S.cdK===0&&!S.dodge)p='krok';
   else if(S.cdM===0&&S.marked===0)p='misto';
   else p='attack';}
  else{
   if(S.debuff>0&&S.cdOc===0&&S.zare>=25)p='ocisteni';
   else if(S.hp<st.maxHp*0.45&&S.cdOc===0&&S.zare>=25)p='ocisteni';
   else if(ch&&S.cdS===0&&S.zare>=40)p='slovo';
   else if(S.cdS===0&&S.zare>=75)p='slovo';
   else p='paprsek';}}
 if(!a.includes(p))p='attack';
 return p;}
function battle(c,e,l,t,strat,seed,log){
 let s=seed||1;const rng=()=>{s=(s*1103515245+12345)&0x7fffffff;return s/0x7fffffff;};
 const gear=l>=10?{sila:10,obrana:8,svetlo:8}:l>=5?{sila:5,obrana:5,svetlo:5}:{sila:2,obrana:2,svetlo:2};
 const st=hs(c,l,gear);const en=es(e,l,t);
 let hp=st.maxHp,eHp=en.hp;
 const S={zare:50,cdP:0,cdO:0,cdK:0,cdM:0,cdOc:0,cdS:0,guard:false,gN:false,riposte:0,dodge:false,marked:0,weak:0,debuff:0,eIntent:'attack',eT:0,heals:0,healSum:0,blocks:0,dodges:0,crits:0,dD:0,dT:0};
 let turns=0;const maxT=40;
 while(hp>0&&eHp>0&&turns<maxT){
  turns++;const enr=turns>=K.enrageStart;
  const p2=en.boss&&eHp<en.hp/2;
  const a=act(c,st,S,strat,rng);
  let dmg=0,heal=0;
  if(c==='strazce'){
   if(a==='postoj'){S.guard=true;S.gN=true;S.cdP=3;}
   else if(a==='odrazeni'){dmg=Math.max(2,Math.round(st.sila*K.dmgBase*(0.85+rng()*0.3)*(S.riposte>0?(S.riposte===2?1.8:1.4):1.1)));S.riposte=0;S.cdO=4;}
   else dmg=Math.max(2,Math.round(st.sila*K.dmgBase*(0.85+rng()*0.3)));}
  else if(c==='posel'){
   if(a==='krok'){S.dodge=true;S.cdK=3;}
   else if(a==='misto'){S.marked=3;S.cdM=4;}
   else{let cc=K.critBase+(S.marked>0?K.critMark:0)+(l>=10?0.10:0);cc=Math.min(K.critCap,cc);
    const crit=rng()<cc;
    if(crit){S.crits++;S.cdK=Math.max(1,S.cdK-1);S.cdM=Math.max(1,S.cdM-1);}
    dmg=Math.max(2,Math.round(st.sila*K.dmgBase*(0.85+rng()*0.3)*(crit?K.critMul:1)));
    if(S.marked>0)S.marked--;}}
  else{
   if(a==='ocisteni'){heal=Math.round(st.maxHp*0.22);S.zare-=25;S.cdOc=3;S.debuff=0;S.heals++;S.healSum+=heal;}
   else if(a==='slovo'){dmg=Math.max(3,Math.round(st.svetlo*K.spellBase*(0.9+rng()*0.2)));S.zare-=40;S.cdS=3;S.weak=2;}
   else{dmg=Math.max(3,Math.round(st.svetlo*0.9));S.zare=Math.min(100,S.zare+12);}}
  if(S.debuff>0)dmg=Math.round(dmg*0.7);
  eHp-=dmg;S.dD+=dmg;hp=Math.min(st.maxHp,hp+heal);
  if(S.weak>0&&a!=='slovo')S.weak--;
  const intent=S.eIntent;
  const an=en.multi>1?(turns%2===0?en.multi:1):1;
  for(let i2=0;i2<an&&hp>0;i2++){
   let ed=Math.max(2,Math.round(en.dmg*(intent==='charge'?en.charge:1)*(0.85+rng()*0.3)*(enr?1.15:1)*(p2&&intent!=='charge'?1.25:1)));
   if(S.weak>0)ed=Math.round(ed*K.weaken);
   if(S.gN){S.gN=false;S.guard=false;S.riposte=2;S.blocks++;ed=0;}
   else if(S.guard){ed=Math.round(ed*0.5);S.guard=false;S.riposte=1;S.blocks++;}
   if(S.dodge){S.dodge=false;S.dodges++;ed=intent==='charge'?Math.round(ed*0.4):0;}
   const eff=Math.min(st.obrana,K.defSoft),soft=Math.max(0,st.obrana-K.defSoft);
   ed=Math.max(3,Math.round(ed-(eff*K.defRed+soft*0.2)));
   if(ed>0){hp-=ed;S.dT+=ed;}
   if(intent!=='charge'&&en.debuff>0&&rng()<en.debuff&&S.debuff===0)S.debuff=2;}
  S.eT+=en.tempo*(p2?1.35:1);
  if(S.eT>=en.ce){S.eIntent='charge';S.eT=0;}else S.eIntent='attack';
  if(S.debuff>0)S.debuff--;
  ['cdP','cdO','cdK','cdM','cdOc','cdS'].forEach(k=>{if(S[k]>0)S[k]--;});
  if(log)log.push({turn:turns,act:a,hp,eHp,intent});
 }
 return{win:eHp<=0&&hp>0,turns,hpL:Math.max(0,hp),heals:S.heals,healSum:S.healSum,blocks:S.blocks,dodges:S.dodges,crits:S.crits,dD:S.dD,dT:S.dT,to:turns>=maxT};}
function sim(c,e,l,t,strat,n){
 let w=0,ts=0,hp=0,heals=0,healSum=0,blocks=0,dodges=0,crits=0,dD=0,dT=0,o15=0,to=0,mx=0;
 for(let i=0;i<n;i++){const r=battle(c,e,l,t,strat,1000+i*7919);
  if(r.win){w++;ts+=r.turns;hp+=r.hpL;dD+=r.dD;dT+=r.dT;}
  heals+=r.heals;healSum+=r.healSum;blocks+=r.blocks;dodges+=r.dodges;crits+=r.crits;
  if(r.turns>15)o15++;if(r.to)to++;if(r.turns>mx)mx=r.turns;}
 return{wr:(w/n*100).toFixed(1),at:w?(ts/w).toFixed(1):'-',ah:w?Math.round(hp/w):'-',
  aD:w?Math.round(dD/w):'-',aT:w?Math.round(dT/w):'-',
  heals:(heals/n).toFixed(1),healSum:Math.round(healSum/n),blocks:(blocks/n).toFixed(1),dodges:(dodges/n).toFixed(1),crits:(crits/n).toFixed(1),o15,to,mx};}
const N=1000;
console.log('=== STANDARD v5-C1 (r/s/o) — EXPERIMENTAL ===');
for(const l of [1,5,10]){console.log('-- Lv'+l+' --');
 for(const c of ['strazce','posel','ucednik'])for(const e of ['lenost','strach','pycha']){
  console.log(c.padEnd(8),'vs',e.padEnd(6),'| r',sim(c,e,l,'standard','random',N).wr+'%','| s',sim(c,e,l,'standard','simple',N).wr+'%','| o',sim(c,e,l,'standard','optimal',N).wr+'%');}}
console.log('=== BOSS (s/o) — EXPERIMENTAL ===');
for(const l of [3,5,8,10])for(const c of ['strazce','posel','ucednik'])
 console.log('Lv'+l,c.padEnd(8),'| s',sim(c,'had',l,'boss','simple',N).wr+'%','| o',sim(c,'had',l,'boss','optimal',N).wr+'%/'+sim(c,'had',l,'boss','optimal',N).at+'t');
console.log('=== HARD (o) ===');
for(const l of [1,5,10]){const o=[];
 for(const c of ['strazce','posel','ucednik'])for(const e of ['lenost','strach','pycha'])
  o.push(c.slice(0,2)+'-'+e.slice(0,3)+':'+sim(c,e,l,'hard','optimal',N).wr);
 console.log('Lv'+l,o.join(' '));}
console.log('=== LIGHT (o) ===');
for(const l of [1,5,10]){const o=[];
 for(const c of ['strazce','posel','ucednik'])for(const e of ['lenost','strach','pycha'])
  o.push(c.slice(0,2)+'-'+e.slice(0,3)+':'+sim(c,e,l,'light','optimal',N).wr);
 console.log('Lv'+l,o.join(' '));}
console.log('=== METRIKY Lv5 (o) ===');
for(const c of ['strazce','posel','ucednik'])for(const e of ['lenost','strach','pycha']){
 const O=sim(c,e,5,'standard','optimal',N);
 console.log(c.padEnd(8),'vs',e.padEnd(6),'| win',O.wr+'%','| t',O.at,'| HP+',O.ah,'| taken',O.aT,
  c==='ucednik'?'| Očištění×'+O.heals:'',c==='strazce'?'| bloky×'+O.blocks:'',
  c==='posel'?'| úhyby×'+O.dodges+'| krity×'+O.crits:'','| >15t',O.o15,'| max',O.mx);}
console.log('=== STRAZCE Lv1 detail (rucni kontrola obrany) ===');
const st1=hs('strazce',1,{sila:2,obrana:2});
console.log('Obrana Lv1:',st1.obrana,'→ redukce',Math.min(st1.obrana,14)*0.30,'dmg');
const en1=es('lenost',1,'standard');
console.log('Lenost dmg:',en1.dmg.toFixed(1),'| charge:',(en1.dmg*1.7).toFixed(1));
console.log('po redukci: bežný ~'+Math.max(3,Math.round(en1.dmg-st1.obrana*0.30)),'| charge ~'+Math.max(3,Math.round(en1.dmg*1.7-st1.obrana*0.30)));
console.log('Strážce HP 75 → přežije ~'+Math.floor(75/Math.max(3,Math.round(en1.dmg-st1.obrana*0.30)))+' běžných zásahů');
