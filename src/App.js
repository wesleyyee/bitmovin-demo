import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { VideoPlayer } from './VideoPlayer';
import { VideoList } from './VideoList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <h2>Bitmovin demo</h2>
            <Link to='/'>Home</Link>

            <hr/>

            <Route exact path="/" component={VideoList} />
            <Route
              path="/video/1"
              render={props => (
                <VideoPlayer
                  stream='https://player.ooyala.com/player/appletv/81OXE3ZjE6C4L3Z4lPxwJpyc5H6B6TBN.m3u8'
                  title='video 1'
                  alias='video1'
                  poster='https://secure-cf-c.ooyala.com/81OXE3ZjE6C4L3Z4lPxwJpyc5H6B6TBN/promo349548825'
                  {...props}
                />
              )}
            />
            <Route
              path="/video/2"
              render={props => (
                <VideoPlayer
                  stream='https://player.ooyala.com/player/appletv/t3YXQyZjE6oSZhTNuu43QUqhkdKfYjyy.m3u8'
                  title='video 2'
                  alias='video2'
                  poster='https://secure-cf-c.ooyala.com/t3YXQyZjE6oSZhTNuu43QUqhkdKfYjyy/promo348415706'
                  {...props}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
