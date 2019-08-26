
import { onMessage, sendHost, } from './tools/util.js';
import Player from './player';

export default {
  init,
  getLeaderboardAsync,
};

const g_leaderboardMap = {};

export function init(done) {
  onMessage("leaderboard_list",_onList);

  sendHost("leaderboard_list",null,() => {
    done();
  });
}
export function getLeaderboardAsync(name) {
  const leaderboard = g_leaderboardMap[name];
  if (leaderboard) {
    return Promise.resolve(leaderboard);
  } else {
    return Promise.reject({ code: "LEADERBOARD_NOT_FOUND", });
  }
}

function _onList(list) {
  list.forEach(name => {
    g_leaderboardMap[name] = new Leaderboard(name);
  });
}

class Leaderboard {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  getContextID() {
    return null;
  }
  getEntryCountAsync() {
    return new Promise((resolve,reject) => {
      const extra = { name: this.name };
      sendHost("leaderboard_entry_count",extra,(err,count) => {
        if (err) {
          reject({ code: err });
        } else {
          resolve(count);
        }
      });
    });
  }
  setScoreAsync(score,extraData) {
    return new Promise((resolve,reject) => {
      const extra = { name: this.name, score, extraData };
      sendHost("leaderboard_set_score",extra,(err,result) => {
        if (err) {
          reject({ code: err });
        } else {
          const { timestamp, rank } = result;
          const player = Player.player;
          const entry = new LeaderboardEntry(score,timestamp,rank,extraData,player);
          resolve(entry);
        }
      });
    });
  }
  getPlayerEntryAsync() {
    return new Promise((resolve,reject) => {
      const extra = { name: this.name, };
      sendHost("leaderboard_player_entry",extra,(err,result) => {
        if (err) {
          reject({ code: err });
        } else if (!result) {
          resolve(null);
        } else {
          const { rank, score, timestamp, extraData } = result;
          const player = Player.player;
          const entry = new LeaderboardEntry(score,timestamp,rank,extraData,player);
          resolve(entry);
        }
      });
    });
  }
  getEntriesAsync(count,offset) {
    return new Promise((resolve,reject) => {
      const extra = { name: this.name, count, offset };
      sendHost("leaderboard_entries",extra,(err,results) => {
        if (err) {
          reject({ code: err });
        } else {
          const entry_list = results.map(result => {
            const { score, timestamp, rank, extraData, id, name, photo } = result;
            const player = new LeaderboardPlayer(id,name,photo);
            const entry = new LeaderboardEntry(score,timestamp,rank,extraData,player);
            return entry;
          });
         resolve(entry_list);
        }
      });
    });
  }
  getConnectedPlayerEntriesAsync() {
    return Promise.resolve([]);
  }
}

class LeaderboardEntry {
  constructor(score,timestamp,rank,extra_data,player) {
    this.score = score;
    this.timestamp = timestamp;
    this.rank = rank;
    this.extra_data = extra_data;
    this.player = player;
  }
  getScore() {
    return this.score;
  }
  getFormattedScore() {
    return this.score;
  }
  getTimestamp() {
    return this.timestamp;
  }
  getRank() {
    return this.rank;
  }
  getExtraData() {
    return this.extra_data
  }
  getPlayer() {
    return this.player;
  }
}

class LeaderboardPlayer {
  constructor(id,name,photo) {
    this.id = id;
    this.name = name;
    this.photo = photo;
  }
  getID() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getPhoto() {
    return this.photo;
  }
}
