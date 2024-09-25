function loadNavbar() {
    document.body.insertAdjacentHTML('beforebegin', `<div class="topnav">
    <a class="active" href="./index.html">Home</a>
    <a class="active" href="./index.html#Games">Games</a>
    <a class="active" href="./index.html#Tools">Tools</a>
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
