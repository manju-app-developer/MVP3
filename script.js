// Check if User is Logged In
document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("user")) {
        if (window.location.pathname !== "/index.html") {
            window.location.href = "index.html";
        }
    } else if (window.location.pathname === "/index.html") {
        window.location.href = "home.html";
    }
});

// Login Function
function login() {
    let email = document.getElementById("email").value;
    let errorMessage = document.getElementById("error-message");

    if (!email.includes("@") || !email.includes(".")) {
        errorMessage.textContent = "Enter a valid email!";
        return;
    }

    localStorage.setItem("user", email);
    window.location.href = "home.html";
}

// Logout Function
function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

// Upload Image Function (Stores Images in Local Storage)
function uploadImage() {
    let imageInput = document.getElementById("imageInput");
    let captionInput = document.getElementById("captionInput");

    if (imageInput.files.length === 0) {
        alert("Please select an image!");
        return;
    }

    let file = imageInput.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        let posts = JSON.parse(localStorage.getItem("posts") || "[]");
        let newPost = { image: e.target.result, caption: captionInput.value };

        posts.unshift(newPost);
        localStorage.setItem("posts", JSON.stringify(posts));
        displayPosts();
    };

    reader.readAsDataURL(file);
}

// Display Uploaded Images
function displayPosts() {
    let feed = document.getElementById("feed");
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");

    feed.innerHTML = "";
    posts.forEach(post => {
        let postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerHTML = `<img src="${post.image}" alt="Uploaded Image"><p class="caption">${post.caption}</p>`;
        feed.appendChild(postDiv);
    });
}

// Show Posts on Page Load
if (window.location.pathname.includes("home.html")) {
    displayPosts();
}
