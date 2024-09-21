(() => {
    // Game Variables \\
    var clicks = 0
    var clicksPerSecond = 0
    var gameLoopTime = 1000
    var clickmulti = 1
    // Elements \\
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
            element.setAttribute("title", "Gives " + formatN(autoclicks) + " auto clicks")
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
                let cost = (parseFloat(element.getAttribute("cost")) || 0) * multi
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
            let cost = parseFloat(element.getAttribute("cost")) * multi
            if (clicks >= cost) {
                element.removeAttribute("disabled")
            } else {
                element.setAttribute("disabled", true)
            }
            element.innerHTML += " (" + formatN(cost) + " clicks)"
            element.onclick = function () {

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

            update()
        }
    }

    function getCookieValue(cookieName){
        document.cookie.split(";").forEach(cookie => {
            var split = cookie.split("=")
            var key = split[0]
            var value = split[1]

            if (key == cookieName){
                return value;
            }
        })
    }

    function updateLabels() {
        clickLabel.innerHTML = "Clicks: " + formatN(clicks)
        autoclicksLabel.innerHTML = "Auto Clicks: " + formatN(clicksPerSecond) + "/s"
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    function update() {
        updateButtons()
        updateLabels()
        document.cookie = "clicks=" + clicks + ";autoclicks=" + clicksPerSecond + ";cmulti=" + clickmulti
    }

    function gameLoop() {
        clicks += clicksPerSecond
        update()
    }

    function setup() {
        setupButtons()
        clicks=getCookieValue(clicks)
        clicksPerSecond=getCookieValue(clicksPerSecond)
        clickmulti=getCookieValue(clickmulti)
        clickBtn.onclick = function () {
            clicks += clickmulti
            update()
        }
        loop()
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