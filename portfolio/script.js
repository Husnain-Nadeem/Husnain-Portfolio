/* ============ PROJECT DATA + MODAL ============ */
const P={
portfolio:{e:"// FLAGSHIP PROJECT",t:"Cloud DevOps Portfolio",s:"The portfolio is also a deployment project",x:"This website is itself a Cloud/DevOps project: source-controlled website code, automated deployment, cloud hosting and an interactive interface for technical workflows.",f:["GitHub","CI/CD","Build","S3","CloudFront","Live"],l:[["GitHub Repository","https://github.com/Husnain-Nadeem/Husnain-Portfolio"],["LinkedIn Project Post","https://lnkd.in/p/dmHtjmnh"]]},
cicd:{e:"// CI/CD",t:"CI/CD Automation",s:"Hands-on implementation",x:"Hands-on CI/CD and GitOps work covering AWS-native pipelines plus Jenkins and ArgoCD workflows.",f:["Git Push","CI Trigger","Build","Test","Containerize","Deploy"],l:[["GitHub Day 14","https://github.com/Husnain-Nadeem/aws-devops-zero-to-hero/tree/main/day-14"],["AWS CodePipeline LinkedIn","https://www.linkedin.com/posts/husnain-nadeem-81046a287_aws-cicd-codepipeline-activity-7487470553570656258-ecq6"],["Jenkins + ArgoCD LinkedIn","https://www.linkedin.com/posts/husnain-nadeem-81046a287_cicd-jenkins-argocd-activity-7484883892894851072-b9kB"]]},
research:{e:"// RESEARCH PROJECT",t:"Cloud Network Performance Benchmark",s:"AWS EC2 • iperf3 • automated measurements",x:"A reproducible AWS inter-region network study using EC2 instances in us-east-1 and us-west-2. Automated collection and analysis measure latency, jitter, packet loss, throughput and TCP retransmissions.",f:["EC2","iperf3","Collector","CSV","Analysis","Report"],l:[["GitHub Research Repository","https://github.com/Husnain-Nadeem/cloud-network-performance-benchmark"]]},
k8s:{e:"// CONTAINERS",t:"Kubernetes & Amazon EKS",s:"Hands-on implementation",x:"Hands-on Kubernetes and Amazon EKS work covering application deployment, manifests, services, ingress and Helm.",f:["Container","Manifest","Deploy","Service","Ingress","EKS"],l:[["GitHub Day 22","https://github.com/Husnain-Nadeem/aws-devops-zero-to-hero/tree/main/day-22"]]},
iac:{e:"// INFRASTRUCTURE",t:"Infrastructure as Code",s:"CloudFormation • Terraform learning",x:"Hands-on AWS Infrastructure as Code work using CloudFormation YAML templates, with continued Terraform learning.",f:["Template","Validate","Plan","Provision","Verify"],l:[["CloudFormation LinkedIn","https://www.linkedin.com/posts/husnain-nadeem-81046a287_aws-cloudformation-iac-activity-7480590100247146497-h9Sj"]]},
iot:{e:"// EMBEDDED / IoT",t:"Smart IoT Automation",s:"Academic project",x:"ESP32-based smart home automation using sensors, relays and MQTT communication.",f:["Sensors","ESP32","MQTT","Automation","Control"],l:[["GitHub Final Project","https://github.com/Husnain-Nadeem/Embedded-IOT-Fall-2025-/tree/main/Final-Project"]]}
};
const modal=document.querySelector("#modal");
document.querySelectorAll("[data-p]").forEach(c=>c.addEventListener("click",()=>{
  let p=P[c.dataset.p];
  document.querySelector("#me").textContent=p.e;
  document.querySelector("#mt").textContent=p.t;
  document.querySelector("#ms").textContent=p.s;
  document.querySelector("#mx").textContent=p.x;
  document.querySelector("#flow").innerHTML=p.f.map((x,i)=>(i?'<span class="step-arrow">→</span>':"")+`<div class="step" data-i="${i}">${x}</div>`).join("");
  document.querySelector("#ml").innerHTML="<small>PROJECT LINKS</small>"+p.l.map(x=>`<a target="_blank" href="${x[1]}">${x[0]} ↗</a>`).join("");
  modal.style.display="grid";
  document.querySelectorAll(".step").forEach((x,i)=>setTimeout(()=>x.classList.add("active"),i*220));
}));
document.querySelector("#close").onclick=()=>modal.style.display="none";
modal.onclick=e=>{if(e.target===modal)modal.style.display="none"};
document.addEventListener("keydown",e=>{if(e.key==="Escape")modal.style.display="none"});

/* ============ TERMINAL LOG ============ */
const lines=["$ git push origin main","✓ pipeline triggered","✓ tests passed","✓ syncing cloud assets","✓ deployment complete"];
let li=0;
function log(){
  if(li>=lines.length){setTimeout(()=>{document.querySelector("#log").innerHTML="";li=0;log()},1800);return}
  let d=document.createElement("div");d.textContent=lines[li];if(li)d.className="ok";
  document.querySelector("#log").append(d);li++;setTimeout(log,550);
}
log();

/* ============ CURSOR GLOW ============ */
document.onpointermove=e=>{document.querySelector(".glow").style.left=e.clientX+"px";document.querySelector(".glow").style.top=e.clientY+"px"};

/* ============ 3D TILT ON CARDS ============ */
function enableTilt(el,strength=10){
  el.addEventListener("mousemove",e=>{
    const r=el.getBoundingClientRect();
    const px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
    const rx=(py-0.5)*-strength, ry=(px-0.5)*strength;
    el.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    el.style.setProperty("--mx",(px*100)+"%");
    el.style.setProperty("--my",(py*100)+"%");
  });
  el.addEventListener("mouseleave",()=>{el.style.transform="perspective(900px) rotateX(0) rotateY(0) translateY(0)"});
}
document.querySelectorAll(".grid article").forEach(el=>enableTilt(el,9));
document.querySelectorAll(".research-card").forEach(el=>enableTilt(el,5));

/* ============ SCROLL REVEAL ============ */
const io=new IntersectionObserver(entries=>{
  entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target)}});
},{threshold:.15});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

/* ============ HERO PARTICLE / COSTUME-REVEAL EFFECT ============
   The photo is sampled into a grid of tiny cells. Wherever the mouse gets
   close, those cells recolor toward a costume theme: a dark cowl+suit wash
   for "Bat Mode", or a red/gold plated suit for "Iron Mode", with glowing
   eye-slits / chest emblem drawn over the head + torso region of the photo.
   These are original stylized silhouettes, not copies of any specific
   copyrighted character art. "Photo" mode just gives a soft cyan shimmer.
*/
(function(){
  const box=document.getElementById("photoBox");
  const img=document.getElementById("heroImg");
  const canvas=document.getElementById("particleCanvas");
  const reticle=document.getElementById("reticle");
  const modeBtns=document.querySelectorAll(".hero-modes button");
  const ctx=canvas.getContext("2d");
  let W=0,H=0,cols=0,rows=0,cw=0,ch=0;
  let particles=[];
  let typeBat=null, typeCore=null;
  let mode="off"; // off | bat | core
  let mouse={x:-9999,y:-9999,active:false};
  const REVEAL_R=132;

  const THEME={
    bat:{ambient:[14,18,28],suit:[16,20,30],glow:[140,225,255]},
    core:{ambient:[110,16,16],suit:[150,24,20],glow:[255,200,80]},
    off:{ambient:[85,230,208],suit:[85,230,208],glow:[85,230,208]}
  };

  // Build a type grid (0=untouched,1=suit/mask silhouette,2=glow accent)
  // shaped like a cowl+shoulders (bat) or faceplate+shoulders (iron) laid
  // over a standard head-and-shoulders portrait crop.
  function buildTypeMask(kind,cols,rows){
    const off=document.createElement("canvas");
    off.width=cols; off.height=rows;
    const o=off.getContext("2d");
    o.clearRect(0,0,cols,rows);
    const cx=cols*0.5;

    // pass 1: suit silhouette, marked in the RED channel
    o.fillStyle="rgb(255,0,0)";
    if(kind==="bat"){
      o.beginPath();o.ellipse(cx,rows*0.30,cols*0.24,rows*0.19,0,0,Math.PI*2);o.fill();
      o.beginPath();o.ellipse(cx,rows*0.41,cols*0.18,rows*0.105,0,0,Math.PI*2);o.fill();
      const ear=sign=>{
        o.beginPath();
        o.moveTo(cx+sign*cols*0.065,rows*0.19);
        o.lineTo(cx+sign*cols*0.14,rows*0.01);
        o.lineTo(cx+sign*cols*0.01,rows*0.145);
        o.closePath();o.fill();
      };
      ear(1);ear(-1);
    }else{
      o.beginPath();o.ellipse(cx,rows*0.29,cols*0.225,rows*0.175,0,0,Math.PI*2);o.fill();
      o.beginPath();
      o.moveTo(cx-cols*0.19,rows*0.34);
      o.lineTo(cx+cols*0.19,rows*0.34);
      o.lineTo(cx+cols*0.09,rows*0.48);
      o.lineTo(cx-cols*0.09,rows*0.48);
      o.closePath();o.fill();
    }
    // shoulders / suit torso, shared shape
    o.beginPath();
    o.moveTo(cx-cols*0.42,rows*0.52);
    o.lineTo(cx+cols*0.42,rows*0.52);
    o.lineTo(cx+cols*0.55,rows*1.08);
    o.lineTo(cx-cols*0.55,rows*1.08);
    o.closePath();o.fill();

    // pass 2: glow accents, marked in the GREEN channel (drawn after -> wins)
    o.fillStyle="rgb(0,255,0)";
    const slit=(sign)=>{
      o.save();o.translate(cx+sign*cols*0.07,rows*0.285);o.rotate(sign*0.25);
      o.fillRect(-cols*0.03,-rows*0.012,cols*0.06,rows*0.022);
      o.restore();
    };
    slit(1);slit(-1);
    if(kind==="bat"){
      // small bat emblem on the chest
      const ex=cx, ey=rows*0.66, s=cols*0.05;
      o.beginPath();o.ellipse(ex,ey,s*0.9,s*0.55,0,0,Math.PI*2);o.fill();
      const wing=sign=>{
        o.beginPath();
        o.moveTo(ex,ey-s*0.2);
        o.bezierCurveTo(ex+sign*s*1.6,ey-s*1.2,ex+sign*s*2.2,ey-s*0.2,ex+sign*s*2.6,ey-s*0.6);
        o.bezierCurveTo(ex+sign*s*2.0,ey+s*0.2,ex+sign*s*1.2,ey+s*0.3,ex+sign*s*0.6,ey+s*0.15);
        o.closePath();o.fill();
      };
      wing(1);wing(-1);
    }else{
      // chest arc-reactor circle
      o.beginPath();o.arc(cx,rows*0.68,cols*0.055,0,Math.PI*2);o.fill();
    }

    const data=o.getImageData(0,0,cols,rows).data;
    const grid=new Uint8Array(cols*rows);
    for(let i=0;i<cols*rows;i++){
      const g=data[i*4+1], r=data[i*4];
      grid[i]= g>90 ? 2 : (r>90 ? 1 : 0);
    }
    return grid;
  }

  function buildParticles(sourceImg){
    const off=document.createElement("canvas");
    off.width=cols; off.height=rows;
    const octx=off.getContext("2d");
    let data=null;
    if(sourceImg){
      try{
        octx.drawImage(sourceImg,0,0,cols,rows);
        data=octx.getImageData(0,0,cols,rows).data; // throws if canvas got tainted by CORS
      }catch(e){ data=null; }
    }
    if(!data) data=new Uint8ClampedArray(cols*rows*4).fill(90); // fallback: flat particles, real <img> still shows underneath

    particles=[];
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        const idx=(r*cols+c)*4;
        const x=c*cw+cw/2, y=r*ch+ch/2;
        particles.push({
          ox:x,oy:y,r,c,
          rr:data[idx],gg:data[idx+1],bb:data[idx+2],
          rv:0, // current eased reveal amount (0..1)
        });
      }
    }
    typeBat=buildTypeMask("bat",cols,rows);
    typeCore=buildTypeMask("core",cols,rows);
  }

  function init(){
    W=box.clientWidth; H=box.clientHeight;
    canvas.width=W; canvas.height=H;
    cols=58; rows=Math.round(cols*H/W);
    cw=W/cols; ch=H/rows;

    // Sample pixels from a SEPARATE image instance loaded with CORS enabled,
    // so the visible <img> on the page never depends on CORS to display.
    const sampler=new Image();
    sampler.crossOrigin="anonymous";
    sampler.onload=()=>buildParticles(sampler);
    sampler.onerror=()=>buildParticles(null);
    sampler.src=img.currentSrc || img.src;
    if(sampler.complete && sampler.naturalWidth) buildParticles(sampler);
  }

  function currentTypeGrid(){
    if(mode==="bat")return typeBat;
    if(mode==="core")return typeCore;
    return null;
  }

  function frame(){
    ctx.clearRect(0,0,W,H);
    const theme=THEME[mode]||THEME.off;
    const typeGrid=currentTypeGrid();
    const bound=REVEAL_R+30;

    for(const p of particles){
      const dx=p.ox-mouse.x, dy=p.oy-mouse.y;
      const roughD=Math.abs(dx)+Math.abs(dy);
      let target=0;
      if(mouse.active && roughD<bound){
        const d=Math.hypot(dx,dy);
        if(d<REVEAL_R) target=1-d/REVEAL_R;
      }
      p.rv+=(target-p.rv)*0.18;
      if(p.rv<0.01) continue; // fully faded -> leave transparent, sharp <img> shows through

      const type = typeGrid ? typeGrid[p.r*cols+p.c] : 0;
      const lum=(p.rr+p.gg+p.bb)/765; // 0..1

      let cr,cg,cb,alpha,glow=false,sizeMul=1.28;
      if(type===2){
        // glow accent: eyes / emblem / arc-reactor
        const shade=0.7+0.3*lum;
        cr=theme.glow[0]*shade; cg=theme.glow[1]*shade; cb=theme.glow[2]*shade;
        alpha=Math.min(1,p.rv*1.7);
        glow=true; sizeMul=1.5;
      }else if(type===1){
        const shade=0.4+0.6*lum;
        const tr=theme.suit[0]*shade, tg=theme.suit[1]*shade, tb=theme.suit[2]*shade;
        const a=Math.min(1,p.rv*1.1);
        cr=p.rr+(tr-p.rr)*a; cg=p.gg+(tg-p.gg)*a; cb=p.bb+(tb-p.bb)*a;
        alpha=Math.min(1,p.rv*1.3);
      }else{
        const a=(mode==="off"?0.34:0.55)*p.rv;
        cr=p.rr+(theme.ambient[0]-p.rr)*a; cg=p.gg+(theme.ambient[1]-p.gg)*a; cb=p.bb+(theme.ambient[2]-p.bb)*a;
        alpha=Math.min(1,p.rv*1.2);
      }

      ctx.globalAlpha=alpha;
      if(glow){ ctx.shadowColor=`rgb(${cr|0},${cg|0},${cb|0})`; ctx.shadowBlur=5; }
      ctx.fillStyle=`rgb(${cr|0},${cg|0},${cb|0})`;
      const s=cw*sizeMul;
      ctx.fillRect(p.ox-s/2,p.oy-(ch*sizeMul)/2,s,ch*sizeMul);
      if(glow) ctx.shadowBlur=0;
    }
    ctx.globalAlpha=1;
    requestAnimationFrame(frame);
  }

  box.addEventListener("mousemove",e=>{
    const r=box.getBoundingClientRect();
    mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top; mouse.active=true;
    reticle.style.left=mouse.x+"px"; reticle.style.top=mouse.y+"px";
  });
  box.addEventListener("mouseleave",()=>{mouse.active=false;});

  modeBtns.forEach(btn=>btn.addEventListener("click",()=>{
    modeBtns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    mode=btn.dataset.mode;
  }));

  function start(){ init(); requestAnimationFrame(frame); }
  if(img.complete && img.naturalWidth) start();
  else img.addEventListener("load",start);
  img.addEventListener("error",start);
  window.addEventListener("resize",()=>{init();});
})();