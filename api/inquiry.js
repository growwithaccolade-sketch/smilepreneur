// Secure server-side relay. Set RESEND_API_KEY, LEADS_TO_EMAIL and LEADS_FROM_EMAIL on Vercel.
export default async function handler(req,res){
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'});}
 const {RESEND_API_KEY,LEADS_TO_EMAIL,LEADS_FROM_EMAIL}=process.env;
 if(!RESEND_API_KEY||!LEADS_TO_EMAIL||!LEADS_FROM_EMAIL)return res.status(503).json({error:'Enquiries are not configured yet'});
 let b=req.body||{};
 if(typeof b==='string'){try{b=JSON.parse(b)}catch{return res.status(400).json({error:'Invalid request'})}}
 const clean=v=>String(v||'').trim().slice(0,2000);
 if(b.website)return res.status(200).json({ok:true});
 const name=clean(b.name),email=clean(b.email),details=clean(b.details);
 if(name.length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||details.length<15||JSON.stringify(b).length>12000)return res.status(400).json({error:'Please provide a valid name, email and project details'});
 const keys=['name','email','phone','service','date','location','budget','details'];
 const body=keys.map(k=>`${k.toUpperCase()}: ${clean(b[k])}`).join('\n\n');
 try{const reply=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:LEADS_FROM_EMAIL,to:[LEADS_TO_EMAIL],reply_to:email,subject:`New Smilepreneur enquiry: ${name}`,text:body})});if(!reply.ok)throw new Error('Delivery failed');return res.status(200).json({ok:true})}catch{return res.status(502).json({error:'Unable to send enquiry'})}
}
