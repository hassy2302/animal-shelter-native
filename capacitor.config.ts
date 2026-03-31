import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.animalshelter.kr',
  appName: '유기동물 공고',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    hostname: 'hamsoto.kr',
  },
  android: {
    allowMixedContent: true,
  },
  ios: {
    contentInset: 'always',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: false,
      backgroundColor: '#38BDF8',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#6366f1',
      overlaysWebView: false,
    },
  },
};

export default config;
