import { Component, OnInit } from '@angular/core';
import { AdmobService } from '../services/admob.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private admob: AdmobService) {}

  ngOnInit() {
    this.admob.BannerAd();
  }

  showInterstitial(){
    this.admob.InterstitialAd();
  }
  
  showRewardVideo(){
    this.admob.RewardVideoAd();
  }

}
