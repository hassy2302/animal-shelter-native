import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.animalshelter.kr',
  appName: '유기동물 공고',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    hostname: 'animal-shelter-navy.vercel.app',
  },
  android: {
    allowMixedContent: true,
  },
  ios: {
    contentInset: 'always',
  },
};

export default config;
