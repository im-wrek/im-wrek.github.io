function loadNavbar() {
    document.body.insertAdjacentHTML('beforebegin', `
<div class="topnav">
    <a href="https://im-wrek.github.io/">Home</a>
    <a href="https://im-wrek.github.io/#Experiences">Experiences</a>
    <a href="https://im-wrek.github.io/changelog">Changelog</a>
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