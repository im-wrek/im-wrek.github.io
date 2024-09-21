(() => {
    // Game Variables \\
    var clicks = 0
    var clicksPerSecond = 0
    var gameLoopTime = 1000
    var clickmulti = 1
    // Elements \\
    const clickmultiLabel = document.getElementById("clickMulti")
    const multiplyBtn = document.getElementsByClassName("multiply")[0]
    const clickers = document.getElementsByClassName("clicker")
    const upgrades = document.getElementsByClassName("upgrade")
    const clickBtn = document.getElementById("click")

    const clickLabel = document.getElementById("clicks")
    const autoclicksLabel = document.getElementById("autoclicks")
    // Functions \\
    function formatN(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    function updateButtons() {
        let multi = (parseInt(multiplyBtn.getAttribute("multi")) || 1)

        for (let i = 0; i < clickers.length; i++) {
            let element = clickers[i]
            let cost = parseFloat(element.getAttribute("cost")) * multi
            let autoclicks = (parseFloat(element.getAttribute("autoclicks")) || 0) * multi
            element.innerHTML = "Buy " + formatN(multi) + "x " + element.getAttribute("name") + " clicker(s) (" + formatN(cost) + " clicks)"
            element.setAttribute("title", "Gives " + formatN(autoclicks) + " Auto Clicks")
            if (clicks >= cost) {
                element.removeAttribute("disabled")
            } else {
                element.setAttribute("disabled", true)
            }
        }
        
        for (let i = 0; i < upgrades.length; i++) {
            let element = upgrades[i]
            let cost = parseFloat(element.getAttribute("cost"))
            if (clicks >= cost) {
                element.removeAttribute("disabled")
            } else {
                element.setAttribute("disabled", true)
            }
        }
    }

    function setupButtons() {
        let multi = (parseInt(multiplyBtn.getAttribute("multi")) || 1)
        for (let i = 0; i < clickers.length; i++) {
            let element = clickers[i]
            element.insertAdjacentElement("afterend", document.createElement("div"))
            let cost = (parseFloat(element.getAttribute("cost")) || 0) * multi
            let autoclicks = (parseFloat(element.getAttribute("autoclicks")) || 0) * multi
            element.innerHTML += " (" + formatN(cost) + " clicks)"
            element.setAttribute("title", "Gives " + formatN(autoclicks) + " auto clicks")
            element.onclick = function () {
                let multi = (parseInt(multiplyBtn.getAttribute("multi")) || 1)
                let cost = (parseInt(element.getAttribute("cost")) || 0) * multi
                let autoclicks = (parseFloat(element.getAttribute("autoclicks")) || 0) * multi
                if (clicks >= cost) {
                    clicks -= cost
                    clicksPerSecond += autoclicks
                    update()
                }
            }
        }

        for (let i = 0; i < upgrades.length; i++) {
            let element = upgrades[i]
            let cost = parseInt(element.getAttribute("cost")) || 0
            let rebirth = parseInt(element.getAttribute("rebirth")) || 0
            if (clicks >= cost) {
                element.removeAttribute("disabled")
            } else {
                element.setAttribute("disabled", true)
            }
            element.innerHTML += " (" + formatN(cost) + " clicks)"
            element.onclick = function () {
                if (rebirth > 0) {
                    clickmulti += 1
                    clicks = 0
                    clicksPerSecond = 0
                    update()
                }
            }
        }

        multiplyBtn.innerHTML = (parseInt(multiplyBtn.getAttribute("multi")) || 1) + "x clickers"

        multiplyBtn.onclick = function () {
            multiplyBtn.setAttribute("multi", (parseInt(multiplyBtn.getAttribute("multi")) || 1) * 10)

            multiplyBtn.innerHTML = formatN(parseInt(multiplyBtn.getAttribute("multi")) || 1) + "x clickers"

            let multi = parseInt(multiplyBtn.getAttribute("multi")) || 1
            if (multi > 9999999) {
                multiplyBtn.setAttribute("multi", 1)
            }
            multiplyBtn.innerHTML = formatN(parseInt(multiplyBtn.getAttribute("multi")) || 1) + "x clickers"

            updateButtons()
            update()
        }
    }

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function updateLabels() {
        clickLabel.innerHTML = "Clicks: " + formatN(clicks)
        autoclicksLabel.innerHTML = formatN(clicksPerSecond) + " cps"
        clickmultiLabel.innerHTML = formatN(clickmulti) + "x Click Multi"
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    function update() {
        updateButtons()
        updateLabels()
        setCookie("c", clicks, 365)
        setCookie("cs", clicksPerSecond, 365)
        setCookie("cm", clickmulti, 365)
    }

    function gameLoop() {
        if (clicksPerSecond > 0) {
            clicks += clickmulti
            update()
        }

        gameLoopTime = (1000 - (clicksPerSecond * 100))
    }

    function setup() {
        setupButtons()
        clicks = (parseInt(getCookie("c")) || 0)
        clicksPerSecond = (parseInt(getCookie("cs")) || 0)
        clickmulti = (parseInt(getCookie("cm")) || 1)
        clickBtn.onclick = function () {
            clicks += clickmulti
            update()
        }
        loop()
        update()
    }

    async function loop() {
        while (true) {
            gameLoop()
            await sleep(gameLoopTime)
        }
    }
    // Code \\
    setup()
})()