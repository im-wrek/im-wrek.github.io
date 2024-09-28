function load() {
    document.body.insertAdjacentHTML("beforeend", "<footer>Press  Slash '/' at any time to go to Google Classroom")

    document.addEventListener("keyup", (ev) => {
        let key = ev.key.toLowerCase()

        if (key === "/") {
            window.location.href = "https://classroom.google.com/";
        }
    })
}

function check() {
    if (document.body) {
        load()
    } else {
        setTimeout(check)
    }
}

check() // Faster load times