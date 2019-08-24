
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import HarbourWebView from './harbour_web_view';

const { width, height } = Dimensions.get('window');

const webViewHeight = Math.round(height * 0.8);

const styles = StyleSheet.create({
  webView: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    height: webViewHeight,
    backgroundColor: 'grey',
  },
  logWrapper: {
    position: 'absolute',
    top: 40 + webViewHeight,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
  },
  logInner: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  logText: {
    color: 'white',
    fontSize: 16,
  },
});

function _avatar(id) {
  return `https://www.gravatar.com/avatar/${id}?s=32&d=identicon&r=PG`;
}

const PLAYER = {
  id: 42,
  name: "Foo",
  photo_url: _avatar(42),
};

function _leaderboard(score,id) {
  return { score, timestamp: Date.now(), rank: 1, id, name: `Player ${id}`, photo: _avatar(id) };
}
function _scoreSort(a,b) {
  return b.score - a.score;
}

const LEADERBOARD_LIST = [
  _leaderboard(10,1),
  _leaderboard(20,22),
  _leaderboard(30,33),
  _leaderboard(40,44),
  _leaderboard(50,55),
  _leaderboard(60,66),
  _leaderboard(70,77),
  _leaderboard(80,8),
  _leaderboard(90,9),
  _leaderboard(100,111),
  _leaderboard(110,1222),
];

LEADERBOARD_LIST.sort(_scoreSort);
LEADERBOARD_LIST.forEach((l,i) => {
  l.rank = i + 1;
});

const PLAYER_LEADERBOARD = {
  ...PLAYER,
  score: 42,
  timestamp: Date.now(),
  extraData: null,
};

export default class App extends React.PureComponent {
  state = {
    log_lines: ["Started"],
  }
  _harbourRef = React.createRef();
  _onMessage = (event,extra,callback_index) => {
    this._log(event,extra,callback_index);
  };
  _onPlayer = (event,extra,callback_index) => {
    this._log(event,extra,callback_index);
    this._safeSend(event,null,PLAYER,callback_index);
  };
  _onLeaderboardList = (event,extra,callback_index) => {
    this._log(event,extra,callback_index);
    this._safeSend(event,null,[],callback_index);
  };
  _onLeaderboardEntryCount = (event,extra,callback_index) => {
    this._log(event,extra,callback_index);
    this._safeSend(event,null,LEADERBOARD_LIST.length,callback_index);
  };
  _onLeaderboardSetScore = (event,extra,callback_index) => {
    this._log(event,extra,callback_index);
    this._safeSend(event,null,PLAYER_LEADERBOARD,callback_index);
  };
  _onLeaderboardPlayerEntry = (event,extra,callback_index) => {
    this._log(event,extra,callback_index);
    this._safeSend(event,null,PLAYER_LEADERBOARD,callback_index);
  };
  _onLeaderboardEntries = (event,extra,callback_index) => {
    this._log(event,extra,callback_index);
    this._safeSend(event,null,LEADERBOARD_LIST,callback_index);
  };

  _log(event,extra,callback_index) {
    this.state.log_lines.push(JSON.stringify({ event, extra, callback_index }));
    this.forceUpdate();
  }

  _safeSend(event,err,result,callback_index) {
    if (this._harbourRef.current) {
      this._harbourRef.current.sendClient(event,err,result,callback_index);
    }
  };

  render() {
    const lines = this.state.log_lines.map((line,i) => {
      return <Text key={i} style={styles.logText}>{String(line)}</Text>;
    });
    return (
      <View style={StyleSheet.absoluteFill}>
        <HarbourWebView
          ref={this._harbourRef}
          style={styles.webView}
          source={{uri: 'http://localhost:8000/'}}
          useWebKit={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="always"
          originWhitelist={"http://localhost:8000"}
          onMessage={this._onMessage}
          onPlayer={this._onPlayer}
          onLeaderboardList={this._onLeaderboardList}
          onLeaderboardEntryCount={this._onLeaderboardEntryCount}
          onLeaderboardSetScore={this._onLeaderboardSetScore}
          onLeaderboardPlayerEntry={this._onLeaderboardPlayerEntry}
          onLeaderboardEntries={this._onLeaderboardEntries}
        />
        <ScrollView
          style={styles.logWrapper}
          contentContainer={styles.logInner}
        >
          {lines}
        </ScrollView>
      </View>
    );
  }
}

function jsonParse(json,def) {
  let obj;
  try {
    obj = JSON.parse(json);
  } catch(e) {
    // noop
  }
  return obj || def;
}
