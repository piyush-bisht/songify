import { Component } from "react";
//-----------------------------------------------------------------
import ReactLoading from 'react-loading';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
//-----------------------------------------------------------------
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute, PublicRoute } from './components/Routes';
//-----------------------------------------------------------------
import Main from './pages/Main';
import Home from './pages/Home';
import Login from './pages/Login';
import Tracks from "./pages/Tracks";
import Signup from './pages/Signup';
import AudioPlayer from "./pages/AudioPlayer";
//-----------------------------------------------------------------
import { auth, db } from './services/firebase';
//-----------------------------------------------------------------

class App extends Component
{
  constructor() {
    super();

    this.state = {
      authenticated: false,
      spotifyAuth: false,
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
            try {
              console.log(auth().currentUser)
                db.ref("users").child(auth().currentUser.uid).child({
                  email: auth().currentUser.email,
                })
            }
            catch(error) {
                console.log(error.message);
            }
        } else {
            this.setState({
              authenticated: false,
              loading: false,
            });
        }
    });
  }

  render() {
    console.log(this.state.spotifyAuth)
    return this.state.loading ? (
        <div className="loading-indicator">
            <ReactLoading type="spin" color="blue" height={'3%'} width={'3%'}/>
        </div>
      ) : (
              <Router>
                <Switch>
                  <PublicRoute exact path="/" authenticated={this.state.authenticated} component={Home} />
                  <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login} />
                  <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup} />
                  <PrivateRoute path="/main" authenticated={this.state.authenticated} component={Main} />
                  <PrivateRoute path="/player" authenticated={this.state.authenticated} component={AudioPlayer} />
                  <PrivateRoute path="/tracks" authenticated={this.state.authenticated} component={Tracks} />
                </Switch>
              </Router>
          )
  }
}
export default App;