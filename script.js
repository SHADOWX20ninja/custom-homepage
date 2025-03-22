// Function to search Google
function searchGoogle() {
    let query = document.getElementById("search").value;
    if (query) {
        window.location.href = `https://www.google.com/search?q=${query}`;
    }
}

// Function to start voice search
function startVoiceSearch() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        document.getElementById("search").value = transcript;
        searchGoogle();
    };

    recognition.onerror = function(event) {
        alert("Voice recognition failed. Please try again.");
    };
}

// Function to open Google Lens
function openGoogleLens() {
    window.open("https://lens.google.com", "_blank");
}

// Theme Changer
document.getElementById("theme-toggle").addEventListener("click", function() {
    document.getElementById("theme-popup").style.display = "block";
});

document.getElementById("close-theme").addEventListener("click", function() {
    document.getElementById("theme-popup").style.display = "none";
});

// Function to apply theme
document.querySelectorAll(".color-box").forEach(box => {
    box.style.background = `linear-gradient(to bottom, ${box.getAttribute("data-color")})`;
    
    box.addEventListener("click", function() {
        let videoUrl = this.getAttribute("data-video");

        // If it's a video theme, apply video background
        if (videoUrl) {
            let videoBg = document.getElementById("video-bg");
            if (!videoBg) {
                videoBg = document.createElement("video");
                videoBg.id = "video-bg";
                videoBg.loop = true;
                videoBg.muted = true;
                videoBg.autoplay = true;
                videoBg.style.position = "fixed";
                videoBg.style.top = "0";
                videoBg.style.left = "0";
                videoBg.style.width = "100vw";
                videoBg.style.height = "100vh";
                videoBg.style.objectFit = "cover";
                videoBg.style.zIndex = "-1";
                document.body.appendChild(videoBg);
            }
            videoBg.src = videoUrl;
        } else {
            // Apply normal color theme
            document.body.style.background = `linear-gradient(to bottom, ${this.getAttribute("data-color")})`;

            // Remove video if exists
            let existingVideo = document.getElementById("video-bg");
            if (existingVideo) {
                existingVideo.remove();
            }
        }

        // Close theme popup
        document.getElementById("theme-popup").style.display = "none";
    });
});

// Function to load saved shortcuts from localStorage
function loadShortcuts() {
    let shortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [];
    let quickLinksContainer = document.querySelector(".quick-links");

    // Remove existing shortcuts before reloading
    document.querySelectorAll(".custom-shortcut").forEach(el => el.remove());

    // Add each saved shortcut
    shortcuts.forEach(shortcut => {
        let a = document.createElement("a");
        a.href = shortcut.url;
        a.target = "_blank";
        a.classList.add("custom-shortcut");
        a.innerHTML = `<i class="fa-solid fa-link"></i> ${shortcut.name}`;

        // Right-click to delete shortcut
        a.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            if (confirm(`Remove shortcut "${shortcut.name}"?`)) {
                removeShortcut(shortcut.url);
            }
        });

        quickLinksContainer.appendChild(a);
    });
}

// Function to add a new shortcut
document.getElementById("add-shortcut-btn").addEventListener("click", function () {
    let name = prompt("Enter shortcut name:");
    let url = prompt("Enter shortcut URL:");

    if (name && url) {
        let shortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [];
        shortcuts.push({ name, url });
        localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
        loadShortcuts();
    }
});

// Function to remove a shortcut
function removeShortcut(url) {
    let shortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [];
    shortcuts = shortcuts.filter(shortcut => shortcut.url !== url);
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
    loadShortcuts();
}

// Load shortcuts when page loads
document.addEventListener("DOMContentLoaded", loadShortcuts);
