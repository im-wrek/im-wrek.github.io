(() => {
    // Game Variables \\
    var clicks = 0
    var clicksPerSecond = 0
    var clickmulti = 1
    var multiplier = 1

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
        ["Emerald", 5000000, 50000000],
        ["Alexandrite", 10000000, 100000000],
    ]

    const Upgrades = [
        ["Rebirth", [Rebirths = 1], 100000], // Format: ["Name", [Data], Cost] \\
    ]
    // Elements \\
    const clickmultiLabel = document.getElementById("clickMulti")
    const clickers = document.getElementsByClassName("clicker")
    const upgrades = document.getElementsByClassName("upgrade")
    const clickBtn = document.getElementById("click")
    const styleBtn = document.getElementById("style")
    const multiBtn = document.getElementById("multiply")

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
            let cost = parseFloat(element.getAttribute("cost")) * multiplier
            let autoclicks = (parseFloat(element.getAttribute("autoclicks")) || 0) * multiplier
            element.innerHTML = "Buy 1x " + element.name + " clicker(s) (" + formatN(cost) + " clicks)"
            element.title = "Gives " + formatN(autoclicks) + " Auto Clicks"
            if (clicks >= cost) {
                element.removeAttribute("disabled")
            } else {
                element.setAttribute("disabled", true)
            }
        }
    }

    function setupButtons() {
        let label = document.getElementById("clickers")
        Clickers.reverse()
        Clickers.forEach(item => {
            const name = item[0]
            const autoclicks = item[1]
            const cost = item[2]
            const element = document.createElement("button")
            element.setAttribute("cost", cost)
            element.setAttribute("autoclicks", autoclicks)

            element.name = name
            element.classList = "clicker"
            element.title = "Gives " + formatN(autoclicks) + " Auto Clicks"
            element.innerHTML = "Buy 1x " + name + " clicker " + "(" + formatN(cost) + " clicks)"
            label.insertAdjacentElement("afterend", element)
            element.insertAdjacentHTML("afterend", "<div class='s5px'></div>")

            element.onclick = function () {
                if (clicks > cost * multiplier) {
                    clicks -= cost * multiplier
                    clicksPerSecond += autoclicks * multiplier
                    update()
                }
            }
        })

        let styleSheet = document.getElementById('stylesheet')
        styleBtn.onclick = function () {
            let href = styleSheet.getAttribute("href")
            console.log(href)
            if (href == "") {
                styleSheet.setAttribute("href", "https://im-wrek.github.io/style.css")
            } else {
                styleSheet.setAttribute("href", "")
            }
        }

        multiBtn.onclick = function () {
            multiplier *= 10
            if (multiplier >= toString(parseInt(clicks)).length) {
                multiplier = 1
            }
            multiBtn.innerHTML = "Buy " + multiplier + "x"
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
        autoclicksLabel.innerHTML = formatN(clicksPerSecond) + " cps " + "(" + formatN(clicksPerSecond * clickmulti) + ") cps"
        clickmultiLabel.innerHTML = formatN(clickmulti) + "x Click Multi"
    }

    function update() {
        updateButtons()
        updateLabels()
    }

    const start = Date.now()

    function gameLoop() {
        clicks += (clicksPerSecond / 10) * clickmulti

        update()
        setTimeout(gameLoop, 100)
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
        update()
        window.addEventListener('beforeunload', (event) => {
            setCookie("c", clicks, 365)
            setCookie("cs", clicksPerSecond, 365)
            setCookie("cm", clickmulti, 365)
        });

        let lastTabbedInTime
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                lastTabbedInTime = Date.now()
            } else {
                clicks += ((Date.now() - lastTabbedInTime) / 1000) * clicksPerSecond
            }
        }, false);
        gameLoop()
    }
    // Code \\
    setup()
})()