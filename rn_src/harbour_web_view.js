
import React from 'react';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';

function noop() {};

export default class HarbourWebView extends React.PureComponent {
  static propTypes = {
    onPlayer: PropTypes.func.isRequired,
    onLeaderboardEntryCount: PropTypes.func,
    onLeaderboardSetScore: PropTypes.func,
    onLeaderboardPlayerEntry: PropTypes.func,
    onLeaderboardEntries: PropTypes.func,
    onMessage: PropTypes.func,
    onLog: PropTypes.func,
    onAdLoad: PropTypes.func,
    onAdShow: PropTypes.func,
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    onGameInit: PropTypes.func,
    onGameLoadingProgress: PropTypes.func,
    onGameStart: PropTypes.func,
  };
  static defaultProps = {
    onLeaderboardEntryCount: noop,
    onLeaderboardSetScore: noop,
    onLeaderboardPlayerEntry: noop,
    onLeaderboardEntries: noop,
    onMessage: noop,
    onLog: noop,
    onAdLoad: noop,
    onAdShow: noop,
    onLogin: noop,
    onLogout: noop,
    onGameInit: noop,
    onGameLoadingProgress: noop,
    onGameStart: noop,
  };

  _webRef = React.createRef();
  _onMessage = event => {
    const data = event.nativeEvent.data;
    if (data) {
      const object = jsonParse(data);
      if (object && object.event) {
        const { event, extra, callback_index } = object;
        if (event === 'log') {
          this.props.onLog(extra);
        } else if (event === 'player') {
          this.props.onPlayer(event,extra,callback_index);
        } else if (event === 'leaderboard_entry_count') {
          this.props.onLeaderboardEntryCount(event,extra,callback_index);
        } else if (event === 'leaderboard_set_score') {
          this.props.onLeaderboardSetScore(event,extra,callback_index);
        } else if (event === 'leaderboard_player_entry') {
          this.props.onLeaderboardPlayerEntry(event,extra,callback_index);
        } else if (event === 'leaderboard_entries') {
          this.props.onLeaderboardEntries(event,extra,callback_index);
        } else if (event === 'ad_load') {
          this.props.onAdLoad(event,extra,callback_index);
        } else if (event === 'ad_show') {
          this.props.onAdShow(event,extra,callback_index);
        } else if (event === 'login') {
          this.props.onLogin(event,extra,callback_index);
        } else if (event === 'logout') {
          this.props.onLogout(event,extra,callback_index);
        } else if (event === 'init') {
          this.props.onGameInit(extra);
        } else if (event === 'loading_progress') {
          this.props.onGameLoadingProgress(extra);
        } else if (event === 'start_game') {
          this.props.onGameStart(extra);
        } else {
          if (this.props.onMessage) {
            this.props.onMessage(event,extra,callback_index);
          }
        }
      }
    }
  };

  sendClient(event,err,result,callback_index) {
    if (this._webRef.current) {
      let err_json = "null";
      let result_json = "null";
      if (err) {
        err_json = JSON.stringify(err);
      }
      if (result !== undefined) {
        result_json = JSON.stringify(result);
      }
      const run = `window.HarbourSDK.emitMessage("${event}",${err_json},${result_json},${callback_index});`;
      this._webRef.current.injectJavaScript(run);
    }
  }
  reload() {
    if (this._webRef.current) {
      this._webRef.current.reload();
    }
  }
  stopLoading() {
    if (this._webRef.current) {
      this._webRef.current.stopLoading();
    }
  }
  injectJavaScript(str) {
    if (this._webRef.current) {
      this._webRef.current.injectJavaScript(str);
    }
  }
  static extraNativeComponentConfig(args) {
    WebView.extraNativeComponentConfig(args)
  }

  render() {
    const {
      onPlayer,
      onLeaderboardEntryCount,
      onLeaderboardSetScore,
      onLeaderboardPlayerEntry,
      onLeaderboardEntries,
      onMessage,
      ...other
    } = this.props;

    return (
      <WebView
        ref={this._webRef}
        {...other}
        onMessage={this._onMessage}
      />
    );
  }
}

function jsonParse(json) {
  let obj;
  try {
    obj = JSON.parse(json);
  } catch(e) {
    // noop
  }
  return obj;
}
