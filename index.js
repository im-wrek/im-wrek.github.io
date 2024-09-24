(() => {
    // Game Variables \\
    var clicks = 0
    var clicksPerSecond = 0
    var gameLoopTime = 100
    var clickmulti = 1

    const Clickers = [
        ["Bronze", 1, 10],
        ["Silver", 5, 50],
        ["Gold", 100, 1000],
        ["Platinum", 500, 5000],
        ["Diamond", 1000, 10000],
        ["Amethyst", 5000, 50000],
        ["Sapphire", 10000, 100000],
        ["Ruby", 100000, 1000000],
        ["Rose Gold", 500000, 5000000],
        ["Blood Diamond", 1000000, 10000000],
    ]
    // Elements \\
    const clickmultiLabel = document.getElementById("clickMulti")
    const clickers = document.getElementsByClassName("clicker")
    const upgrades = document.getElementsByClassName("upgrade")
    const clickBtn = document.getElementById("click")

    const clickLabel = document.getElementById("clicks")
    const autoclicksLabel = document.getElementById("autoclicks")
    // Functions \\
    function abbreviateNumber(value) {
        var newValue = value;
        if (value >= 1000) {
            var suffixes = ["", "K", "M", "B", "T", "QA", "QI", "SX", "SP", "OC", "NO", "DC", "UD", "DD", "TD", "QAD", "QID", "SXD", "SPD", "OCD", "NOD", "VG", "UVG"];
            var suffixNum = Math.floor(("" + value).length / 3);
            var shortValue = '';
            for (var precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
                var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
                if (dotLessShortValue.length <= 2) { break; }
            }
            if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
            newValue = shortValue + suffixes[suffixNum];
        }
        return newValue;
    }

    function formatN(x) {
        x = parseInt(x)
        if (x > 1e19) {
            return abbreviateNumber(x)
        } else {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
    }
    function updateButtons() {
        for (let i = 0; i < clickers.length; i++) {
            let element = clickers[i]
            let cost = parseFloat(element.getAttribute("cost"))
            let autoclicks = (parseFloat(element.getAttribute("autoclicks")) || 0)
            element.innerHTML = "Buy 1x " + element.name + " clicker(s) (" + formatN(cost) + " clicks)"
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
        for (let i = 0; i < clickers.length; i++) {
            let element = clickers[i]
            element.insertAdjacentElement("afterend", document.createElement("div"))
            let cost = (parseFloat(element.getAttribute("cost")) || 0)
            let autoclicks = (parseFloat(element.getAttribute("autoclicks")) || 0)
            element.innerHTML = "Buy 1x " + element.name + " clicker(s) (" + formatN(cost) + " clicks)"
            element.setAttribute("title", "Gives " + formatN(autoclicks) + " Auto Clicks")
            element.onclick = function () {
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
            let rebirths = parseInt(element.getAttribute("rebirths")) || 0
            if (clicks >= cost) {
                element.removeAttribute("disabled")
            } else {
                element.setAttribute("disabled", true)
            }
            element.innerHTML += " (" + formatN(cost) + " clicks)"
            element.onclick = function () {
                if (rebirths > 0) {
                    if (clicks >= cost) {
                        clickmulti += 1
                        clicks = 0
                        clicksPerSecond = 0
                        update()
                    }
                }
            }
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

    function update() {
        updateButtons()
        updateLabels()
    }

    const start = Date.now()

    function gameLoop() {
        clicks += clicksPerSecond/10

        console.log((Date.now() - start) / 1000, clicks)

        update()
        setTimeout(gameLoop, 100)
    }

    function setup() {
        let label = document.getElementById("clickers")
        Clickers.reverse()
        Clickers.forEach(item => {
            let newElement = document.createElement("button")
            newElement.setAttribute("autoclicks", item[1])
            newElement.setAttribute("cost", item[2])
            newElement.name = item[0]
            newElement.classList="clicker"
            label.insertAdjacentElement("afterend", newElement)
        })

        setupButtons()
        clicks = (parseInt(getCookie("c")) || 0)
        clicksPerSecond = (parseInt(getCookie("cs")) || 0)
        clickmulti = (parseInt(getCookie("cm")) || 1)
        clickBtn.onclick = function () {
            clicks += clickmulti
            update()
        }
        update()
        window.addEventListener('beforeunload', (event) => {
            setCookie("c", clicks, 365)
            setCookie("cs", clicksPerSecond, 365)
            setCookie("cm", clickmulti, 365)
        });
        gameLoop()
    }
    // Code \\
    setup()
})()
