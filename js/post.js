import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const postTitle = document.getElementById("postTitle");
const postDate = document.getElementById("postDate");
const postContent = document.getElementById("postContent");
const viewsEl = document.getElementById("views");

async function loadPost(){
  const docRef = doc(db,"posts",id);
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    const data = docSnap.data();
    postTitle.textContent = data.title;
    postDate.textContent = data.date;
    postContent.innerHTML = data.content;
    viewsEl.textContent = Math.floor(Math.random()*200);
  }
}

loadPost();
