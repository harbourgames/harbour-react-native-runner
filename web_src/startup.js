
import { asyncSeries, hasReactNative } from './tools/util.js';
import UI from './ui';

import Leaderboard from './leaderboard';
import Player from './player';
import Payments from './payments';

export function initializeAsync(params) {
  const force_load = params && params.force_load;

  return new Promise((resolve,reject) => {
    if (!hasReactNative() && !force_load) {
      reject({ code: "CLIENT_UNSUPPORTED_OPERATION", });
    } else {
      UI.addLoader(params);


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
  UI.setLoaderText(`${progress.toFixed()}% Loaded`);
}
export function startGameAsync() {
  return new Promise(resolve => {
    UI.removeLoader();
    resolve();
  });
}
