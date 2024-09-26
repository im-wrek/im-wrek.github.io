function loadNavbar() {
    document.body.insertAdjacentHTML('beforebegin', `
<div class="topnav">
    <a href="https://im-wrek.github.io/home/">Home</a>
    <a href="https://im-wrek.github.io/home/#Experiences">Experiences</a>
    <a href="https://classroom.google.com">Google Classroom</a>
</div>`)
}

function loadHead() {
    document.head.insertAdjacentHTML('beforebegin', `
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3951713204124454"
        crossorigin="anonymous"></script>
    <meta property="og:title" content="im wrek's website" />
    <meta name="description" content="A cool website made by wrek, visit it please." />
    <meta property="og:description" content="A cool website made by wrek, visit it please." />
    <meta name="theme-color" content="#2127db" />
    <meta property="og:url" content="https://im-wrek.github.io/home" />
    <meta property="og:image" content="https://im-wrek.github.io/icon.png" />
    <meta property="og:type" content="website" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width height=device-height, initial-scale=1.0" />
    <link rel="stylesheet" href="https://im-wrek.github.io/style.css" hreflang="en">
    </link>
    <link rel="icon" type="image/x-icon" href="https://www.gstatic.com/classroom/ic_product_classroom_32.png">
    <title>Home</title>
    `)
}

function check() {
    if (document.body) {
        loadNavbar()
    } else {
        setTimeout(check)
    }
}

check() // Faster load times