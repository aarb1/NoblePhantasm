import React, { Component } from 'react';
import {rolesRegistry, localUser} from './joinGameID';
var HashMap = require('hashmap');

var roles;
export class moderator extends Component {

    constructor(props) {
        super(props);
        this.state = {username: '', userRole: ''};
        this.state.username = localUser;
        roles = new HashMap(rolesRegistry);
        this.state.userRole = roles.get(localUser);
        this.extractRoles = this.extractRoles.bind(this);
    }

    extractRoles(){
        var temp = [];
        roles.forEach(function(value, key) {
            temp.push(key + ': ' + value);
        });
        return temp;
     }

    render() {

        this.extractRoles();

        return (
          <div ref="moderator" className="App">
              <div>
                  <h1>{this.state.username}</h1>
                  <h3>You're the {this.state.userRole}!</h3>
                  <p>Power Used || Dead</p>
                  <ul>
                      {this.extractRoles().map(function(listValue,index) {
                      return <li key={index}><input type="checkbox"/><input type="checkbox"/><a href="#"> {listValue}</a></li>;
                      })}
                  </ul>
              </div>
          </div>
        );
    }
}
