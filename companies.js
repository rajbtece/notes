var [head, ...body] = document.querySelectorAll('#app > div:nth-child(2) > div > div > div > div:nth-child(10) > div.holding-allocation-table > table > tr');
console.log("\n\n" + 
    body.map(_ => [_.querySelector('td:nth-child(1)').innerText.replace(/\./, '').toLowerCase().replace(/ltd|limited/, '').trim()
    , _.querySelector('td:nth-child(2)').innerText].join("=") )
        .sort().join("\n")
        + "\n\n");
