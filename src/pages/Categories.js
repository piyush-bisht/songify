import React, { Component } from 'react';
import axios from 'axios';
import "../Styles/Categories.css"
import { PlayerConsumer } from './PlayerContext';
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
    }

    setCategories(data) {
        this.setState({categories: data})
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
          } catch (error) {
            console.log(error);
          }
    }

    render() {
    const {categories,rec_cat,rec_images} = this.state;
    return (
        <div className="Cat-Container">
            {/* <Recommended/> */}
            <div className="cat-row row row-cols-1 row-cols-md-6 g-4">
            <p className="cat-title">Popular Categories</p>
            {console.log(categories),
                categories.map(data =>{
                    //console.log(index);
                    return <Category title={data?.name} image={data?.icons[0].url} id={data.id}/>
                })
            }
            <a className="cat-title cat-more">See More...</a>
            </div>

            
            <div className="cat-row row row-cols-1 row-cols-md-6 g-4">
            <p className="cat-title">Recommended for you</p>
            {rec_cat.map((Title,index)=>{
                //console.log(index);
                return <Category title={Title} image={rec_images[0]}/>
            })}
            <a className="cat-title cat-more">See More...</a>
            </div>
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

