(() => {
    // Game Variables \\
    var clicks = 0
    var clicksPerSecond = 0
    var clickmulti = 1
    var multiplier = 1
    var useNotation = false

    const Clickers = [
        ["Bronze", 1, 10],
        ["Silver", 5, 50],
        ["Gold", 100, 1000],
        ["Platinum", 500, 5000],
        ["Diamond", 1000, 10000],
        ["Amethyst", 5000, 50000],
        ["Sapphire", 10000, 100000],
        ["Sterling Silver", 50000, 500000],
        ["Ruby", 100000, 1000000],
        ["Rose Gold", 500000, 5000000],
        ["Blood Diamond", 1000000, 10000000],
        ["Emerald", 5000000, 50000000],
        ["Alexandrite", 10000000, 100000000],
    ]

    const Upgrades = [
        ["Rebirth", { Rebirths: 1, DynamicPricing: true, DynamicPriceMulti: 10 }, 10000, "Resets Clicks and Auto Clicks\n+1 Click Multi"], // Format: ["Name", [Data], #Cost, "Tooltip"] \\
    ]
    // Elements \\
    const clickmultiLabel = document.getElementById("clickMulti")
    const clickers = document.getElementsByClassName("clicker")
    const upgrades = document.getElementsByClassName("upgrade")
    const clickBtn = document.getElementById("click")
    const styleBtn = document.getElementById("style")
    const multiBtn = document.getElementById("multiply")
    const notationBtn = document.getElementById("notation")

    const clickLabel = document.getElementById("clicks")
    const autoclicksLabel = document.getElementById("autoclicks")
    // Functions \\
    function abbrev(value) {
        let newValue = value;
        const suffixes = ["", "K", "M", "B", "T", "Qd", "Qn", "Sx", "Sep", "Oct", "N", "D", "UD", "DD", "TD", "QtD", "QnD", "SxD", "SepD", "OctD", "ND", "V", "UV", "DV", "TV", "QtV", "QnV", "SxV", "SepV", "OctV", "NV", "Tg", "UTg", "DTg", "TTg", "QtTg", "QnTg", "SxTg", "SepTg", "OctTg", "NTg", "QtR", "UQtR", "DQtR", "TQtR", "QtQtR", "QnQtR", "SxQtR", "SepQtR", "OctQtR", "NQtR", "QnR", "UQnR", "DQnR", "TQnR", "QtQnR", "QnQnR", "SxQnR", "SepQnR", "OctQnR", "NQnR", "SxR", "USxR", "DSxR", "TSxR", "QtSxR", "QnSxR", "SxSxR", "SepSxR", "OctSxR", "NSxR", "SepR", "USepR", "DSepR", "TSepR", "QtSepR", "QnSepR", "SxSepR", "SepSepR", "OctSepR", "NSepR", "OctR", "UOctR", "DOctR", "TOctR", "QtOctR", "QnOctR", "SxOctR", "SepOctR", "OctOctR", "NOctR", "NR", "UnR", "DnR", "TnR", "QtnR", "QnnR", "SxnR", "SepnR", "OctnR", "NnR", "C", "CU", "CD", "CT", "CQt", "CQn", "CSx", "CSep", "COct", "CN", "Cd", "CUd", "CDd", "CTd", "CQtd", "CQnd", "CSxd", "CSepd", "COctd", "CNd", "CV", "CUV", "CDV", "CTV", "CQtV", "CQnV", "CSxV", "CSepV", "COctV", "CNV", "CTg", "CUTg", "CDTg", "CDTg", "CQtTg", "CQnTg", "CSxTg", "CSepTg", "COctTg", "CNTg", "CQtR", "CUQtR", "CDQtR", "CTQtR", "CQtQtR", "CQnQtR", "CSxQtR", "CSepQtR", "COctQtR", "CNQtR", "CQnR", "CUQnR", "CDQnR", "CTQnR", "CQtQnR", "CQnQnR", "CSxQnR", "CSepQnR", "COctQnR", "CNQnR", "CSxR", "CUSxR", "CDSxR", "CTSxR", "CQtSxR", "CQnSxR", "CSxSxR", "CSepSxR", "COctSxR", "CNSxR", "CSepR", "CUSepR", "CDSepR", "CTSepR", "CQtSepR", "CQnSepR", "CSxSepR", "CSepSepR", "COctSepR", "CNSepR", "COctR", "CUOctR", "CDOctR", "CTOctR", "CQtOctR", "CQnOctR", "CSxOctR", "CSepOctR", "COctOctR", "CNOctR", "CnR", "CUnR", "CDnR", "CTnR", "CQtnR", "CQnnR", "CSxnR", "CSepnR", "COctnR", "CNnR", "DC", "DCU", "DCD", "DCT", "DCQt", "DCQn", "DCSx", "DCSep", "DCOct", "DCN", "DCd", "DCUd", "DCDd", "DCTd", "DCQtd", "DCQnd", "DCSxd", "DCSepd", "DCOctd", "DCNd", "DCV", "DCUV", "DCDV", "DCTV", "DCQtV", "DCQnV", "DCSxV", "DCSepV", "DCOctV", "DCNV", "DCTg", "DCUTg", "DCDTg", "DCDTg", "DCQtTg", "DCQnTg", "DCSxTg", "DCSepTg", "DCOctTg", "DCNTg", "DCQtR", "DCUQtR", "DCDQtR", "DCTQtR", "DCQtQtR", "DCQnQtR", "DCSxQtR", "DCSepQtR", "DCOctQtR", "DCNQtR", "DCQnR", "DCUQnR", "DCDQnR", "DCTQnR", "DCQtQnR", "DCQnQnR", "DCSxQnR", "DCSepQnR", "DCOctQnR", "DCNQnR", "DCSxR", "DCUSxR", "DCDSxR", "DCTSxR", "DCQtSxR", "DCQnSxR", "DCSxSxR", "DCSepSxR", "DCOctSxR", "DCNSxR", "DCSepR", "DCUSepR", "DCDSepR", "DCTSepR", "DCQtSepR", "DCQnSepR", "DCSxSepR", "DCSepSepR", "DCOctSepR", "DCNSepR", "DCOctR", "DCUOctR", "DCDOctR", "DCTOctR", "DCQtOctR", "DCQnOctR", "DCSxOctR", "DCSepOctR", "DCOctOctR", "DCNOctR", "DCnR", "DCUnR", "DCDnR", "DCTnR", "DCQtnR", "DCQnnR", "DCSxnR", "DCSepnR", "DCOctnR", "DCNnR", "TC"];
        let suffixNum = 0;
        while (newValue >= 1000) {
            newValue /= 1000;
            suffixNum++;
        }

        newValue = newValue.toPrecision(3);

        newValue += suffixes[suffixNum];
        return newValue;
    }

    function formatN(x) {
        if (!(typeof (x) === "number")) { return; }
        if (useNotation === true) {
            return x.toExponential()
        } else {
            if (x.toString().length >= 7) {
                return abbrev(x)
            } else {
                return x.toLocaleString()
            }
        }
    }

    function updateButtons() {
        Clickers.forEach(item => {
            let name = item[0]
            let autoclicks = item[1] * multiplier
            let cost = item[2] * multiplier
            let element = item[item.length-1]

            element.innerHTML = "Buy " + formatN(multiplier) + "x " + name + " clicker" + (multiplier > 1 && "s" || "") + " (" + formatN(cost) + " clicks)"
            element.title = "+ " + formatN(autoclicks) + " cps"
            
            if (clicks >= cost) {
                element.removeAttribute("disabled")
            } else {
                element.setAttribute("disabled", true)
            }
        })
        
        Upgrades.forEach(item => {
            let name = item[0]
            let data = item[1]
            let cost = item[2]
            let tooltip = item[3]
            let element = item[item.length-1]

            if (data.DynamicPricing === true){
                cost *= data.DynamicPriceMulti * clickmulti
            }

            element.innerHTML = "Buy " + name + " (" + formatN(cost) + " clicks)"
            
            if (clicks >= cost) {
                element.removeAttribute("disabled")
            } else {
                element.setAttribute("disabled", true)
            }
        })

        let digits = (clicks).toString().length - 1
        if ((multiplier.toString().length) > (digits)) {
            multiplier = 1
        }
        multiBtn.innerHTML = "Buy " + formatN(multiplier) + "x"
    }

    function setupButtons() {
        let label = document.getElementById("clickers")
        Clickers.reverse()
        Clickers.forEach(item => {
            let name = item[0]
            let autoclicks = item[1]
            let cost = item[2]
            let element = document.createElement("button")

            element.name = name
            element.classList = "clicker"
            element.title = "Gives " + formatN(autoclicks) + " Auto Clicks"
            element.innerHTML = "Buy 1x " + name + " clicker " + "(" + formatN(cost) + " clicks)"
            label.insertAdjacentElement("afterend", element)
            element.insertAdjacentHTML("afterend", "<div class='s5px'></div>")

            element.onclick = function () {
                if (clicks >= cost * multiplier) {
                    clicks -= cost * multiplier
                    clicksPerSecond += autoclicks * multiplier
                    update()
                }
            }

            item[item.length + 1] = element
        })

        label = document.getElementById("upgrades")
        Upgrades.reverse()
        Upgrades.forEach(item => {
            let name = item[0]
            let data = item[1]
            let cost = item[2]
            let tooltip = item[3]
            let element = document.createElement("button")

            element.name = name
            element.classList = "upgrade"
            element.title = tooltip
            element.innerHTML = "Buy " + name + " (" + formatN(cost) + " clicks)"
            label.insertAdjacentElement("afterend", element)
            element.insertAdjacentHTML("afterend", "<div class='s5px'></div>")

            element.onclick = function () {
                let rebirths = data.Rebirths
                if (clicks >= cost) {
                    clicks -= cost
                    if (rebirths) {
                        clicksPerSecond = 0
                        clickmulti += rebirths
                        clicks = 0
                    }
                }
            }
            item[item.length + 1] = element
        })

        let styleSheet = document.getElementById('stylesheet')
        styleBtn.onclick = function () {
            let href = styleSheet.getAttribute("href")
            if (href == "") {
                styleSheet.setAttribute("href", "https://im-wrek.github.io/style.css")
            } else {
                styleSheet.setAttribute("href", "")
            }
        }

        multiBtn.onclick = function () {
            let digits = (clicks).toString().length - 1
            multiplier *= 10
            if ((multiplier.toString().length) > (digits)) {
                multiplier = 1
            }
            multiBtn.innerHTML = "Buy " + formatN(multiplier) + "x"
            update()
        }

        notationBtn.onclick = function () {
            useNotation = !useNotation
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
        clicks += Math.round((clicksPerSecond / 10) * clickmulti)

        update()
        setTimeout(gameLoop, 100)
    }

    function setup() {
        setupButtons()
        clicks = ((getCookie("c")) || 0)
        clicksPerSecond = ((getCookie("cs")) || 0)
        clickmulti = ((getCookie("cm")) || 1)
        clickBtn.onclick = function () {
            clicks += clickmulti
            update()
        }
        update()
        window.addEventListener('beforeunload', () => {
            setCookie("c", Math.round(clicks), 365)
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