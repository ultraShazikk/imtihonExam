const eltemplate = document.querySelector(".template").content;
const ellist = document.querySelector(".List");
const eltemplate2 = document.querySelector(".template2").content;
const ellist2 = document.querySelector(".list2");
const elbtn = document.querySelector(".btn1");
const ellist3 = document.querySelector(".list3");
const eltemplate3 = document.querySelector(".template3").content;
let post = [];
let kamentariya = [];
let userId;

function imtihon(array, node) {
  node.innerHTML = null;

  array.forEach((im) => {
    const template = eltemplate.cloneNode(true);

    template.querySelector(".title").textContent = im.id;
    template.querySelector(".title2").textContent = im.name;
    template.querySelector(".title4").textContent = im.username;
    template.querySelector(".title3").textContent = im.email;
    template.querySelector(".btn1").dataset.userId = im.id;

    node.appendChild(template);
  });
}

async function nimadir() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const bir = await response.json();
  imtihon(bir, ellist);
}

nimadir();

////////P O S T/////////

function imtihonn(array, node) {
  node.innerHTML = null;

  array.forEach((nima) => {
    const template2 = eltemplate2.cloneNode(true);

    template2.querySelector(".mubinlolo").textContent = nima.userId;
    template2.querySelector(".mubinlolo2").textContent = nima.title;
    template2.querySelector(".mubinlolo3").textContent = nima.body;
    template2.querySelector(".bt").dataset.userId = nima.userId;

    node.appendChild(template2);
  });
}

async function nimadir2(userId) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const bir2 = await response.json();

  post = bir2.filter((post) => post.userId == userId);
  imtihonn(post, ellist2);
}

ellist.addEventListener('click', (evt) => {
  if (evt.target.matches('.btn1')) {
    ellist2.innerHTML = null;
    userId = evt.target.dataset.userId;
    nimadir2(userId);
    ellist3.innerHTML = null
  }
});


////////// K O M M E N T //////////


function imtihonnn(array, node) {
  node.innerHTML = null;

  array.forEach((kim) => {
    const template3 = eltemplate3.cloneNode(true);

    template3.querySelector(".heading").textContent = kim.postId;
    template3.querySelector(".heading2").textContent = kim.name;
    template3.querySelector(".heading3").textContent = kim.email;
    template3.querySelector(".then__text").textContent = kim.body;

    node.appendChild(template3);
  });
}

async function nimadir6(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  const bir4 = await response.json();
  imtihonnn(bir4, ellist3);
  kamentariya = bir4.filter((comment) => comment.postId == postId);
}

ellist2.addEventListener("click", (evt) => {
  const comButton = evt.target.matches(".bt");
  if (comButton) {
    const isButton = evt.target.dataset.userId;
    nimadir6(isButton);
    ellist3.innerHTML = null
  }
});