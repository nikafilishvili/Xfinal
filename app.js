

const user = localStorage.getItem("currentUser");

if (
  (location.pathname.includes("home") ||
   location.pathname.includes("profile")) &&
  !user
) {
  location = "index.html";
}



function register() {
  let users = JSON.parse(localStorage.users || "[]");

  users.push({
    user: regUser.value,
    pass: regPass.value,
    following: [],
    bio: "",
    avatar: ""
  });

  localStorage.users = JSON.stringify(users);
  alert("Registered successfully!");
  location = "index.html";
}

function login() {
  let users = JSON.parse(localStorage.users || "[]");

  let found = users.find(
    u => u.user === loginUser.value && u.pass === loginPass.value
  );

  if (found) {
    localStorage.currentUser = found.user;
    location = "home.html";
  } else {
    alert("Wrong username or password");
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  location = "index.html";
}

function goProfile() {
  location = "profile.html";
}

function goHome() {
  location = "home.html";
}



function addPost() {
  let posts = JSON.parse(localStorage.posts || "[]");

  let post = {
    user: user,
    text: postInput.value,
    likes: 0,
    comments: [],
    time: new Date().toLocaleString()
  };

  let file = imgUpload.files[0];

  if (file) {
    let reader = new FileReader();

    reader.onload = () => {
      post.img = reader.result;
      posts.push(post);
      savePosts(posts);
    };

    reader.readAsDataURL(file);
  } else {
    posts.push(post);
    savePosts(posts);
  }
}

function savePosts(posts) {
  localStorage.posts = JSON.stringify(posts);
  loadPosts();
  if (postInput) postInput.value = "";
}



function like(i) {
  let posts = JSON.parse(localStorage.posts);
  posts[i].likes++;
  savePosts(posts);
}

function comment(i) {
  let text = prompt("Write your comment:");

  if (!text) return;

  let posts = JSON.parse(localStorage.posts);
  posts[i].comments.push(text);
  savePosts(posts);
}

function deletePost(i) {
  let posts = JSON.parse(localStorage.posts);

  if (posts[i].user !== user) {
    alert("You can delete only your posts!");
    return;
  }

  posts.splice(i, 1);
  savePosts(posts);
}



function loadPosts() {
  let posts = JSON.parse(localStorage.posts || "[]");
  let feed = document.getElementById("feed");

  if (!feed) return;

  feed.innerHTML = "";

  posts.reverse().forEach((p, i) => {
    feed.innerHTML += `
      <div class="post">

        <div class="post-content">
          <b>${p.user}</b>
          <p>${p.text}</p>

          ${p.img ? `<img src="${p.img}">` : ""}

          <div class="post-actions">
            <span onclick="like(${i})">❤️ ${p.likes}</span>
            <span onclick="comment(${i})">💬</span>
            ${
              p.user === user
                ? `<span onclick="deletePost(${i})">🗑️</span>`
                : ""
            }
          </div>

          <small>${p.time}</small>

          ${p.comments
            .map(c => `<div class="comment">💬 ${c}</div>`)
            .join("")}
        </div>

      </div>
    `;
  });
}



function saveProfile() {
  let users = JSON.parse(localStorage.users);
  let me = users.find(u => u.user === user);

  let file = avatarUpload.files[0];

  if (file) {
    let reader = new FileReader();

    reader.onload = () => {
      me.avatar = reader.result;
      me.bio = bioInput.value;
      localStorage.users = JSON.stringify(users);
      alert("Profile saved!");
    };

    reader.readAsDataURL(file);
  } else {
    me.bio = bioInput.value;
    localStorage.users = JSON.stringify(users);
    alert("Profile saved!");
  }
}



loadPosts();


(function addRandomPostsHomeOnly() {
  if (!location.pathname.includes("home")) return;

  const feed = document.getElementById("feed");
  if (!feed) return;

  const randomUsers = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"];
  const randomTexts = [
    "Loving this new platform!",
    "Just had an amazing coffee ☕",
    "Anyone up for a game tonight?",
    "Feeling productive today 💪",
    "Check out this cool photo!",
    "What are your thoughts on AI?"
  ];

  const randomImages = [
    "https://picsum.photos/400/200?random=" + Math.floor(Math.random()*1000),
    "https://picsum.photos/400/200?random=" + Math.floor(Math.random()*1000),
    "https://picsum.photos/400/200?random=" + Math.floor(Math.random()*1000)
  ];

  for (let i = 0; i < 3; i++) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    postDiv.innerHTML = `
      <div class="post-content">
        <b>${randomUsers[Math.floor(Math.random() * randomUsers.length)]}</b>
        <p>${randomTexts[Math.floor(Math.random() * randomTexts.length)]}</p>
        <img src="${randomImages[i]}">
        <div class="post-actions">
          <span class="like-btn">❤️ 0</span>
          <span class="comment-btn">💬</span>
        </div>
        <small>${new Date(
          Date.now() - Math.floor(Math.random() * 10000000)
        ).toLocaleString()}</small>
      </div>
    `;

    feed.prepend(postDiv); 

   
    let likes = 0;
    postDiv.querySelector(".like-btn").addEventListener("click", function() {
      likes++;
      this.textContent = `❤️ ${likes}`;
    });

   
    postDiv.querySelector(".comment-btn").addEventListener("click", function() {
      const text = prompt("Write your comment:");
      if (!text) return;
      const commentDiv = document.createElement("div");
      commentDiv.className = "comment";
      commentDiv.textContent = `💬 ${text}`;
      postDiv.querySelector(".post-content").appendChild(commentDiv);
    });
  }
})();
