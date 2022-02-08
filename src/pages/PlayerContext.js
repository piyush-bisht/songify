import React from "react";

var newPlayerState={

        nowPlaying:"",
        playingSongImage:"",
        playingSongLink:"",
        playingArtist:"",
        isPlaying:false
      }

const PlayerContext = React.createContext();

const PlayerProvider= PlayerContext.Provider
const PlayerConsumer = PlayerContext.Consumer

export {PlayerProvider,PlayerConsumer,PlayerContext,newPlayerState} 