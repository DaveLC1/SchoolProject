import { db } from "./firebase.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const postsContainer = document.getElementById('postsContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const searchBar = document.getElementById('searchBar');

let allPosts = [];
let currentIndex = 0;
const POSTS_PER_PAGE = 7;

// Fetch posts
async function fetchPosts() {
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  allPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  renderPosts();
}

// Render posts
function renderPosts() {
  postsContainer.innerHTML = "";
  const slice = allPosts.slice(0, currentIndex + POSTS_PER_PAGE);
  slice.forEach(post => {
    const card = document.createElement('article');
    card.className = "post-card";
    card.innerHTML = `
      ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image">` : ""}
      <small class="post-date">${post.timestamp?.toDate().toLocaleDateString() || ""}</small>
      <h2 class="post-title">${post.title}</h2>
      <p class="post-excerpt">${post.content.substring(0, 200)}...</p>
      <div class="post-footer">
        <span class="views">𓁹 ${Math.floor(Math.random() * 1000)}</span>
        <a href="#" class="read-more">Read more</a>
      </div>
    `;
    postsContainer.appendChild(card);
  });
  currentIndex += POSTS_PER_PAGE;
  if (currentIndex >= allPosts.length) loadMoreBtn.style.display = "none";
}

// Load more button
loadMoreBtn.addEventListener('click', renderPosts);

// Search filter
searchBar.addEventListener('input', () => {
  const term = searchBar.value.toLowerCase();
  const filtered = allPosts.filter(post => post.title.toLowerCase().includes(term));
  postsContainer.innerHTML = "";
  filtered.forEach(post => {
    const card = document.createElement('article');
    card.className = "post-card";
    card.innerHTML = `
      ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image">` : ""}
      <small class="post-date">${post.timestamp?.toDate().toLocaleDateString() || ""}</small>
      <h2 class="post-title">${post.title}</h2>
      <p class="post-excerpt">${post.content.substring(0, 200)}...</p>
      <div class="post-footer">
        <span class="views">𓁹 ${Math.floor(Math.random() * 1000)}</span>
        <a href="#" class="read-more">Read more</a>
      </div>
    `;
    postsContainer.appendChild(card);
  });
});

fetchPosts();