import React from 'react'
import '../App.css';


class Favourites extends React.Component{
    constructor(props){
        super(props)
    }
    removeItem = i => {
        this.setState(state => {
          const favs = state.favs.filter((item, j) => i !== j);
          return {
            favs,
          };
        });
      };
    render(){
        return(
            <>
                <table>
                    {this.props.favs.map((item ,index) => {
                        return(
                            <tr>
                                <td><img src={item.artworkUrl60} alt='' /></td>
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
export default Favourites