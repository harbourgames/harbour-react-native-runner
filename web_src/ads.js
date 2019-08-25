
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
  loadAsync() {
    return new Promise((resolve,reject) => {
      const extra = { placement_id: this.placement_id, type: this.type };
      sendHost("ad_load",extra,err => {
        if (err) {
          reject({ code: err });
        } else {
          resolve();
        }
      });
    });
  }
  showAsync() {
    return new Promise((resolve,reject) => {
      const extra = { placement_id: this.placement_id, type: this.type };
      sendHost("ad_show",extra,err => {
        if (err) {
          reject({ code: err });
        } else {
          resolve();
        }
      });
    });
  }
}
