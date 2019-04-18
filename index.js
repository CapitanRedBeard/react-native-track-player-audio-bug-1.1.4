import { AppRegistry } from 'react-native';
import App from './src/App';
import TrackPlayer from 'react-native-track-player';


TrackPlayer.setupPlayer({});
TrackPlayer.updateOptions({
  stopWithApp: true,
  capabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE
  ]
});


AppRegistry.registerComponent('rntpab', () => App);
