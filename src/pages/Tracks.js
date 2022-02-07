import React, { Component } from 'react';
import { BrandNav } from './Main';
import "../Styles/Tracks.css"
import AudioPlayer from './AudioPlayer';
import {Link} from "react-router-dom";
import Cookies from 'universal-cookie';
class Tracks extends Component {
    constructor(props)
    {
        super(props);
        const cookies= new Cookies();
        const {nowPlaying,
        playingSongImage,
        isPlaying,
        playingSongLink,
        playingArtist}=cookies.get("playerState");
        this.state={
            nowPlaying,
            playingSongImage,
            isPlaying,
            playingSongLink,
            playingArtist,

            songs:["You","Sorry","Better","Baila Conmigo","Your Power"],
            songImages:[
            "https://pagalnew.com/coverimages/You-Benny-Blanco-500-500.jpg",
            "https://pagalnew.com/coverimages/Sorry-Alan-Walker-500-500.jpg",
            "https://pagalnew.com/coverimages/Better-Nobody-Is-Listening-500-500.jpg",
            "https://pagalnew.com/coverimages/Baila-Conmigo-Selena-Gomez-500-500.jpg",
            "https://pagalnew.com/coverimages/Your-Power-Billie-Eilish-500-500.jpg"
        ],
            durations:[],
            artists:["Benny Blanco","Alan Walker","Zayn Malik","Selena Gomez","Billie Elish"],
            songLinks:[
            "https://firebasestorage.googleapis.com/v0/b/gallery-b5e8d.appspot.com/o/you-benny-blanco-128-kbps-sound.mp3?alt=media&token=d8e2ac9f-f53e-4f33-827c-e37c933f09df",
            "https://firebasestorage.googleapis.com/v0/b/gallery-b5e8d.appspot.com/o/sorry-alan-walker-128-kbps-sound.mp3?alt=media&token=f9246eb5-6fca-4098-a565-a2177574ec85",
            "https://firebasestorage.googleapis.com/v0/b/gallery-b5e8d.appspot.com/o/better-nobody-is-listening-128-kbps-sound.mp3?alt=media&token=d6b40632-ee4a-43b0-b2ad-c11b0f61583d",
            "https://firebasestorage.googleapis.com/v0/b/gallery-b5e8d.appspot.com/o/baila-conmigo-selena-gomez-128-kbps-sound.mp3?alt=media&token=41511ce4-88df-4fd7-ab74-5a77e998a21a",
            "https://firebasestorage.googleapis.com/v0/b/gallery-b5e8d.appspot.com/o/your-power-billie-eilish-128-kbps-sound.mp3?alt=media&token=c7ee827e-64f5-4a20-8376-98ca8cf2699d"
        ]
        }
        this.togglePlaying=this.togglePlaying.bind(this);
       
    }
    togglePlaying(index,playerState)
    {
        const {songs,songImages,songLinks,artists}=this.state;
        
        const newState={nowPlaying:songs[index],
            playingSongImage:songImages[index],
            playingSongLink:songLinks[index],
            playingArtist:artists[index],
            isPlaying:true};

        this.setState({
            nowPlaying:songs[index],
            playingSongImage:songImages[index],
            playingSongLink:songLinks[index],
            playingArtist:artists[index],
            isPlaying:true})
        
        
        const cookies= new Cookies();
        cookies.set("playerState",newState);
        console.log(cookies.get("playerState"))
        
        
    }
    render() {
        const {songs,artists}=this.state;
        const cookies=new Cookies();
        const PlayerState=cookies.get("playerState")
        let playerState="tracks-list list-group";
        if(this.state.isPlaying)
            playerState+=" show-player";
        else
            playerState+=" hide-player"
        return (
            
            <div className="track-container">
                <BrandNav/>
                <p className="tracks-title">Iconic handpicked songs</p>
                <p className="tracks-subtitle">Just for you</p>
                <div style={{"textAlign":"center"}}>
                
                <button type="button" class="tracks-play-botton btn btn-secondary btn-lg" onClick={()=>this.togglePlaying(0)}>Play Now</button>
                </div>
                <div ref={this.playerRef} className={playerState}>
                {songs.map((song,index)=>(
                
              
                
                
                <TracksMenu songTitle={song} artist={artists[index]} index={index} onClick={()=>{this.togglePlaying(index)}}/>
                ))}

                </div>
                {this.state.isPlaying &&
                <AudioPlayer/>
                // <AudioPlayer  nowPlaying={this.state.nowPlaying}  
                // playingSongLink={this.state.playingSongLink}
                // playingSongImage={this.state.playingSongImage} 
                // playingArtist={this.state.playingArtist}
                // isPlaying={this.state.isPlaying} 
                // />
                }
            </div>
        );
    }
}

export default Tracks;


class TracksMenu extends Component {
  render() {
      const {songTitle,artist} = this.props;
    return (
        
            
        <Link onClick={this.props.onClick} to="#" class="track-single list-group-item  " aria-current="true">
            <div class="d-flex w-100 justify-content-between">
            <h5 class="track-text mb-1">{songTitle}</h5>
            <small class="track-text text-muted">Play</small>
            </div>
            <p class="track-text mb-1">{artist}</p>
            
        </Link>
        
        
        
    )
  }
}
