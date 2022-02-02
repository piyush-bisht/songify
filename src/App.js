import { Component } from "react";

import ReactLoading from 'react-loading';

import { Route,
          BrowserRouter as Router,
          Switch
} from "react-router-dom";

import Main from './pages/Main';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { auth } from './services/firebase';

import { PrivateRoute, PublicRoute } from './components/Routes';

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import AudioPlayer from "./pages/AudioPlayer";
import Tracks from "./pages/Tracks";

class App extends Component
{
  constructor() {
    super();

    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) =>{
        if (user) {
            this.setState({
              authenticated: true,
              loading: false,
            })
        } else {
            this.setState({
              authenticated: false,
              loading: false,
            });
        }
    });
  }

  render() {
    return this.state.loading ? (
        <div className="loading-indicator">
            <ReactLoading type="spin" color="blue" height={'3%'} width={'3%'}/>
        </div>
      ) : (
      <Router>
        <Switch>
          <PublicRoute exact path="/" authenticated={this.state.authenticated} component={Home} />
          <PrivateRoute path="/main" authenticated={this.state.authenticated} component={Main} />
          {/* <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login} /> */}
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup} />
          <PrivateRoute path="/player" authenticated={this.state.authenticated} component={AudioPlayer} />
          <PrivateRoute path="/tracks" authenticated={this.state.authenticated} component={Tracks} />
        </Switch>
      </Router>
    );
    
  }
}
export default App;