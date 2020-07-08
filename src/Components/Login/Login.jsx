import React, { Component } from 'react';
import styles from './Login.module.css';


class Login extends Component {
  state = {  user: {email:"",password:""}  }

  handleChange = ({ target }) => {
    //Clone
    const user = { ...this.state.user };
    //Edit
    user[target.name] = target.value;
    //Set Satate
    this.setState({ user });
  };
  render() { 
    return ( <form onSubmit={e => {this.props.handleLogin(e,this.state.user)}} method="post">
    <div className= {styles.container}>
      <label htmlFor="email"><b>Username</b></label>
      <input onChange={this.handleChange} type="text" placeholder="Enter Username" name="email" required value={this.state.user.email}/>
      <label htmlFor="password"><b>Password</b></label>
      <input onChange={this.handleChange} type="password" placeholder="Enter Password" name="password" value={this.state.user.password} required />
      <button type="submit">Login</button>
    </div>
  </form> );
  }
}
 
export default Login;
