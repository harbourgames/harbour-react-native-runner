
import { loadScript } from './tools/util.js';

export default {
  init,
}

export const payments = {
  setConfig,
  onReady,
  getCatalogAsync,
  purchaseAsync,
  getPurchasesAsync,
  consumePurchaseAsync,
};

function init(done) {
  done && done();
}

function setConfig(params) {
}

function onReady(callback) {
  callback && callback();
}

function getCatalogAsync() {
  return Promise.resolve([]);
}

function purchaseAsync(params) {
  const { productID, description, amountUsd } = params;

  return new Promise((resolve,reject) => {
    reject({ code: 'UNSUPPORTED_OPERATION' });
  });
}

function getPurchasesAsync() {
  return Promise.resolve([]);
}
function consumePurchaseAsync() {
  return Promise.resolve();
}
