import Constants from "expo-constants";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";


const adUnitId = __DEV__
  ? TestIds.BANNER
  :  Constants.expoConfig?.extra?.GOOGLE_ADMOB_IOS_APP_ID

const AdBanner = () => {
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.INLINE_ADAPTIVE_BANNER}
    />
  );
};
export default AdBanner;
