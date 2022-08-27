"use strict";

const modal = document.querySelector(".register-modal");
const overlay = document.querySelector(".overlay");
const navbar = document.querySelector(".navbar");
const btnOpenModal = document.querySelectorAll(".open-modal");
const btnCloseModal = document.querySelector(".close-modal");

const btnScrollToSection1 = document.getElementById("learnMore");
const section1 = document.getElementById("section-1");
const section2 = document.getElementById("section-2");
const section3 = document.getElementById("section-3");



////////////////////////////////////
/////// page navigation
document.querySelector('.navbar-nav').addEventListener('click',function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav-link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})

  }
})
//////
////   nav hover ////
const handleHover = function(e, opacity){
  if(e.target.classList.contains('nav-link')){
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav-link');
    const logo = link.closest('nav').querySelector('img');

    siblings.forEach(el => {
      if( el !== link) el.style.opacity = opacity;
    })
    logo.style.opacity = opacity;
    
  }
}

navbar.addEventListener('mouseover',function(e){
  handleHover(e, 0.5)
})

navbar.addEventListener('mouseout',function(e){
  handleHover(e, 1)
})

/////////////////////////
//// opeartions tab 

const tabs = document.querySelectorAll('.operations-tab');
const tabContainer = document.querySelector('.operations-container')
const tabContent = document.querySelectorAll('.operations-content')

tabContainer.addEventListener('click',function(e){
  console.log()
  const clicked = e.target.closest('.operations-tab');

  if(!clicked) return;

  tabs.forEach(t => t.classList.remove('active-tab'))
  clicked.classList.add('active-tab')
 
  tabContent.forEach(t => t.classList.add('d-none'))
   document.querySelector(`.operations-content-${clicked.dataset.tab}`).classList.remove('d-none')
 
})

////////////////

////// reveal sections ////////////

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section-hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section-hidden')
})
////// load lazy image ///////////////

const imgTarget = document.querySelectorAll('img[data-src]')


const loadImg = function(entries, observer){
  const [entry] = entries;
console.log(entry.target)
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load',function(){
    this.classList.remove('blur-img')
  })
  observer.unobserve(entry.target)

}

const imgObserver = new IntersectionObserver(loadImg,{
  root: null,
  threshold: 0.15,
});

imgTarget.forEach(img => {
  imgObserver.observe(img)
})


//////////////////
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("d-none");
  overlay.classList.remove("d-none");
  navbar.classList.remove("position-sticky");
};
const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add("d-none");
  overlay.classList.add("d-none");
  navbar.classList.add("position-sticky");
};

btnOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

//btnOpenModal.addEventListener('click',openModal())
btnCloseModal.addEventListener("click", closeModal);

const r = document.querySelector(":root");
r.style.setProperty("--bs-primary-rgp", "blue");
r.style.setProperty("--bs-secondary", "blue");

btnScrollToSection1.addEventListener("click", function (e) {
    e.preventDefault()
  section1.scrollIntoView({behavior: "smooth"});
});

// const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

// document.querySelector('.navbar-nav').addEventListener('click', function(){
//   this.style.backgroundColor = randomColor()
// })
// document.querySelector('.nav-item').addEventListener('click', function(){
//   this.style.backgroundColor = randomColor()
// })
// document.querySelector('.nav-link').addEventListener('click', function(){
//   this.style.backgroundColor = randomColor()
// })
