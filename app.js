/*=========================================
 APP.JS
 HARASHII PORTFOLIO 2026
 PART 1
=========================================*/

"use strict";

/*==============================
DOM
==============================*/

const $ = (selector, parent = document) =>
parent.querySelector(selector);

const $$ = (selector, parent = document) =>
[...parent.querySelectorAll(selector)];


/*==============================
ELEMENTS
==============================*/

const header = $(".header");

const navbar = $(".navbar");

const menuBtn = $(".menu-btn");

const navLinks = $$(".navbar a");

const sections = $$("section[id]");


/*==============================
STICKY HEADER
==============================*/

function stickyHeader(){

if(!header) return;

const update = ()=>{

header.classList.toggle(
"scrolled",
window.scrollY > 80
);

};

update();

window.addEventListener(
"scroll",
update,
{passive:true}
);

}


/*==============================
MOBILE MENU
==============================*/

function mobileMenu(){

if(!menuBtn || !navbar) return;

menuBtn.addEventListener("click",()=>{

menuBtn.classList.toggle("active");

navbar.classList.toggle("active");

document.body.classList.toggle("menu-open");

});

navLinks.forEach(link=>{

link.addEventListener("click",()=>{

menuBtn.classList.remove("active");

navbar.classList.remove("active");

document.body.classList.remove("menu-open");

});

});

}


/*==============================
ACTIVE NAVIGATION
==============================*/

function activeNavigation(){

if(!sections.length) return;

const observer = new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const id = entry.target.id;

navLinks.forEach(link=>{

link.classList.toggle(
"active",
link.getAttribute("href")==="#" + id
);

});

});

},

{

threshold:.45

}

);

sections.forEach(section=>{

observer.observe(section);

});

}


/*==============================
SMOOTH SCROLL
==============================*/

function smoothScroll(){

navLinks.forEach(link=>{

const href = link.getAttribute("href");

if(!href.startsWith("#")) return;

link.addEventListener("click",e=>{

e.preventDefault();

const target = $(href);

if(!target) return;

window.scrollTo({

top:target.offsetTop-80,

behavior:"smooth"

});

});

});

}


/*==============================
INITIALIZE
==============================*/

document.addEventListener(
"DOMContentLoaded",
()=>{

stickyHeader();

mobileMenu();

activeNavigation();

smoothScroll();

}
);
/*=========================================
 APP.JS
 HARASHII PORTFOLIO 2026
 PART 2
=========================================*/

/*==============================
SCROLL REVEAL
==============================*/

function scrollReveal(){

const elements=$$(`
.hero-content,
.hero-image,
.about-content,
.about-image,
.skill-card,
.service-card,
.project-card,
.testimonial-card,
.contact-card,
.contact-form,
.footer
`);

if(!elements.length) return;

const observer=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

observer.unobserve(entry.target);

}

});

},

{

threshold:.15

}

);

elements.forEach(element=>{

element.classList.add("hidden");

observer.observe(element);

});

}


/*==============================
BUTTON RIPPLE EFFECT
==============================*/

function rippleEffect(){

const buttons=$$("button,.btn");

buttons.forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const size=Math.max(

this.clientWidth,

this.clientHeight

);

const rect=this.getBoundingClientRect();

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=

e.clientX-rect.left-size/2+"px";

ripple.style.top=

e.clientY-rect.top-size/2+"px";

ripple.className="ripple";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

}


/*==============================
3D CARD EFFECT
==============================*/

function cardTilt(){

const cards=$$(`
.project-card,
.service-card,
.skill-card,
.testimonial-card
`);

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateX=(y-rect.height/2)/18;

const rotateY=(rect.width/2-x)/18;

card.style.transform=

`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

}


/*==============================
HERO PARALLAX
==============================*/

function heroParallax(){

const hero=$(".hero");

if(!hero) return;

window.addEventListener(

"mousemove",

(e)=>{

const x=(

window.innerWidth/2-e.clientX

)/40;

const y=(

window.innerHeight/2-e.clientY

)/40;

hero.style.backgroundPosition=

`${x}px ${y}px`;

}

);

}


/*==============================
INITIALIZE PART 2
==============================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

scrollReveal();

rippleEffect();

cardTilt();

heroParallax();

}

);
/*=========================================
 APP.JS
 HARASHII PORTFOLIO 2026
 PART 3
=========================================*/


/*==============================
COUNTER ANIMATION
==============================*/

function counterAnimation(){

const counters = $$(".counter");

if(!counters.length) return;

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const counter = entry.target;

const target = Number(counter.dataset.number);

let current = 0;

const duration = 1800;

const step = target / (duration / 16);

function update(){

current += step;

if(current < target){

counter.textContent = Math.floor(current);

requestAnimationFrame(update);

}else{

counter.textContent = target + "+";

}

}

update();

observer.unobserve(counter);

});

},

{

threshold:.5

}

);

counters.forEach(counter=>observer.observe(counter));

}


/*==============================
SKILL BAR ANIMATION
==============================*/

function skillsAnimation(){

const skills = $$(".progress span");

if(!skills.length) return;

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const bar = entry.target;

const width = bar.dataset.width;

bar.style.width = width;

observer.unobserve(bar);

});

},

{

threshold:.4

}

);

skills.forEach(bar=>{

bar.style.width="0";

observer.observe(bar);

});

}


/*==============================
TYPING EFFECT
==============================*/

function typingEffect(){

const element = $(".typing-text");

if(!element) return;

const words=[

"Développeur Web",

"UI Designer",

"Frontend Developer",

"Freelancer"

];

let word=0;

let letter=0;

let deleting=false;

function type(){

const current=words[word];

if(!deleting){

element.textContent=current.substring(0,letter++);

if(letter>current.length){

deleting=true;

setTimeout(type,1500);

return;

}

}else{

element.textContent=current.substring(0,letter--);

if(letter<0){

deleting=false;

word=(word+1)%words.length;

}

}

setTimeout(type,deleting?50:100);

}

type();

}


/*==============================
INITIALIZE PART 3
==============================*/

document.addEventListener("DOMContentLoaded",()=>{

counterAnimation();

skillsAnimation();

typingEffect();

});
/*=========================================
 APP.JS
 HARASHII PORTFOLIO 2026
 PART 4
=========================================*/

/*==============================
BACK TO TOP
==============================*/

function backToTop(){

const button = $(".back-to-top");

if(!button) return;

window.addEventListener("scroll",()=>{

button.classList.toggle(
"show",
window.scrollY > 500
);

},{passive:true});

button.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}


/*==============================
TOAST NOTIFICATION
==============================*/

function showToast(message,type="success"){

const toast=document.createElement("div");

toast.className=`toast ${type}`;

toast.innerHTML=`
<i class="fa-solid ${
type==="success"
?"fa-circle-check"
:"fa-circle-xmark"
}"></i>
<span>${message}</span>
`;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>toast.remove(),300);

},3000);

}


/*==============================
CONTACT FORM
==============================*/

function contactForm(){

const form=$(".contact-form");

if(!form) return;

form.addEventListener("submit",(e)=>{

e.preventDefault();

const name=form.querySelector("[name='name']");

const email=form.querySelector("[name='email']");

const message=form.querySelector("[name='message']");

if(!name.value.trim()){

showToast("Entrez votre nom.","error");

name.focus();

return;

}

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailRegex.test(email.value)){

showToast("Adresse email invalide.","error");

email.focus();

return;

}

if(message.value.trim().length<10){

showToast("Le message est trop court.","error");

message.focus();

return;

}

showToast("Message envoyé avec succès !");

form.reset();

});

}


/*==============================
CURRENT YEAR
==============================*/

function currentYear(){

const year=$("#year");

if(year){

year.textContent=new Date().getFullYear();

}

}


/*==============================
INITIALIZE
==============================*/

document.addEventListener("DOMContentLoaded",()=>{

backToTop();

contactForm();

currentYear();

});
/*=========================================
 APP.JS
 HARASHII PORTFOLIO 2026
 PART 5
=========================================*/

/*==============================
LAZY IMAGE
==============================*/

function lazyImages(){

const images=$$("img[data-src]");

if(!images.length) return;

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const img=entry.target;

img.src=img.dataset.src;

img.removeAttribute("data-src");

observer.unobserve(img);

});

});

images.forEach(img=>observer.observe(img));

}


/*==============================
FLOATING ELEMENTS
==============================*/

function floatingElements(){

$$(".float").forEach((element,index)=>{

element.style.animationDelay=`${index*.3}s`;

});

}


/*==============================
WINDOW RESIZE
==============================*/

function resizeHandler(){

let timer;

window.addEventListener("resize",()=>{

clearTimeout(timer);

timer=setTimeout(()=>{

document.body.classList.remove("menu-open");

menuBtn?.classList.remove("active");

navbar?.classList.remove("active");

},200);

});

}


/*==============================
OPTIMIZED SCROLL
==============================*/

function optimizedScroll(){

let ticking=false;

window.addEventListener("scroll",()=>{

if(!ticking){

window.requestAnimationFrame(()=>{

ticking=false;

});

ticking=true;

}

},{passive:true});

}


/*==============================
APP INIT
==============================*/

document.addEventListener("DOMContentLoaded",()=>{

lazyImages();

floatingElements();

resizeHandler();

optimizedScroll();

console.log(

"%cHARASHII PORTFOLIO 2026",

"color:#6C63FF;font-size:18px;font-weight:bold;"

);

});