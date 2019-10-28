
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
};
export default {
  init,
  player,
};

let g_id = 0;
let g_name = "";
let g_photo = null;

export function init(done) {
  onMessage("player",_onPlayer);
  sendHost("player",null,() => {
    done();
  });
}

function _onPlayer(player) {
  g_id = player.id;
  g_name = player.name;
  g_photo = player.photo;
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
    getSignature: () => "",
    getPlayerID: getID,
  });
}
function canSubscribeBotAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}
function subscribeBotAsync() {
  return Promise.reject({ code: "CLIENT_UNSUPPORTED_OPERATION" });
}
