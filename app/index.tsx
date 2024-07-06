import {useEffect} from 'react'
import { Image, StyleSheet, Platform } from 'react-native';
import mobileAds from 'react-native-google-mobile-ads';

import Game from '../components/Game'
export default function HomeScreen() {

  useEffect(() => {
    (async () => {
      // Google AdMob will show any messages here that you just set up on the AdMob Privacy & Messaging page
      // const { status: trackingStatus } = await requestTrackingPermissionsAsync();
      // if (trackingStatus !== 'granted') {
      //   // Do something here such as turn off Sentry tracking, store in context/redux to allow for personalized ads, etc.
      // }

      // Initialize the ads
      await mobileAds().initialize();
    })();
}, [])

  return (
    <Game/>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
