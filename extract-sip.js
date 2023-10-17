// S P
var [head, ...list_of_sips] = document.querySelectorAll("#app > div:nth-child(2) > div.container.body-container.main-body-container > div > div > div.mf-table__container--desktop > div > ul > li");

// .forEach( (n,i) => console.log(n.innerText.replace(/\n/g, "=")))


var _data = "\n\nFund=Type=Category=Sub Category=Frequency=Amount=Status\n" + list_of_sips.map( (n,i) => {
const name = n.querySelector('.fund-name').innerText;
const meta = n.querySelector('.fund-metasubtext__container');
const type = meta.childNodes[0].textContent;
const category = meta.childNodes[2].textContent;
const subCategory = meta.childNodes[4].textContent;

const details = n.querySelector('.main-container__overview');
const frequency = details.childNodes[3].textContent;
const sipAmount = details.childNodes[4].querySelector('.text-16').innerText.replace(",", "");
const status = details.childNodes[1].textContent;
const data = [name, type, category, subCategory, frequency, sipAmount, status];
return data.join("=");
}).join("\n");
console.log(_data + "\n\n");
