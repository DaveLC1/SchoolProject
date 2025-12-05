import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth,email,password)
  .then(() => window.location.href="admin.html")
  .catch(err => alert(err.message));
});

const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn){
  logoutBtn.addEventListener("click",()=>{
    signOut(auth).then(()=>window.location.href="index.html");
  });
}