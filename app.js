(()=>{
const KEY='arjun-habits-v1';
let S=JSON.parse(localStorage.getItem(KEY)||'[]');
const save=()=>localStorage.setItem(KEY,JSON.stringify(S));
const today=()=>new Date().toISOString().slice(0,10);
function render(){
  list.innerHTML=S.map((h,i)=>`<li><div><strong>${h.name}</strong><div class="streak">${h.streak} day streak</div></div>
  <button class="done" data-i="${i}">${h.last===today()?'Done ✓':'Mark today'}</button></li>`).join('')||'<li>No habits yet</li>';
}
add.onsubmit=e=>{e.preventDefault(); const n=new FormData(e.target).get('habit').trim(); if(!n)return;
  S.push({name:n,streak:0,last:null}); save(); e.target.reset(); render();};
list.onclick=e=>{const b=e.target.closest('button[data-i]'); if(!b)return; const h=S[+b.dataset.i];
  if(h.last===today())return; const y=new Date(); y.setDate(y.getDate()-1);
  const yest=y.toISOString().slice(0,10); h.streak=(h.last===yest?h.streak+1:1); h.last=today(); save(); render();};
render();
})();
