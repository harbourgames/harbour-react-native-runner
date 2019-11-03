
import { asyncSeries, hasReactNative, sendHost } from './tools/util.js';

import Leaderboard from './leaderboard';
import Player from './player';
import Payments from './payments';

export function initializeAsync(params) {
  const force_load = params && params.force_load;
  sendHost('init',params);

  return new Promise((resolve,reject) => {
    if (!hasReactNative() && !force_load) {
      reject({ code: "CLIENT_UNSUPPORTED_OPERATION", });
    } else {
      asyncSeries([
        Player.init,
        Leaderboard.init,
        Payments.init,
      ],() => {
        resolve();
      })
    }
  });
}
export function setLoadingProgress(progress) {
  sendHost('loading_progress',progress);
}
export function startGameAsync() {
  return new Promise(resolve => {
    sendHost('start_game');
    resolve();
  });
}
