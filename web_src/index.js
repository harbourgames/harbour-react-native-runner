
import { initializeAsync, setLoadingProgress, startGameAsync } from './startup.js';
import { getInterstitialAdAsync, getRewardedVideoAsync } from './ads.js';
import { getLeaderboardAsync } from './leaderboard.js';
import { payments } from "./payments";
import { player } from "./player"
import { context } from "./context";
import { log, emitMessage, sendHost } from './tools/util';

const HarbourSDK = {
  player,
  context,
  payments,
  getLocale,
  initializeAsync,
  setLoadingProgress,
  startGameAsync,
  quit,
  updateAsync,
  getEntryPointData,
  getEntryPointAsync,
  setSessionData,
  getPlatform,
  getSDKVersion,
  getSupportedAPIs,
  shareAsync,
  switchGameAsync,
  logEvent,
  onPause,
  getInterstitialAdAsync,
  getRewardedVideoAsync,
  getLeaderboardAsync,

  emitMessage,
  sendHost,
  getHarbourPlatform,
};

window.HarbourSDK = HarbourSDK;
window.FBInstant = window.FBInstant || HarbourSDK;

function getLocale() {
  let locale = "en-US";
  if (window.navigator) {
    if (window.navigator.language) {
      locale = window.navigator.language;
    } else if (window.navigator.languages && window.navigator.languages[0]) {
      locale = window.navigator.languages[0];
    }
  }
  return locale;
}
function quit() {
  window.close();
}
function updateAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION", });
}
function getEntryPointData() {
  return {};
}
function getEntryPointAsync() {
  return Promise.resolve(null);
}
function setSessionData() {
}
function getPlatform() {
  return "WEB";
}
function getSDKVersion() {
  return "6.2";
}
function getHarbourPlatform() {
  return "HARBOUR_RUNNER";
}
function getSupportedAPIs() {
  const api_list = [];
  for (const prop in HarbourSDK) {
    api_list.push(prop);
  }
  for (const prop in HarbourSDK.player) {
    api_list.push("player." + prop);
  }
  for (const prop in HarbourSDK.context) {
    api_list.push("context." + prop);
  }
  for (const prop in HarbourSDK.payment) {
    api_list.push("payment." + prop);
  }
  return api_list;
}
function shareAsync() {
  return Promise.reject({ code: "USER_CANCEL", });
}
function switchGameAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION", });
}
function logEvent(eventName,valueToSum,parameters) {
  return log(eventName,{ valueToSum, parameters });
}
function onPause(callback) {
  window.onblur = callback;
}
