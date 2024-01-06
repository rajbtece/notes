let symbol = window.location.pathname.split('/').slice(-1).pop();
let url = '';
fetch(`/historical-nav/${symbol}.json`).then(r =>r.json())
.then(x => fetch(`http://localhost:8080/zerodha/historical-nav?symbol=${symbol}`, 
{'method': 'POST', 'headers': {"Content-Type": "application/json"}, body: JSON.stringify(x)}).then(m => console.log(m)));
