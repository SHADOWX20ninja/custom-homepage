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

// Apply selected theme
document.querySelectorAll(".color-box").forEach(box => {
    box.style.background = `linear-gradient(to bottom, ${box.getAttribute("data-color")})`;
    box.addEventListener("click", function() {
        document.body.style.background = `linear-gradient(to bottom, ${this.getAttribute("data-color")})`;
        document.getElementById("theme-popup").style.display = "none";
    });
});
