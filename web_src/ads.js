
import { sendHost } from './tools/util.js';

export function getInterstitialAdAsync(placement_id) {
  const ad_instance = new AdInstance(placement_id,'interstitial');
  return Promise.resolve(ad_instance);
}
export function getRewardedVideoAsync(placement_id) {
  const ad_instance = new AdInstance(placement_id,'rewarded');
  return Promise.resolve(ad_instance);
}

class AdInstance {
  constructor(placement_id,type) {
    this.placement_id = placement_id;
    this.type = type;
  }

  getPlacementID() {
    return this.placement_id;
  }
  isAvailableAsync() {
    return new Promise((resolve,reject) => {
      const opts = { placement_id: this.placement_id, type: this.type };
      sendHost("ad_available",opts,err => {
        if (err) {
          reject({ code: err });
        } else {
          resolve();
        }
      });
    });
  }
  loadAsync() {
    return new Promise((resolve,reject) => {
      const opts = { placement_id: this.placement_id, type: this.type };
      sendHost("ad_load",opts,err => {
        if (err) {
          reject({ code: err });
        } else {
          resolve();
        }
      });
    });
  }
  showAsync(extra) {
    return new Promise((resolve,reject) => {
      const opts = { placement_id: this.placement_id, type: this.type, extra };
      sendHost("ad_show",opts,err => {
        if (err) {
          reject({ code: err });
        } else {
          resolve();
        }
      });
    });
  }
}
