var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var slider = document.getElementById("slider-round");
noUiSlider.create(slider, {
  start: [0, 300],
  connect: true,
  step: 1,
  range: {
    min: 0,
    max: 300,
  },
});
var input0 = document.getElementById("input-0");
var input1 = document.getElementById("input-1");
var inputs = [input0, input1];
slider.noUiSlider.on("update", function (values, handle) {
  inputs[handle].value = Math.round(values[handle]);

  let minPrice = Number(input0.value);
  let maxPrice = Number(input1.value);
  let price = document.querySelectorAll("#price");
  let priceList = [];
  let priceBtn = document.getElementById("price-button");
  priceBtn.addEventListener("click", function () {
    for (i = 0; i < price.length; i++) {
      priceList.push(price[i]);
    }

    priceList.forEach((element) => {
      if (Number(element.innerText) < minPrice) {
        element.parentNode.classList.add("hide");
      } else {
        element.parentNode.classList.remove("hide");
      }
      if (Number(element.innerText) > maxPrice) {
        element.parentNode.classList.add("hide1");
      } else {
        element.parentNode.classList.remove("hide1");
      }
    });
  });
});

var setRangeSlider = (i, value) => {
  let arr = [null, null];
  arr[i] = value;
  slider.noUiSlider.set(arr);
};

inputs.forEach((el, index) => {
  el.addEventListener("change", (e) => {
    setRangeSlider(index, e.currentTarget.value);
  });
});

document.querySelector("#elastic").oninput = function () {
  let val = this.value.trim();
  let elasticItems = document.querySelectorAll(".product");
  console.log(elasticItems);
  if (val != " ") {
    elasticItems.forEach(function (elem) {
      if (elem.innerText.search(RegExp(val, "gi")) == -1) {
        elem.classList.add("hide");
      } else {
        elem.classList.remove("hide");
      }
    });
  } else {
    elasticItems.forEach(function (elem) {
      elem.classList.remove("hide");
    });
  }
};

const filterBox = document.querySelectorAll(".product");
document.querySelector("nav").addEventListener("click", (event) => {
  if (event.target.tagName !== "LI") return false;
  let filterClass = event.target.dataset["f"];

  filterBox.forEach((elem) => {
    if (!elem.classList.contains(filterClass) && filterClass !== "all-plants") {
      elem.classList.add("hide");
    } else {
      elem.classList.remove("hide");
    }
  });
});

let searchBtn = document.querySelector(".search-btn");
let searchInput = document.querySelector(".search-input");

searchBtn.onclick = function () {
  if (document.documentElement.clientWidth > 820) {
    searchInput.classList.toggle("hide");
  }
};

const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const cartIcn = document.querySelector(".cart")
if (menuBtn) {
  menuBtn.addEventListener("click", function (e) {
    document.body.classList.toggle("lock");
    menuBtn.classList.toggle("active");
    menu.classList.toggle("active");
    cartIcn.classList.toggle('hide')
  });
}
const menuLinks = document.querySelectorAll(".menu__link a[data-goto]");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector("header").offsetHeight;

      if (menuBtn.classList.contains("active")) {
        document.body.classList.remove("lock");
        menuBtn.classList.remove("active");
        menu.classList.remove("active");
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}

const leftBarIcon = document.querySelector(".left-bar__icon");
const leftBar = document.querySelector(".left-bar");
if (leftBarIcon) {
  leftBarIcon.addEventListener("click", function (e) {
    leftBarIcon.classList.toggle("active");
    leftBar.classList.toggle("active");
  });
}
