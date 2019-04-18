import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import TrackPlayer from 'react-native-track-player';
import { dependencies } from '../package.json';

const AUDIO_TRACKS = [
  {
    id: 'track1',
    url: 'http://traffic.libsyn.com/joeroganexp/mmashow063.mp3',
    title: 'Track 1',
    artist: 'Joe Rogan',
  },
  {
    id: 'track2',
    url: 'http://traffic.libsyn.com/joeroganexp/mmashow062.mp3',
    title: 'Track 2',
    artist: 'Joe Rogan',
  },
  {
    id: 'track3',
    url: 'http://traffic.libsyn.com/joeroganexp/p1280.mp3',
    title: 'Track 3',
    artist: 'Joe Rogan',
  },
  {
    id: 'track4',
    url: 'http://traffic.libsyn.com/joeroganexp/p1275.mp3',
    title: 'Track 4',
    artist: 'Joe Rogan',
  },
  {
    id: 'track5',
    url: 'http://traffic.libsyn.com/joeroganexp/p1274.mp3',
    title: 'Track 5',
    artist: 'Joe Rogan',
  },
  {
    id: 'track6',
    url: 'http://traffic.libsyn.com/joeroganexp/p1273.mp3',
    title: 'Track 6',
    artist: 'Joe Rogan',
  }
]

const AudioButton = ({ track, audioStateLabel, currentTrackId, handleAudioToggle }) => (
  <TouchableOpacity
    style={styles.audioButton}
    onPress={() => handleAudioToggle(track)}
  >
    <Text style={styles.audioButtonLabel}>{ currentTrackId === track.id ? audioStateLabel : 'Play' } {track.title}</Text>
  </TouchableOpacity>
)

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioState: TrackPlayer.STATE_NONE,
      currentTrackId: null,
    }

    TrackPlayer.registerEventHandler((data) => {
      if(data.type === 'playback-state') {
        this.setState({
          audioState: data.state
        })
      }
    })

    TrackPlayer.add(AUDIO_TRACKS)
  }

  handleAudioToggle = async (track) => {
    const { audioState, currentTrackId } = this.state
    
    try {
      if(track.id === currentTrackId) {
        if(audioState === TrackPlayer.STATE_PLAYING) {
          TrackPlayer.pause()
        } else {
          TrackPlayer.play()
        }
      } else {
        this.setState({currentTrackId: track.id})
        // TrackPlayer.reset()
        // await TrackPlayer.add(track)
        await TrackPlayer.skip(track.id)
        TrackPlayer.play();
      }
      // const queue = await TrackPlayer.getQueue();
      // console.log('Queue: ', queue);
    } catch (error) {
      console.warn(error)
    }
  }

  render() {
    const { audioState, currentTrackId } = this.state
    console.log('Audio state is:', audioState)
    let audioStateLabel = 'Play'

    if(audioState === TrackPlayer.STATE_PLAYING) {
      audioStateLabel = 'Pause'
    } else if (audioState === TrackPlayer.STATE_BUFFERING) {
      audioStateLabel = 'Buffering'
    }

    return (
      <View style={styles.container}>
        <Text>react-native-track-player version: {dependencies['react-native-track-player']}</Text>
        <Text>Audio State: {audioState}</Text>
        <Text>Current Track: {currentTrackId}</Text>
        {
          AUDIO_TRACKS.map((track => (
            <AudioButton
              key={track.id}
              track={track}
              audioStateLabel={audioStateLabel}
              currentTrackId={currentTrackId}
              handleAudioToggle={this.handleAudioToggle}
            />
          )))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#8FDC97',
    borderRadius: 5,
  },
  audioButtonLabel: {
    color: 'white',
  },
  gif: {
    width: 240,
    height: 135,
  }
});
