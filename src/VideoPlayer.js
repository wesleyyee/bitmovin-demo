import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { loadAll } from './helpers';

export class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.destroyPlayer = this.destroyPlayer.bind(this);
    this.initPlayer = this.initPlayer.bind(this);
    this.setupPlayer = this.setupPlayer.bind(this);
  }

  componentDidMount() {
    loadAll([
      'https://bitmovin-a.akamaihd.net/bitmovin-player/stable/7.6.2/bitmovinplayer.js',
      '//bitmovin-a.akamaihd.net/bitmovin-player/stable/7/bitmovinplayer-ui.js',
    ], this.initPlayer);
  }

  componentWillUnmount() {
    this.destroyPlayer();
  }

  destroyPlayer() {
    if (global.BitmovinPlayer) {
      global.BitmovinPlayer.unload();
      global.BitmovinPlayer.destroy();
      delete global.BitmovinPlayer;
    }
  }

  setupPlayer(player) {
    this.myUiManager = global.bitmovin.playerui.UIManager.Factory.buildDefaultUI(player);
  }

  initPlayer() {
    const {
      poster,
      stream,
      title,
    } = this.props;
    const player = global.bitmovin.player('bitmovin-player');
    global.BitmovinPlayer = player;
    this.mounted = 0;

    const conf = {
      adaptation: {
        desktop: {
          logic: 'v2',
          preload: false,
        },
      },
      cast: {
        enable: true,
        application_id: 'C85021B4',
      },
      key: 'fced659c-2594-4cf2-aec5-2b04413a9e99',
      playback: {
        preferredTech: {
          player: 'html5',
          streaming: 'hls',
          timeShift: false,
        },
      },
      source: {
        hls: stream,
        poster,
        title,
      },
      style: {
        ux: false,
      },
      tweaks: {
        autoqualityswitching: true,
        max_buffer_level: 40,
      },
    };

    return player.setup(conf).then(this.setupPlayer).catch(() => {});
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" href="//bitmovin-a.akamaihd.net/bitmovin-player/stable/7/bitmovinplayer-ui.css" />
        <div id="bitmovin-player"></div>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  poster: PropTypes.string,
  stream: PropTypes.string,
  title: PropTypes.string,
};
