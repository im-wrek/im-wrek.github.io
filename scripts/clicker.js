(() => {
    // Game Variables \\
    let clicks = 0
    let clicksPerSecond = 0
    let clickmulti = 1
    let multiplier = 1
    let useNotation = false

    let titleId = 1

    const Clickers = [
        ["Coal", 1, 10],
        ["Nickel", 5, 50],
        ["Copper", 10, 100],
        ["Bronze", 50, 500],
        ["Silver", 100, 1000],
        ["Gold", 500, 5000],
        ["Platinum", 1000, 10000],
        ["Diamond", 5000, 50000],
        ["Sapphire", 10000, 100000],
        ["Diamond", 50000, 500000],
        ["Ruby", 100000, 1000000],
        ["Rose Gold", 500000, 5000000],
        ["Blood Diamond", 1000000, 10000000],
        ["Emerald", 5000000, 50000000],
        ["Alexandrite", 10000000, 100000000],
        ["Tungsten", 50000000, 500000000],
        ["Cobalt", 100000000, 1000000000],
    ]

    // Format: Name, Color, FontSize?
    const Titles = [
        ["Noob", "grey"],
        ["Getting there", "grey"],
        ["Average", "lightgrey"],
        ["Cool", "lightgrey"],
        ["Awesome Sauce", "lightgrey"],
        ["Intermediate", "snow"],
        ["Professional", "lightblue"],
        ["Executive", "silver"],
        ["CEO", "yellowgreen", "32px"],
        ["Big", "blue", "48px"],
        ["???", "grey", "48px"],
        ["🍎 Apple", "red", "48px"],
    ]

    // Options: DynamicPricing: bool?, Rebirths: int?, DynamicPriceMulti: int (default 10), DynamicPriceCriteria: string? \\
    // Format: ["Name", [Options], Cost, "Tooltip"] \\
    const Upgrades = [
        ["Rebirth", { Rebirths: 1, DynamicPricing: true, DynamicPriceCriteria: "clicks", DynamicPriceMulti: 1000 }, 10000, "Resets Clicks and Auto Clicks (you keep title)\n+1 Click Multi"],
        ["Upgrade Title", { GiveTitle: true, DynamicPricing: true, DynamicPriceCriteria: "title" }, 100000, "Upgrades your title"],
    ]

    // Format: ["Name", [Requirements], "Tooltip"]
    const Achievements = [
        ["Beginner", { Clicks: 1000 }, "Obtain 1,000 clicks"],
        ["Intermediate", { Clicks: 10000 }, "Obtain 10,000 clicks"],
        ["Writer", { TitleId: 2 }, "Obtain your first title"],
    ]

    var GivenAchievements = []

    // Elements \\
    const achievementsDiv = document.body.getElementsByClassName("achievements")[0]
    const clickmultiLabel = document.getElementById("clickMulti")
    const clickBtn = document.getElementById("click")
    const styleBtn = document.getElementById("style")
    const titleLabel = document.getElementById("ctitle")
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
        x = Math.trunc(x)
        if (useNotation === true) {
            return x.toExponential()
        } else {
            if (x >= 1e12 - 1) {
                return abbrev(x)
            } else {
                return x.toLocaleString()
            }
        }
    }

    function getDigits(x) {
        if (!(typeof (x) === "number")) { return 0; }
        return (Math.trunc(x).toString().length)
    }

    function updateButtons() {
        Clickers.forEach(item => {
            let name = item[0]
            let autoclicks = item[1] * multiplier
            let cost = item[2] * multiplier
            let element = item[item.length - 1]

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
            let element = item[item.length - 1]

            if (data.DynamicPricing === true) {
                cost *= (data.DynamicPriceMulti || 10) * (data.DynamicPriceCriteria === "clicks" && clickmulti || titleId)
            }

            element.innerHTML = "Buy " + name + " (" + formatN(cost) + " clicks)"

            if (clicks >= cost) {
                element.removeAttribute("disabled")
            } else {
                element.setAttribute("disabled", true)
            }
        })

        if (getDigits(multiplier) > (getDigits(clicks) + 1)) {
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
                if (clicks >= (cost * multiplier)) {
                    clicks -= (cost * multiplier)
                    clicksPerSecond += (autoclicks * multiplier)
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
                var newCost = cost
                if (data.DynamicPricing === true) {
                    newCost *= (data.DynamicPriceMulti || 10) * (data.DynamicPriceCriteria === "clicks" && clickmulti || titleId)
                }

                let rebirths = data.Rebirths
                let title = data.GiveTitle
                if (clicks >= newCost) {
                    clicks -= newCost

                    if (title) {
                        titleId += 1
                    }

                    if (rebirths) {
                        clicksPerSecond = 0
                        clickmulti += rebirths
                        clicks = 0
                    }
                }
            }
            item[item.length + 1] = element
        })

        let styleSheet = document.getElementById("stylesheet")
        styleBtn.onclick = function () {
            let href = styleSheet.getAttribute("href")
            if (href == "") {
                styleSheet.setAttribute("href", "https://im-wrek.github.io/styles/style.css")
            } else {
                styleSheet.setAttribute("href", "")
            }
        }

        multiBtn.onclick = function () {
            multiplier *= 10
            if (getDigits(multiplier) > (getDigits(clicks) + 1)) {
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
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/experiences/clicker";
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
        var title = Titles[titleId - 1]
        if (title) {
            titleLabel.innerHTML = title[0]
            titleLabel.style = "color: " + title[1]
        }
        clickLabel.innerHTML = "Clicks: " + formatN(clicks)
        autoclicksLabel.innerHTML = formatN(clicksPerSecond * clickmulti) + " cps " + "(" + formatN(clicksPerSecond) + ") cps"
        clickmultiLabel.innerHTML = formatN(clickmulti) + "x Click Multi"
    }

    function update() {
        updateButtons()
        updateLabels()
    }

    let amtOfAchievements = Achievements.length
    function gameLoop() {
        clicks += ((clicksPerSecond / 10) * clickmulti)

        for (let i = 0; i < amtOfAchievements; i++) {
            if (GivenAchievements.at(i) != undefined) {
                continue;
            }

            let achievement = Achievements[i]
            let name = achievement[0]
            let requirements = achievement[1]
            let desc = achievement[2]

            if (requirements.Clicks != undefined && clicks >= requirements.Clicks || requirements.TitleId != undefined && titleId >= requirements.TitleId) {
                achievementsDiv.insertAdjacentHTML("afterbegin", `<div class="achievement"><h1>${name}</h1><p>${desc}</p></div>`)
                GivenAchievements[i] = i
            }
        }

        update()
        setTimeout(gameLoop, 100)
    }

    function setup() {
        setupButtons()
        clicks = (parseFloat((getCookie("c")) || 0))
        clicksPerSecond = (parseFloat((getCookie("cs")) || 0))
        clickmulti = (parseFloat((getCookie("cm")) || 1))
        titleId = (parseFloat((getCookie("ti")) || 1))
        useNotation = ((getCookie("nt") || "false") === "true")

        clickBtn.onclick = function () {
            clicks += clickmulti
            update()
        }

        var isFocused = true
        var lastFocused = 0

        document.addEventListener("visibilitychange", (doc, ev) => {
            isFocused = !isFocused
            if (isFocused === true) {
                let c = (((Date.now() - lastFocused) / 1000 * clicksPerSecond) * clickmulti)

                clicks += c
            } else {
                lastFocused = Date.now()
            }
        }, false) // Eliminates need for a worker \\

        document.addEventListener("click", function (ev) {
            if (ev.target.classList.contains("achievement")) {
                ev.target.classList.add("bye")
                ev.target.setAttribute("disabled", true)
                setInterval(() => {
                    ev.target.remove()
                }, 400);
            }
        })

        window.addEventListener('beforeunload', () => {
            setCookie("c", clicks, 365)
            setCookie("cs", clicksPerSecond, 365)
            setCookie("cm", clickmulti, 365)
            setCookie("ti", titleId, 365)
            setCookie("nt", useNotation, 365)
        });

        gameLoop()
    }
    // Code \\
    setup()
})()