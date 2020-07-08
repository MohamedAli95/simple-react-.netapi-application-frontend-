import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import { Route, Redirect } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/RegisterComponent/Register";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound";
import axios from "axios";

import store from "store";

class App extends Component {
  state = {
    user: { username: "", token: "" },
    islogedin: false,

    countries: {},
    cities: {}
  };

  handleRegister = (e, user) => {
    //   fetch('https://localhost:44387/Account/Register',)
    // .then((response) => {
    //   return response.json();
    // })
    // .then((data) => {
    //   console.log(data);
    // });

    // fetch('https://localhost:44387/api/Account/Register', {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //   mode: 'cors', // no-cors, *cors, same-origin
    //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: 'same-origin', // include, *same-origin, omit
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   redirect: 'follow', // manual, *follow, error
    //   referrerPolicy: 'no-referrer', // no-referrer, *client
    //   body: JSON.stringify(user) // body data type must match "Content-Type" header
    // });
    axios
      .post("https://localhost:44387/api/Account/Register", user, {})
      .then(function(response) {
        // console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    e.preventDefault();
  };


  setLocalStorage = (user,islogedin) =>
  {
    store.set('user',{...user})
    store.set('islogedin',{islogedin})
    // localStorage.setItem('islogedin', islogedin);
    // localStorage.setItem('islogedin', islogedin);
  }


  handleLogin = (e, user) => {
    // console.log(this.state);
    axios
      .request({
        url: "https://localhost:44387/Login",
        method: "post",
        headers: { ContentType: "application/x-www-form-urlencoded" },
        data: `Username=${user.email}&password=${user.password}&grant_type=password`
      })
      .then(response => {
        let cloneduser = { ...this.state.user };
        cloneduser["username"] = response.data.userName;
        cloneduser["token"] = response.data.access_token;
        this.setLocalStorage( cloneduser, true );
        this.setState({ user: cloneduser, islogedin: true });
        this.props.history.replace("/admin");
        // console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    e.preventDefault();
  };

  componentDidUpdate() {
    console.log("hi updated");
  }

  componentDidMount() {
    const user = store.get('user');
    const islogedin =  store.get('islogedin') ;
    this.setState({ user, islogedin });
  }
  handleCountries = () => {
    console.log("hi");
    axios
      .request({
        url: "https://localhost:44387/Countries/GetCountries",
        headers: { Authorization: `Bearer ${this.state.user.token}` },
        method: "get"
      })
      .then(res => {
        let clonedCountries = { ...this.state.countries };

        clonedCountries = res.data;

        this.setState({ countries: clonedCountries });
      })
      .catch(err => {
        console.log(err);
      });
  };



  handleCities = () => {
    axios
      .request({
        url: "https://localhost:44387/Countries/GetCities",
        headers: { Authorization: `Bearer ${this.state.user.token}` },
        method: "get"
      })
      .then(res => {
        let clonedCities = { ...this.state.cities };

        clonedCities = res.data;
        this.setState({ cities: clonedCities });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleLogout = () => {
    let clonedState = {...this.state}
    clonedState['user'] = { username: "", token: "" };
    clonedState['islogedin'] = false;
    clonedState['cities'] = {};
    clonedState['countries'] = {};
    store.clearAll();
    this.setState(clonedState);
  }

  componentWillUnmount() {
    console.log("hi will unmount");
  }

  render() {
    return (
      <React.Fragment>
        <NavBar islogedin={this.state.islogedin} onLogOut={this.handleLogout} />
        <main className="container">
          {!this.state.islogedin &&
          <React.Fragment>
          <Route
            exact
            path="/login"
            render={props => (
              <Login exact {...props} handleLogin={this.handleLogin} />
            )}
          />
          <Route
            exact
            path="/Register"
            onSubmit={this.handleSubmit}
            render={props => (
              <Register exact {...props} handleRegister={this.handleRegister} />
            )}
          />
          
          <Redirect from="/" to="/login" />
          </React.Fragment>
          }
          {this.state.islogedin &&
          <React.Fragment>
          <Route
            path="/home"
            render={props => (
              <Home
                {...props}
                countries={this.state.countries}
                cities={this.state.cities}
                handleCountries={this.handleCountries}
                handleCities={this.handleCities}
                islogedin={this.state.islogedin}
              />
            )}
          />
          <Redirect from="/Logout" to="/login" />
          <Redirect to="/notFound" />
          <Redirect from="/" to="/home" />
          </React.Fragment>
          }
          <Route path="/notfound" component={NotFound} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
