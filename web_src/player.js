
import UI from "./ui";
import { onMessage, sendHost, log } from './tools/util.js';

export const player = {
  getID,
  getName,
  getPhoto,
  getEmail,
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
};
export default {
  init,
  player,
};

let g_uid = 0;
let g_name = "";
let g_email = "";
let g_photoUrl = null;
let g_signedRequest = "";

export function init(done) {
  onMessage("player",_onPlayer);
  sendHost("player",null,() => {
    done();
  });
}

function _onPlayer(player) {
  g_uid = player.uid;
  g_name = player.name;
  g_photoUrl = player.photo_url;
}

function getID() {
  return g_uid;
}
function getName() {
  return g_name;
}
function getPhoto() {
  return g_photoUrl;
}
function getEmail() {
  return g_email;
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
    getSignature: () => g_signedRequest,
    getPlayerID: getID,
  });
}
function canSubscribeBotAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}
function subscribeBotAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}
function _getUrl(obj) {
  return obj && obj.data && obj.data.url;
}
