function loadNavbar() {
    document.body.insertAdjacentHTML('beforebegin', `
<div class="topnav">
    <a href="/home/">Home</a>
    <a href="/home/#Experiences">Experiences</a>
    <a href="/home/#Links">Quick Links</a>
    <a href="https://classroom.google.com">Google Classroom</a>
</div>`)
}

function setupKeybind() {
    document.body.insertAdjacentHTML("beforeend", "<br/><footer>Press  Slash '/' at any time to go to Google Classroom</footer>")

    document.addEventListener("keyup", (ev) => {
        const target = ev.target
        if (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable) {

            return;
        }
        let key = ev.key.toLowerCase()

        if (key === "/") {
            window.location.href = "https://classroom.google.com/";
        }
    })

    document.head.insertAdjacentHTML("beforeend", `<script src="https://unpkg.com/twemoji@latest/dist/twemoji.min.js" crossorigin="anonymous">twemoji.parse(document.body)</script>`)
}


function check() {
    if (document.body) {
        if(window.location.href.includes("/index.html")===true){
            var url = document.querySelector('meta[property="og:url"]');
            url = url ? url.content : null;
            if(url!=undefined){
                window.location.href=url
            }
        }
        loadNavbar()
        setupKeybind()
    } else {
        setTimeout(check)
    }
}

check() // Faster load times 