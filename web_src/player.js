
import { onMessage, sendHost, } from './tools/util.js';

export const player = {
  getID,
  getName,
  getPhoto,
  getDataAsync,
  setDataAsync,
  getStatsAsync,
  setStatsAsync,
  incrementStatsAsync,
  flushDataAsync,
  getConnectedPlayersAsync,
  getSignedPlayerInfoAsync,
  canSubscribeBotAsync,
  subscribeBotAsync,

  getExtraData,
  loginAsync,
  logoutAsync,
};
export default {
  init,
  player,
};

let g_id = 0;
let g_name = "";
let g_photo = null;
let g_extraData = null;

export function init(done) {
  onMessage("player",_onPlayer);
  sendHost("player",null,() => {
    done();
  });
}

function _onPlayer(player) {
  if (player) {
    g_id = player.id;
    g_name = player.name;
    g_photo = player.photo;
    g_extraData = player.extraData;
  } else {
    g_id = 0;
    g_name = "";
    g_photo = null;
    g_extraData = null;
  }
}

function getID() {
  return g_id;
}
function getName() {
  return g_name;
}
function getPhoto() {
  return g_photo;
}
function getExtraData() {
  return g_extraData;
}
function getDataAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}
function setDataAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}
function getStatsAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}
function setStatsAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}
function incrementStatsAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}
function flushDataAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}
function getConnectedPlayersAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}
function getSignedPlayerInfoAsync() {
  return Promise.resolve({
    getSignature: () => g_extraData.signature,
    getPlayerID: getID,
    getAppID: () => g_extraData.facebook_app_id,
    getAccessToken: () => g_extraData.access_token,
  });
}
function canSubscribeBotAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}
function subscribeBotAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}

function loginAsync(opts) {
  return new Promise((resolve,reject) => {
    sendHost("login",opts || null,(err,player) => {
      if (err) {
        reject({ code: err });
      } else {
        _onPlayer(player);
        resolve(player);
      }
    });
  });
}

function logoutAsync(opts) {
  g_id = 0;
  g_name = "";
  g_photo = null;
  g_extraData = null;
  return new Promise((resolve,reject) => {
    sendHost("logout",opts || null,(err,result) => {
      if (err) {
        reject({ code: err });
      } else {
        resolve(result);
      }
    });
  });
}
