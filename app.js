const player=document.querySelector('#player');
const tabs=[...document.querySelectorAll('[role=tab]')];
let selected=0;
const clock=t=>`${Math.floor(t/60).toString().padStart(2,'0')}:${Math.floor(t%60).toString().padStart(2,'0')}`;
function seek(t){player.currentTime=Math.min(t,player.duration||samples[selected].duration);player.play().catch(()=>{});}
function selectSample(i){
 selected=i;const s=samples[i];player.pause();player.src=s.video;player.poster=s.poster;
 document.querySelector('#media-error').hidden=true;
 document.querySelector('#query').textContent=s.query;document.querySelector('#translation').textContent=s.translation;
 document.querySelector('#duration').textContent=clock(s.duration);
 document.querySelector('#download').href=s.video;
 tabs.forEach((tab,j)=>{tab.setAttribute('aria-selected',j===i);tab.tabIndex=j===i?0:-1;});
 document.querySelector('#sample-panel').setAttribute('aria-labelledby',`tab${i}`);
 const rows=[['真值 GT',s.gt,'#48d7a1',null],['未使用 ETR',[s.without_etr],'#60a9f5',s.iou_without],['使用 ETR',[s.with_etr],'#ff7789',s.iou_with]];
 const tracks=document.querySelector('#tracks');tracks.replaceChildren();
 rows.forEach(([label,spans,color,iou])=>{
  const row=document.createElement('div');row.className='track';row.style.setProperty('--track-color',color);
  const name=document.createElement('span');name.className='track-name';name.textContent=label;
  const rail=document.createElement('div');rail.className='rail';
  spans.forEach(([start,end])=>{const b=document.createElement('button');b.className='segment';b.style.left=`${start/s.duration*100}%`;b.style.width=`${(end-start)/s.duration*100}%`;b.title=`${label} ${start}–${end} 秒`;b.setAttribute('aria-label',`播放${label}，${start} 至 ${end} 秒`);b.onclick=()=>seek(start);rail.append(b);});
  const cursor=document.createElement('span');cursor.className='cursor';cursor.setAttribute('aria-hidden','true');rail.append(cursor);
  const score=document.createElement('span');score.className='iou';score.textContent=iou===null?'标注':`IoU ${iou.toFixed(3)}`;
  row.append(name,rail,score);tracks.append(row);
 });
}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectSample(i));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectSample(next);tabs[next].focus();}});});
player.addEventListener('timeupdate',()=>{const pct=Math.min(100,player.currentTime/samples[selected].duration*100);document.querySelectorAll('.cursor').forEach(c=>c.style.left=`${pct}%`);});
player.addEventListener('error',()=>document.querySelector('#media-error').hidden=false);
document.querySelector('#replay').onclick=()=>seek(0);
document.querySelector('#jump').onclick=()=>seek(Math.max(0,samples[selected].gt[0][0]-1));
selectSample(0);
