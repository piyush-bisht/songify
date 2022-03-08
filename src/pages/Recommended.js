import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import "../Styles/Login.css";
class Recommended extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recSong: "",
        };
    }

    async componentDidMount() {
        const cookies = new Cookies
        try {
            await axios({
                url: "https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2Bartist%3AMiles%2520Davis&type=track%2Cartist&market=ES&limit=10&offset=5",
                method: 'GET',
                headers: {
                  "Authorization": "Bearer " + cookies.get("access_token"),
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                },
              }).then(response => {
                  //this.setCategories(response.data.categories.items)
                  console.log(response)
              }).catch(function(error) {
              });
          } catch (error) {
            console.log(error);
          }
    }

    render() {
        return (
            <h1>hello</h1>
        )
    }
}

export default Recommended;