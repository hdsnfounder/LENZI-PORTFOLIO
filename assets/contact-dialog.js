(function(){
 const overlay=document.getElementById('contact-dialog');if(!overlay)return;
 const close=overlay.querySelector('.contact-close'),form=overlay.querySelector('#contact-form');
 const button=form.querySelector('[type="submit"]'),note=form.querySelector('.contact-form-note');let previous=null;
 function open(e){if(e)e.preventDefault();previous=document.activeElement;overlay.hidden=false;document.body.classList.add('contact-open');form.querySelector('input').focus()}
 function shut(){overlay.hidden=true;document.body.classList.remove('contact-open');if(previous&&previous.focus)previous.focus()}
 document.querySelectorAll('.contact-trigger').forEach(a=>a.addEventListener('click',open));
 close.addEventListener('click',shut);overlay.addEventListener('click',e=>{if(e.target===overlay)shut()});
 document.addEventListener('keydown',e=>{if(overlay.hidden)return;if(e.key==='Escape')shut();if(e.key==='Tab'){const els=[...overlay.querySelectorAll('button,input,textarea,a[href]:not([hidden])')];const i=els.indexOf(document.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();els[els.length-1].focus()}else if(!e.shiftKey&&i===els.length-1){e.preventDefault();els[0].focus()}}});
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(!form.reportValidity())return;
  button.disabled=true;button.textContent='SENDING…';note.textContent='SENDING YOUR MESSAGE…';note.setAttribute('role','status');
  try{
   const response=await fetch('https://formspree.io/f/xljjowgj',{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});
   if(!response.ok)throw new Error('Form submission failed');
   form.reset();note.textContent='MESSAGE SENT. THANK YOU — I’LL BE IN TOUCH.';
  }catch(err){note.textContent='MESSAGE NOT SENT. PLEASE TRY AGAIN.';}
  finally{button.disabled=false;button.innerHTML='SEND MESSAGE <span aria-hidden="true">↗</span>';}
 });
})();
