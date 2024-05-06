module.exports = (data, card) => {
  let output = card.replace(/{%PRODUCT_IMAGE%}/g, data.image);
  output = output.replace(/{%PRODUCT_NAME%}/g, data.productName);
  output = output.replace(/{%PRODUCT_QUANTITY%}/g, data.quantity);
  output = output.replace(/{%PRODUCT_PRICE%}/g, data.price);
  output = output.replace(/{%PRODUCT_ID%}/g, data.id);
  output = output.replace(/{%FROM%}/g, data.from);
  output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
  output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, data.description);
  if (!data.organic) output = output.replace(/{%ORGANIC%}/g, 'not-organic');
  return output;
};

// module.exports = replaceTemplate;
