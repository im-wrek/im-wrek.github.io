function loadNavbar() {
    document.body.insertAdjacentHTML('beforebegin', `
<div class="topnav">
    <a href="https://im-wrek.github.io/home/">Home</a>
    <a href="https://im-wrek.github.io/home/#Experiences">Experiences</a>
    <a href="https://classroom.google.com">Google Classroom</a>
</div>`)
}

function check() {
    if (document.body) {
        loadNavbar()
    } else {
        setTimeout(check)
    }
}

check() // Faster load times