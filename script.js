const collapse = document.querySelector(".collapse-img");

const nav = document.querySelector("nav ul");

const close = document.querySelector(".close");

const shorten = document.querySelector(".shorten");

const urlInput = document.querySelector(".url-shorten-input");

const form = document.querySelector(".form");

const homeSection = document.querySelector(".home-section");

const btn = document.createElement("li");

const inputContainer = document.querySelector(".input-container");

const inputUrl = document.querySelector(".input-url");

const arr = [];

btn.innerText = "Login";
let appended = false;
const hr = document.createElement("hr");
const button = document.createElement("li");
button.innerText = "Sign Up";
button.classList.add("btn-signup");

collapse.addEventListener("click", function () {
  close.classList.add("active");
  collapse.classList.add("remove");
  if (!appended) addChildren();
  nav.classList.add("responsive");
});

close.addEventListener("click", function () {
  close.classList.remove("active");
  nav.classList.remove("responsive");
  collapse.classList.remove("remove");
});

window.addEventListener("resize", function () {
  try {
    if (window.visualViewport.width > 900) removeChild();
    else addChildren();
  } catch (error) {}
});

async function getData(url) {
  const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
  const data = await res.json();
  return data.result;
}

shorten.addEventListener("click", function () {
  const url = urlInput.value;
  if (url == "") {
    form.classList.add("error");
    urlInput.classList.add("error");
  } else {
    if (form.classList.contains("error")) {
      form.classList.remove("error");
      urlInput.classList.remove("error");
    } 
      async function callAsync() {
        let x = await getData(url);
        if (!x) console.log("Incorrect URL ");
        else {
          let shorten_url = x.full_short_link;
          addShortedUrl(url, shorten_url);
        }
      }
      callAsync();
  }
});

function addShortedUrl(org, short) {
  const divUrl = document.createElement("div");
  divUrl.classList.add("url-div");
  inputUrl.appendChild(divUrl);
  const orgDiv = document.createElement("div");
  divUrl.appendChild(orgDiv);
  orgDiv.innerText = org;

  const shortDiv = document.createElement("div");
  shortDiv.classList.add("shortDiv");
  const copiedBtn = document.createElement("button");
  divUrl.appendChild(shortDiv);
  shortDiv.innerHTML = short;
  shortDiv.style.color = "hsl(180, 66%, 49%)";
  copiedBtn.innerText = "Copy";
  copiedBtn.classList.add("copied");
  shortDiv.appendChild(copiedBtn);

  copiedBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(short).then(() => {
      copiedBtn.style.backgroundColor = "hsl(257, 27%, 26%)";
      copiedBtn.innerText = "Copied!";
    });
  });

}

function addChildren() {
  nav.appendChild(hr);
  nav.appendChild(btn);
  appended = true;
  nav.appendChild(button);
}

function removeChild() {
  nav.removeChild(hr);
  nav.removeChild(btn);
  appended = false;
  nav.removeChild(button);
}

