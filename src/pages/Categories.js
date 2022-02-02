import React, { Component } from 'react';
import "../Styles/Categories.css"
export default class Categories extends Component {
  
    constructor(props) {

        super(props);
        this.state={
            
            categories:["POP","ROCK","BLUES","SUFI","EDM","HOUSE","SOFT","BOLLYWOOD","ROMANTIC"],
            images:["https://pyxis.nymag.com/v1/imgs/3a3/b1f/2141226b8ab1ae07afe4b541ee0d2b0825-11-yic-pop-essay.rsquare.w700.jpg",
                "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc0NDkxNzA3MjAxODg5NjQw/100-best-rock-songs-of-the-90s.jpg",
                "https://i.scdn.co/image/ab67616d0000b273de8bd851e0c2f3735a8fa5e6",
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUSFRUVFhQZGBYWGBwcGBgcGBQYGRocGRgaGRgaGhwcIS4lHB4rHxgcJjgmKy8xNTU1HCQ7QDszPy40NTEBDAwMEA8QGhISHDQhJCE0NDQ0MTQ0NDE0NDQ0MTE0NDQ0NDQ0PzQ0NDQ0Pz80MT80PzQ/ND8xMTE0MTE1PzQ0Mf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgEDBAUHAgj/xAA/EAACAQIEAwUECQIFBAMAAAABAgADEQQSITEFBkETIlFhcQcygZEjQlJicqGxwdEU8DOiwuHxJFOSshUWY//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABwRAQEBAAIDAQAAAAAAAAAAAAABERIhAjFRQf/aAAwDAQACEQMRAD8A4zERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBETp/su5Hw+NVsTiWzIj5FohrZiACWcg3y62AFr28Nw5hE+mOIcmcJqIabYejTvoGQqlQHyYG5Pkb+hnAubuBtgMVVoE5lUgo1rZkYXVvW2h8wZNGkiIlCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiZvDOGVsTUWlRptUdtlUXNhuT0A8zpAwpsXquoQozDKmUlbqbMzMQbHUXYi+xAE6Ryz7Har5XxtQUk37NCGqb7M1sq/DN8JF/aLg0w+LZEGVUVVVQScqoAqAkk3OUDXy8byWrGi4dxithyChvbQXubAbZddJ749xupjGR6liyJkB6lQzML+hYzXGs3X9pPeF+y+tisFTxaVkRqgLdnUBRcuYhWDi/vAAgEDfeBzyJtOM8Er4NwlamULC6m6sjC9rqykqwv4HTrNXKhERAREQEREBERAREQEREBERAREQEREBERAREQMzhmCfEVEpILs5t1sAASzG3QKCT5AzpOD53w3DKD0cDRQ1FdVNZx3q62YmoeoAbQKToGG2toTgGWjQLqSKrkrmubKlxawAuGLKe94WGnXCGFz6DfpbYgSWtS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",
                "https://i1.sndcdn.com/avatars-000323685668-t6mrku-t500x500.jpg",
                "https://i.pinimg.com/originals/c0/fa/a0/c0faa01160a175f14269e1698e8b133c.gif",
                "https://resources.tidal.com/images/c69042bc/b572/4db2/8ba1/72e3421bad03/640x640.jpg",
                "https://m.media-amazon.com/images/I/81tQQiVlzPL._SS500_.jpg",
                "https://oclassica.com/wp-content/uploads/2012/07/20-Romantic-Thumbnail.jpg"

                
                

        ],
        rec_cat:["Daily Mix 1","Daily Mix 2","Daily Mix 3","Daily Mix 4"],
        rec_images:[
            "https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/music-logo-design.jpg"

        ]
        }
    }
    render() {
    const {categories,images,rec_cat,rec_images} = this.state;
    return (
        <div className="Cat-Container">
            
            <div className="cat-row row row-cols-1 row-cols-md-6 g-4">
            <p className="cat-title">Popular Categories</p>
            {categories.map((Title,index)=>{
                console.log(index);
                return <Category title={Title} image={images[index]}/>
            })}
            <a className="cat-title cat-more">See More...</a>
            </div>

            
            <div className="cat-row row row-cols-1 row-cols-md-6 g-4">
            <p className="cat-title">Recommended for you</p>
            {rec_cat.map((Title,index)=>{
                console.log(index);
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
    const {title,image}=this.props;
    
    return (

        <a href="/tracks" className="col">
            <div class="category card bg-dark text-white">
                <img src={image} class="card-img" alt="..."/>
                <div class="card-img-overlay">
                    <h5 class="card-title">{title}</h5>

                </div>
            </div>
        </a>
    )
  }
}

