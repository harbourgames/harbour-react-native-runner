
import { asyncSeries, } from './tools/util.js';
import UI from './ui';

import Leaderboard from './leaderboard';
import Player from './player';
import Payments from './payments';

export function initializeAsync(params) {
  return new Promise(resolve => {
    UI.addLoader(params);

    asyncSeries([
      Player.init,
      Leaderboard.init,
      Payments.init,
    ],err => {
      resolve();
    })
  });
}
export function setLoadingProgress(progress) {
  return new Promise(resolve => {
    UI.setLoaderText(`${progress.toFixed()}% Loaded`);
    resolve();
  });
}
export function startGameAsync() {
  return new Promise(resolve => {
    UI.removeLoader();
    resolve();
  });
}
