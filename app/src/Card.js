import React from 'react'
import axios from 'axios'
import { token, username } from './token'

const divStyle ={
    margin: '2% auto',
    backgroundColor: '#ffb142',
    width: '50%',
    border:'1px double white',
}
const textStyle ={
    color:'white',
}

const followersStyle ={
    display:'flex',
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'center',
    border:'1px solid red',
    width: '100%',
    backgroundColor:'#cc8e35'
    

}

const followerStyle ={
    display:'flex',
    flexWrap:'wrap',
    margin: '1%',
    width: '33%',
    justifyContent:'center',
    fontSize:'1.6rem'
}

const divStyle2 ={
    margin:'0 auto',
    backgroundColor:'#84817a',
    width:'50%'
}


class Card extends React.Component{
constructor(){
    super()
    this.state={
        followers:[]
    }
}
    
    componentDidMount(){
        const tok = `${username}:${token}`
        const hash = btoa(tok)
        const Basic = 'Basic ' + hash 
    axios.get(`https://api.github.com/users/${this.props.user.login}/followers`, {headers : { 'Authorization' : Basic}})
        .then(res => {
          console.log(res.data)
          this.setState({
            followers: res.data.map((user)=>user.login) 
          })
        //   console.log(this.state.usersFollowers)
        })
        .catch(err => {
          console.log(`Error: ${err}`)
        })
    }

    render(){
        return(
            <div className='Cardcontainer'>
                <div className='CardDiv' style={divStyle}>
                    <div className='textDiv' style={textStyle}>
                    <h3>Name: {this.props.user.name}</h3>
                    <img src={this.props.user.avatar_url}/>
                    <div style={divStyle2}>
                    <p>Username: {this.props.user.login}</p>
                    <p>Location: {this.props.user.location}</p>
                    </div>
                    <p>Followers:</p>
                    <p style={followersStyle}>
                        {
                            this.state.followers.map((singleFollower)=> (
                                <p style={followerStyle}>{singleFollower} </p>
                                ))
                        }      
                </p>
                    
                    </div>
                </div>
            </div>
        );
    }
}
export default Card;