import React, { Component } from 'react';
import styles from './Register.module.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {email:"",password:"",name:""}  }
  }

  handleChange = ({target})=>{
   let user = {...this.state.user}
   user[target.name] = target.value;
    this.setState({user})
  }

  render() { 
    return ( 
      <form onSubmit={(e) => {this.props.handleRegister(e,this.state.user)}}>
  <div className={styles.container}>
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    <hr />
    <label htmlFor="email"><b>Email</b></label>
    <input onChange = {this.handleChange} value= {this.state.user.email}  type="text" placeholder="Enter Email" name="email" required />
    <label  htmlFor="psw"><b>Password</b></label>
    <input onChange = {this.handleChange} value ={this.state.user.password} type="password" placeholder="Enter Password" name="password" required />
    <label htmlFor="Name"><b>Name</b></label>
    <input onChange = {this.handleChange} type="text" value = {this.state.name} placeholder="Name" name="name" required />
    <hr />
    <button type="submit"  className= {styles.registerbtn}>Register</button>
  </div>
</form>
     );
  }
}
 
export default Register;

 