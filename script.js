document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Keep your box toggling functionality
  document.querySelectorAll(".box-content").forEach((box) => {
    box.addEventListener("click", () => {
      box.classList.toggle("active");
    });
  });
});
// Live Search Filter
document.querySelector(".search-input").addEventListener("input", () => {
  const searchText = document.querySelector(".search-input").value.toLowerCase();
  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box) => {
    const heading = box.querySelector("h2").textContent.toLowerCase();
    if (heading.includes(searchText)) {
      box.style.display = "block"; // Show if match
    } else {
      box.style.display = "none";  // Hide if no match
    }
  });
});
// Day/Night Toggle
const toggleBtn = document.querySelector(".theme-toggle");
const toggleIcon = toggleBtn.querySelector("i");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  // Toggle icon
  if (document.body.classList.contains("light-mode")) {
    toggleIcon.classList.remove("fa-moon");
    toggleIcon.classList.add("fa-sun");
  } else {
    toggleIcon.classList.remove("fa-sun");
    toggleIcon.classList.add("fa-moon");
  }
});
// Load preference
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  toggleIcon.classList.replace("fa-moon", "fa-sun");
}

// Save preference
toggleBtn.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
});
// Modal elements
const modal = document.getElementById("authModal");
const authBtn = document.getElementById("authBtn");
const toggleLink = document.getElementById("toggleLink");
const toggleText = document.getElementById("toggleText");
const modalTitle = document.getElementById("modalTitle");
const closeModal = document.getElementById("closeModal");
const userSection = document.getElementById("userSection");
const userNameSpan = document.getElementById("userName");

let isLogin = true;

// Open modal
userSection.addEventListener("click", () => {
  if (localStorage.getItem("loggedInUser")) {
    if (confirm("Do you want to log out?")) {
      localStorage.removeItem("loggedInUser");
      userNameSpan.textContent = "sign in";
    }
  } else {
    modal.style.display = "block";
  }
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Toggle login/register
toggleLink.addEventListener("click", () => {
  isLogin = !isLogin;
  modalTitle.textContent = isLogin ? "Login" : "Register";
  authBtn.textContent = isLogin ? "Login" : "Register";
  toggleText.innerHTML = isLogin
    ? `Don't have an account? <a id="toggleLink">Register</a>`
    : `Already have an account? <a id="toggleLink">Login</a>`;
});

// Auth action
authBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (isLogin) {
    // Login
    if (users[email] && users[email] === password) {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", email);
      userNameSpan.textContent = email.split("@")[0];
      modal.style.display = "none";
    } else {
      alert("Invalid email or password.");
    }
  } else {
    // Register
    if (users[email]) {
      alert("User already exists.");
    } else {
      users[email] = password;
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! Please login.");
      isLogin = true;
      modalTitle.textContent = "Login";
      authBtn.textContent = "Login";
      toggleText.innerHTML = `Don't have an account? <a id="toggleLink">Register</a>`;
    }
  }
});

// Load user on refresh
window.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    userNameSpan.textContent = user.split("@")[0];
  }
});







