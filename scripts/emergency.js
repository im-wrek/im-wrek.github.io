document.onload = function(){
    document.body.insertAdjacentHTML("beforeend", "<footer>Press  Slash '/' at any time to go to Google Classroom")

    document.addEventListener("keyup", (ev) => {
        let key = ev.key.toLowerCase()

        console.log(key)
    
        if (key === "slash"){
            window.location.href = "https://classroom.google.com/"; 
        }
    })
}