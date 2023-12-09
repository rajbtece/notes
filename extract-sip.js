// S P
var [head, ...list_of_sips] = document.querySelectorAll("#app > div:nth-child(2) > div.container.body-container.main-body-container > div > div > div.mf-table__container--desktop > div > ul > li");

let extractRow = async (n, delay = 1000) => {
    console.log("Fund Name: " + n.querySelector('.fund-name').innerText + "; " + Date.now());
    if (n.querySelector('.fund-row__container--overview') !== null) {
        n.querySelector(".fund-name").click();
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            let name = "";
            let type = "";
            let isbn = "";
            let category = "";
            let subCategory = "";
            let frequency = "";
            let sipAmount = "";
            try {
                name = n.querySelector('.fund-name').innerText;
                let header = n.querySelector('.fund-header .align-items-center').childNodes;
                type = header[1].innerText;
                category = header[3].innerText;
                subCategory = header[5].innerText;
                isbn = header[0].querySelector('a').href.split('/')[5];
                frequency = n.querySelectorAll('.main-container__detail--body > div > div')[2].childNodes[1].innerText;
                sipAmount = n.querySelector('div.main-container__detail--header > div > div.three.columns > div > div').childNodes[1].innerText.replace(/,/g, '');;
            } catch (err) {
                console.log(err);
            }
            let data = [name, isbn, type, category, subCategory, frequency, sipAmount];
            resolve({ 'data': data.join("="), 'transaction': [] });
        }, delay);
    });
}

let process = async (sips = []) => {
    let results = [];
    for (let i = 0; i < sips.length; i++) {
        const result = await extractRow(sips[i]);
        results.push(result.data);
    }
    let _data = "\n\nFund=ISIN=Type=Category=Sub Category=Frequency=Amount\n" + results.sort().join("\n");
    console.log(_data);
}

process(list_of_sips);

//process([list_of_sips[0], list_of_sips[1]]);
