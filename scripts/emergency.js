document.addEventListener("keyup", (ev) => {
    let key = ev.key.toLowerCase()

    if (key === "backslash"){
        window.location.href = "https://classroom.google.com/"; 
    }
})

document.body.insertAdjacentHTML("beforeend", "<footer>Click Backslash '\' at any time to go to Google Classroom")