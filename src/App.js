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
import Cookies from 'universal-cookie';
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
       <div>
      <Router>
        
        <Switch>
        
          <PublicRoute exact path="/" authenticated={this.state.authenticated} component={Home} />
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup} />
          <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login} />
          
          <PrivateRoute path="/main" authenticated={this.state.authenticated} component={Main} />
          <PrivateRoute path="/tracks" authenticated={this.state.authenticated} component={Tracks} />
        
          
          
          
          
        </Switch>
        
      </Router>
      </div> 
    );
    
  }
}
export default App;