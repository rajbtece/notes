var [head, ...list_of_holdings] = document.querySelector("#app > div:nth-child(2) > div.container.body-container.main-body-container > div > div > div > div.mf-table__container--desktop > div > ul").childNodes;

let extractRow = async (node, trans, delay = 1000) => {
    if (node.querySelector('.dividend-type') === null) {
        node.querySelector(".fund-name").click();
    }
    console.log("Fund Name: " + node.querySelector('.fund-name').innerText + "; " + Date.now());
    return new Promise((resolve) => {
        setTimeout(() => {
            let name = "";
            let dividentType = "";
            let scheme = "";
            let subType = "";
            let invested = "";
            let units = "";
            let avgNav = "";
            let currentNav = "";
            let xirr = "";
            let profit = "";
            let profitPer = 0;
            let symbol = "";
            try {
                name = node.querySelector('.fund-name').innerText;
                dividentType = node.querySelector('.dividend-type').innerText;
                scheme = node.querySelector('.scheme').innerText;
                subType = node.querySelector('.sub-scheme').innerText;

                var bodyRows = node.querySelectorAll('.main-container__detail--body > .row > div');
                invested = bodyRows[0].childNodes[1].innerText.replace(/,/g, '')
                currentValue = bodyRows[1].childNodes[1].innerText.replace(/,/g, '');
                units = bodyRows[2].childNodes[1].innerText.replace(/,/g, '');
                avgNav = bodyRows[3].childNodes[1].innerText.replace(/,/g, '');
                currentNav = bodyRows[4].childNodes[1].innerText.replace(/,/g, '');
                xirr = bodyRows[5].querySelector('.text-regular').innerText.replace(/,/g, '');
                profit = node.querySelector('.quantity-container').childNodes[1].innerText.replace(/,/g, '');
                profitPer = node.querySelector('.quantity-container').childNodes[3].innerText;
                symbol = node.querySelector('.fund-name > a').href.split('/')[5];
            } catch (err) {
                console.log("Error: " + err);
            }
            var data = [symbol, name, dividentType, scheme, subType, invested, currentValue, units, avgNav, currentNav, xirr, profit, profitPer];
            if (trans === true) {
                transactions(node, symbol, name, dividentType, currentNav, (err, results) => {
                    resolve({ 'data': data.join("="), 'transaction': results });
                })
            } else {
                resolve({ 'data': data.join("="), 'transaction': [] });
            }
        }, delay);
    });
}

let transactions = async (node, symbol, name, type, currentNav, cb) => {
    node.querySelector('.main-container__detail--footer > div > div:nth-child(2) > div').click();
    setTimeout(() => {
        const data = [];
        /**
         * div.modal-body > div > div > div > table > tbody > tr
         */
        let trows = document.querySelectorAll('div.modal-body > div > div > div > table > tbody > tr')
        let r = /^(\d+)\w+\s(\w+)\s(\d{4})/
        trows.forEach((t, i) => {
            let date = '', days = '', amount = '', nav = '', units = '', currentPrice = '', profit = '', profitPer = '';
            try {
                date = t.childNodes[1].innerText;
                let m = date.match(r);
                date = m[1] + '/' + m[2] + '/' + m[3];
                days = t.childNodes[2].innerText.replace(/,/g, '');
                amount = t.childNodes[3].innerText.replace(/,/g, '');
                nav = t.childNodes[4].innerText.replace(/,/g, '');
                units = t.childNodes[5].innerText.replace(/,/g, '');
                currentPrice = (units * currentNav).toFixed(2);
                profit = (currentPrice - amount).toFixed(2);
                profitPer = (1-(amount/currentPrice)).toFixed(2);
            } catch (err) {
            }
            let value = [symbol, name, type, date, days, amount, units, nav, currentNav, currentPrice, profit, profitPer].join("=");
            data.push(value);
        });
        document.querySelector('.feather-x').click();
        cb(undefined, data);
    }, 1000);
}


async function processArray(holdings = [], trans = false) {
    let results = [];
    let transactions = [];
    for (let i = 0; i < holdings.length; i++) {
        const result = await extractRow(holdings[i], trans);
        results.push(result.data);
        transactions = transactions.concat(result.transaction);
    }
    var _data = "\n\nSymbol=Fund=Type=Scheme=SubType=Invested=Current=Unit=Avg Nav=Current Nav=XIRR=Profit=Percentage\n"
        + results.sort().join("\n");
    console.log(_data);
    if (trans === true) {
        console.log("\n====================== transactions ======================\n");
        console.log("\n\nSymbol=Fund=Type=Date=Days=Amount=Units=NAV=Current NAV=Current Price=Profit=Percentage\n" + transactions.join("\n"));
    }
}

processArray(list_of_holdings, false);
