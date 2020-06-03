import React from 'react';
import axios from 'axios'
import Card from './Card'
import {token, username} from './token'
import { Base64 } from 'js-base64'
import './App.css';

const followersArray = [
  'Vippsi',
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell',
  'iatechristmas',
  'songamugenzi',
  'meep-morp',
  'TheeSweeney'
  ];


  

class App extends React.Component {

    state={
      users: [],
      // users: followersArray
    }


  componentDidMount(){
    const tok = `${username}:${token}`
    const hash = btoa(tok)
    const Basic = 'Basic ' + hash 

    
    followersArray.map((singleUser) => {
      axios.get(`https://api.github.com/users/${singleUser}`, {headers : { 'Authorization' : Basic}})
      .then(res => {
        this.setState({
          users:[...this.state.users, res.data]
        })
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })

    })}
    
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
    <h1>Github Users:</h1>
          <div>
    
          {this.state.users.map(user => (
            
            <Card user={user}/>
          ))}
          </div>
        </header>
      </div>
    );
  }
  
}

export default App;
