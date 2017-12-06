import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';
import { newGame, recievedMessages, socket } from './api';


export class joinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {gameCode: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    recievedMessages();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    if(this.state.gameCode !== ''){
      newGame("joinGame", this.state.gameCode);
      let path = this.props.history;
      let gameCode = this.state.gameCode;
      socket.on('ngConf',function(msg){
          if(msg.sessionId !== ''){
              path.push('/joinGame/'+msg.sessionId);
          }
          return false;
      });
      // if(newGame("joinGame", this.state.gameCode)){
      //   this.props.history.push('/joinGame/'+this.state.gameCode);
      // }else{
      //   console.log("No Game with ID " + this.state.gameCode);
      // }
    }else{
      console.log("error no gameCode Entered");
    }
    //Stop from refreshing the page
    event.preventDefault();
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form id="form4" onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <p>Enter num</p>
            <input id="jg" name='gameCode' value={this.state.gameCode}/><button>Join Game</button>
        </form>
        <Switch>
          <Route path='/joinGame/:number' component={joinGameID}/>
        </Switch>
      </div>
    );
  }
}

export class joinGameID extends Component {
  constructor(props) {
    super(props);
    this.state = {gameCode: props.match.params, users: []};
    recievedMessages();
  }


  render() {
    let holder = this.state.users;
    socket.on('userJoined',function(msg){
        console.log(msg);
        if(msg.userId !== ''){
            holder.push(msg.userId);
        }
    });
    console.log(this.state.users);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Connected to Gameroom: {this.state.gameCode.number}</h1>
            <ul>
              {this.state.users.map(function(listValue){
                return <li>{listValue}</li>;
              })}
            </ul>
        </header>
      </div>
    );
  }

}
