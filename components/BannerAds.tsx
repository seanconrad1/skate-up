import React, { useState, useRef } from 'react';
import {View, Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

// IOS
// Follow the banner implementation guide to integrate the SDK. You'll specify ad type, size, and placement when you integrate the code using this ad unit ID:
// ca-app-pub-8768514175206888/4911787300

// Android
// ca-app-pub-8768514175206888/4136093387


const iosAdmobBanner = "ca-app-pub-8768514175206888/4911787300";
const androidAdmobBanner = "ca-app-pub-8768514175206888/4136093387";
const productionID = Platform.OS === 'ios' ? iosAdmobBanner : androidAdmobBanner;

const BannerAds = () => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const bannerRef = useRef(null);

  // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
  // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  })
  return (
    <View style={{ height: isAdLoaded ? 'auto' : 0 }}>
      <BannerAd
        // It is extremely important to use test IDs as you can be banned/restricted by Google AdMob for inappropriately using real ad banners during testing
        unitId={__DEV__ ? TestIds.BANNER : productionID}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true, 
          // You can change this setting depending on whether you want to use the permissions tracking we set up in the initializing
        }}
        onAdLoaded={() => {
          setIsAdLoaded(true);
        }}
      />
    </View >
  );
}

export default BannerAds