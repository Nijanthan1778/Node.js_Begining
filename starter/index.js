const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

const productOverview = fs.readFileSync('./templates/overview.html', 'utf-8');
const card = fs.readFileSync('./templates/card.html', 'utf-8');
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const productTemplate = fs.readFileSync('./templates/product.html', 'utf-8');

// const replaceTemplate = (data, card) => {
//   let output = card.replace(/{%PRODUCT_IMAGE%}/g, data.image);
//   output = output.replace(/{%PRODUCT_NAME%}/g, data.productName);
//   output = output.replace(/{%PRODUCT_QUANTITY%}/g, data.quantity);
//   output = output.replace(/{%PRODUCT_PRICE%}/g, data.price);
//   output = output.replace(/{%PRODUCT_ID%}/g, data.id);
//   output = output.replace(/{%FROM%}/g, data.from);
//   output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
//   output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, data.description);
//   if (!data.organic) output = output.replace(/{%ORGANIC%}/g, 'not-organic');
//   return output;
// };

// console.log(fs);

//////////////////Blocking and synchronous//////////////////////////
// const input = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(input);

// const output = 'This is output';
// fs.writeFileSync('./txt/output.txt', output);

/////////////////////Non-Blocking and Asynchronous//////////////////

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) console.log('error', err);
//   // console.log('data', data1);
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     // console.log(data1, data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       // console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err, data) => {
//         // err && console.log('error', err);
//         // data && console.log('data', data);
//       });
//     });
//   });
// });

///////////////////////////SERVER///////////////////////////////////
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    const cards = JSON.parse(data)
      .map((data) => replaceTemplate(data, card))
      .join('');

    const output = productOverview.replace('{%PRODUCT_OVERVIEW%}', cards);
    res.end(output);
  }

  if (pathname === '/product') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    const product = JSON.parse(data)[query.id];
    const output = replaceTemplate(product, productTemplate);
    res.end(output);
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening at port 8000');
});
