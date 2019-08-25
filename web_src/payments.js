
export default {
  init,
  payments,
};
export const payments = {
  onReady,
  getCatalogAsync,
  purchaseAsync,
  getPurchasesAsync,
  consumePurchaseAsync,
};

function init(done) {
  done && done();
}
function onReady(callback) {
  callback && callback();
}
function getCatalogAsync() {
  return Promise.resolve([]);
}
function purchaseAsync() {
  return Promise.reject({ code: 'UNSUPPORTED_OPERATION' });
}
function getPurchasesAsync() {
  return Promise.resolve([]);
}
function consumePurchaseAsync() {
  return Promise.resolve();
}
