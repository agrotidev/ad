import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AdmobService {

  //Interstitial Ad's Configurations
  interstitialConfig: AdMobFreeInterstitialConfig = {
    // add your config here
    // for the sake of this example we will just use the test config
    isTesting: true,
    autoShow: false,
    //id: "ca-app-pub-39402XXXXXXXX2544/6300978111"
  };

  //Reward Video Ad's Configurations
  RewardVideoConfig: AdMobFreeRewardVideoConfig = {
    isTesting: true, // Remove in production
    autoShow: false//,
    //id: "ca-app-pub-3940XXXXXXX42544/6300978111"
  };

  constructor(private admob: AdMobFree, private platform: Platform) {
    this.platform.ready().then(() => {

      // Load ad configuration
      this.admob.interstitial.config(this.interstitialConfig);
      //Prepare Ad to Show
      this.admob.interstitial.prepare()
        .then(() => {
          // alert(1);
        }).catch(e => alert(e));


      // Load ad configuration
      this.admob.rewardVideo.config(this.RewardVideoConfig);
      //Prepare Ad to Show
      this.admob.rewardVideo.prepare()
        .then(() => {
          // alert(2);
        }).catch(e => alert(e));

    });

    //Handle interstitial's close event to Prepare Ad again
    this.admob.on('admob.interstitial.events.CLOSE').subscribe(() => {
      this.admob.interstitial.prepare()
        .then(() => {
          alert("Interstitial CLOSE");
        }).catch(e => alert(e));
    });
    //Handle Reward's close event to Prepare Ad again
    this.admob.on('admob.rewardvideo.events.CLOSE').subscribe(() => {
      this.admob.rewardVideo.prepare()
        .then(() => {
          alert("Reward Video CLOSE");
        }).catch(e => alert(e));
    });
   }

   BannerAd() {
    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: true, // Remove in production
      autoShow: true//,
      //id: "ca-app-pub-39402XXXXXXX44/6300978111"
    };
    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {
      // success
    }).catch(e => alert(e));
  }

  InterstitialAd() {
    //Check if Ad is loaded
    this.admob.interstitial.isReady().then(() => {
      //Will show prepared Ad
      this.admob.interstitial.show().then(() => {
      })
        .catch(e => alert("show " + e));
    })
      .catch(e => alert("isReady " + e));
  }

  RewardVideoAd() {
    //Check if Ad is loaded
    this.admob.rewardVideo.isReady().then(() => {
      //Will show prepared Ad
      this.admob.rewardVideo.show().then(() => {
      })
        .catch(e => alert("show " + e));
    })
      .catch(e => alert("isReady " + e));
  }



}
