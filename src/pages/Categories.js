import React, { Component } from 'react';
import axios from 'axios';
import "../Styles/Categories.css"
import { PlayerConsumer } from './PlayerContext';
import AudioPlayer from './AudioPlayer';
import Recommended from './Recommended';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

export default class Categories extends Component {
  
    constructor(props) {

        super(props);
        this.state={
            categories: [],
            rec_cat:    [],
        }
        this.setCategories = this.setCategories.bind(this)
        this.setRecCategories = this.setRecCategories.bind(this)
    }

    setCategories(data) {
        this.setState({categories: data})
    }

    setRecCategories(data) {
        this.setState({rec_cat: data})
    }

    async componentDidMount() {
        const cookies = new Cookies
        try {
            await axios({
                url: 'https://api.spotify.com/v1/browse/categories?country=US',
                method: 'GET',
                headers: {
                  "Authorization": "Bearer " + cookies.get("access_token"),
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                },
              }).then(response => {
                  this.setCategories(response.data.categories.items)
                //   console.log(this.state.playList)
              }).catch(function(error) {
              });
              await axios({
                url: 'https://api.spotify.com/v1/search?q=rap god&type=track&limit=5',
                method: 'GET',
                headers: {
                  "Authorization": "Bearer " + cookies.get("access_token"),
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                },
              }).then(response => {
                  console.log(response.data)
                //   console.log(this.state.playList)
                this.setRecCategories(response.data.tracks.items)
              }).catch(function(error) {
              });
            
          } catch (error) {
            console.log(error);
          }
    }

    togglePlaying(index, playerState)
    {
        const {rec_cat}=this.state;
        
        const newState={nowPlaying:rec_cat[index].name,
            playingSongImage:rec_cat[index].album.images[0].url,
            playingSongLink:rec_cat[index].preview_url,
            playingArtist: rec_cat[index].artists[0].name,
            isPlaying:true};

        this.setState(
            {
                nowPlaying:rec_cat[index].name,
                playingSongImage:rec_cat[index].album.images[0].url,
                playingSongLink:rec_cat[index].preview_url,
                playingArtist: rec_cat[index].artists[0].name,
                isPlaying:true
            })

            const cookies= new Cookies();
            cookies.set("playerState",newState);
            //console.log(cookies.get("playerState"))
    }

    render() {
    const {categories,rec_cat} = this.state;
    return (
        <div className="Cat-Container">
            {/* <Recommended/> */}
            <div className="cat-row row row-cols-1 row-cols-md-6 g-4">
            <p className="cat-title">Popular Categories</p>
            {
                categories.map(data =>{
                    //console.log(index);
                    return <Category title={data?.name} image={data?.icons[0].url} id={data.id}/>
                })
            }
            <a className="cat-title cat-more">See More...</a>
            </div>

            
            <div className="cat-row row row-cols-1 row-cols-md-6 g-4">
            <p className="cat-title">Recommended for you</p>
            {rec_cat.map((track,index)=>{
                //console.log(index);
                if(track.preview_url)
                return <RecCategory title={track.name} image={track.album.images[0].url}  onClick = {()=>this.togglePlaying(index)}/>
            })}
            <a className="cat-title cat-more">See More...</a>
            </div>
            {this.state.isPlaying &&
                <AudioPlayer/>
            }
        </div>
    )
  }
}


class Category extends Component {
  
    render() {
    const {title,image,id}=this.props;
    
    return (

        <Link to={{
            pathname: "/tracks",
            state: {
                ['id']: id
            }
        }}>
            <div className="col">
                <div class="category card bg-dark text-white">
                    <img src={image} class="card-img" alt="..."/>
                    <div class="card-img-overlay">
                        <h5 class="card-title">{title}</h5>
                    </div>
                </div>
            </div>
        </Link>
    )
  }
}

class RecCategory extends Component {
  
    render() {
    const {title,image,id}=this.props;
    
    return (

        <Link >
            <div className="col" onClick={this.props.onClick} href="#">
                <div class="category card bg-dark text-white">
                    <img src={image} class="card-img" alt="..."/>
                    <div class="card-img-overlay">
                        <h5 class="card-title">{title}</h5>
                    </div>
                </div>
            </div>
        </Link>
    )
  }
}

