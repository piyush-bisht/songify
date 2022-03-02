import { Component } from "react";
import axios from 'axios';
import qs from 'qs'
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
import Cookies from 'universal-cookie';
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

    const cookies= new Cookies();
    var newPlayerState={

      nowPlaying:"",
      playingSongImage:"",
      playingSongLink:"",
      playingArtist:"",
      isPlaying:false,
      currentTime:0,
      duration:0
    }
    cookies.set("playerState",newPlayerState,{ path: '/' });

    //-------------------------------------------------------
    auth().onAuthStateChanged((user) =>{
        if (user) {
            this.setState({
              authenticated: true,
            })
            try {
              //console.log(auth().currentUser)
                db.ref("users").child(auth().currentUser.uid).child("email").set({
                  email: auth().currentUser.email,
                })
            }
            catch(error) {
                console.log(error.message);
            }
            //--------------------------------------------------------------------
            const clientId = "30f12fba8afd48bba37450e79a1dc1da"
            const clientSecret = "f6da9786d86c40128214f6ce8368ce2f"
            
            const headers = {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              auth: {
                username: clientId,
                password: clientSecret,
              },
            };
            const data = {
              grant_type: 'client_credentials',
            };

            try {
              axios.post(
                'https://accounts.spotify.com/api/token',
                qs.stringify(data),
                headers
              ).then(res => res.data)
              .then(data => data.access_token)
              .then(token =>{
                cookies.set('access_token', token, { path: '/' })
                this.setState({
                  loading: false,
                })
              });
            } catch (error) {
              console.log(error);
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
    // const cookies = new Cookies
    // console.log(cookies.get('access_token'))
    return this.state.loading ? (
        <div className="loading-indicator">
            <ReactLoading type="spin" color="gold" height={'3%'} width={'3%'}/>
        </div>
      ) : (
              <Router>
                <Switch>
                  <PublicRoute exact path="/" authenticated={this.state.authenticated} component={Home} />
                  <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login} />
                  <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup} />
                  <PrivateRoute path="/main" authenticated={this.state.authenticated} component={Main} access_token={this.state.spotifyAccessToken}/>
                  <PrivateRoute path="/player" authenticated={this.state.authenticated} component={AudioPlayer} />
                  <PrivateRoute path="/tracks" authenticated={this.state.authenticated} component={Tracks} />
                </Switch>
              </Router>
          )
  }
}
export default App;