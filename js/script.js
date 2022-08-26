"use strict";

const modal = document.querySelector(".register-modal");
const overlay = document.querySelector(".overlay");
const navbar = document.querySelector(".navbar");
const btnOpenModal = document.querySelectorAll(".open-modal");
const btnCloseModal = document.querySelector(".close-modal");

const btnScrollToSection1 = document.querySelector("#learnMore");
const section1 = document.querySelector("#section-1");
const section2 = document.querySelector("#section-2");
const section3 = document.querySelector("#section-3");

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
    const s1coords = section3.getBoundingClientRect();

    window.scrollTo(
        s1coords.left + window.pageXOffset,
        s1coords.top  + window.pageYOffset
    )
 // section3.scrollIntoView({ behavior: "smooth" });
});
