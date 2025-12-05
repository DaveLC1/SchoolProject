import { auth, db, storage } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

// Initialize Quill editor
const quill = new Quill('#quillEditor', { theme: 'snow' });

const adminPanel = document.getElementById('adminPanel');
const loginBtn = document.getElementById('loginBtn');
const createBtn = document.getElementById('createBtn');
const adminPostsDiv = document.getElementById('adminPosts');

// Double-tap header to reveal admin panel
document.querySelector('.site-header').addEventListener('dblclick', () => {
  adminPanel.classList.toggle('hidden');
});

// Admin login
loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Admin logged in ✅");
    loadAdminPosts();
  } catch (err) {
    alert("Login failed ❌");
  }
});

// Create new post
createBtn.addEventListener('click', async () => {
  const title = document.getElementById('titleInput').value;
  const layout = document.getElementById('layoutSelect').value;
  const content = quill.root.innerHTML;
  const imageFile = document.getElementById('imageInput').files[0];

  let imageUrl = "";
  if (imageFile) {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "posts"), {
    title,
    content,
    imageUrl,
    layout,
    timestamp: serverTimestamp()
  });

  alert("Post created ✅");
  loadAdminPosts();
});

// Load posts for admin
async function loadAdminPosts() {
  adminPostsDiv.innerHTML = "";
  const snapshot = await getDocs(collection(db, "posts"));
  snapshot.docs.forEach(docSnap => {
    const data = docSnap.data();
    const postDiv = document.createElement('div');
    postDiv.className = "post-card";
    postDiv.innerHTML = `
      <h3>${data.title}</h3>
      <button data-id="${docSnap.id}" class="deleteBtn">Delete</button>
    `;
    adminPostsDiv.appendChild(postDiv);
  });

  // Delete functionality
  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      await deleteDoc(doc(db, "posts", id));
      loadAdminPosts();
    });
  });
}