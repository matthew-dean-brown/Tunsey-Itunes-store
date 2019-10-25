import React from 'react';
import axios from 'axios';
import './App.css'; 
class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          info:[],
          name:'',
          type:'song',
          favs:[]
      }
    }
    // This returns the data from the search bar
    getInfo = () => {
      let name = this.state.name;
      let type = this.state.type;
      axios.get(`/api/${name}/${type}`)
      .then(data => this.setState({ info:data.data }))
    };
  
    typeState = (event) =>{
      this.setState({type: event.target.value})
    };

    favourites = (item) =>{
      let favs = {
        'artworkUrl' : item.artworkUrl60,
        'artistName': item.artistName,
        'trackName': item.trackName,
        'previewUrl': item.previewUrl,
        'genre': item.primaryGenreName
      };
      this.setState(prevState => ({
          favs: [...prevState.favs, favs]
      }));
    };
    
    removeItem = i => {
      this.setState(state => {
        const favs = state.favs.filter((item, j) => i !== j);
        return {
          favs,
        };
      });
    };
    render(){
      console.log(this.state.info)
      console.log(this.state.type)
      console.log(this.state.fav)
      console.log(this.state.favs)
      return(
        <> 
            <h1>Tunesy</h1>
            <input 
              type='text'
              placeholder='Type text here' 
              onChange={e => this.setState({name:e.target.value})}
            />
            <button 
              type='submit'
              onClick={() => {this.getInfo()}}>Search</button><br
            />
            <input 
              type='radio' 
              name='radio' 
              onClick={this.typeState} defaultChecked 
              value='song'/>Song
            <input 
              type='radio' 
              name='radio' 
              onClick={this.typeState} 
              value='ebook'/>Ebook
            <table>
            {this.state.info.map((item) => {
              if (this.state.type ===  "song"){
                return(
                  <tr>
                    <td><img src={item.artworkUrl60} alt='' /></td>
                    <td>{item.artistName}</td>
                    <td>{item.trackName}</td>
                    <td><audio controls src={item.previewUrl}></audio></td>
                    <td>{item.primaryGenreName}</td>
                    <td><button onClick={()=> this.favourites(item)}>Add to Favourites</button></td>
                  </tr>
                )
              } else if (this.state.type == "ebook"){
                return(
                <div>
                    <img src={item.artworkUrl100} alt='' />
                    <p>{item.artistName}</p>
                    <p>{item.trackName}</p>
                    <p>{item.description}</p>
                    <p>{item.primaryGenreName}</p>
                </div>
                )
              }
            })}
          </table>
          <hr/>
          <h1>Favourites</h1>
          <br/>
          <table>
            {this.state.favs.map((item ,index) => {
              return(
                <tr>
                    <td><img src={item.artworkUrl} alt='' /></td>
                    <td>{item.artistName}</td>
                    <td>{item.trackName}</td>
                    <td><audio controls src={item.previewUrl}></audio></td>
                    <td>{item.primaryGenreName}</td>
                    <td><button onClick={()=> this.removeItem(index) }>Remove from Favourites</button></td>                                
                </tr>
              )
            })}
          </table>
        </>
      )
    }
  }
export default App