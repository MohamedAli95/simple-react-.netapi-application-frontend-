import React from "react";
import { Route, Link } from "react-router-dom";
 import Countries from "../Countries";
import Cities from "../Cities";
const Home = (props) => {
    const Countries1 = props.countries;
    const Cities1 = props.cities;
  return (
      <React.Fragment>
              { props.islogedin &&
    <div className="row">
      <div className="col-3">
        <ul>
          <li>
            <Link onClick={() => props.handleCountries()} to='/home/countries'>Countires</Link>
          </li>
          <li>
            <Link onClick={() => props.handleCities()} to='/home/cities'>Cities</Link>
          </li>
        </ul>
      </div>
      <div className="col">
      { Object.keys(props.countries).length !== 0 &&
        <Route  exact path='/home/countries'  render= {props => {
            return(
          <Countries  {...props}
          Countries={Countries1}
          />)
        }
        } />
      }

        {
            Object.keys(props.cities).length !== 0 &&
        <Route   path='/home/cities' render={props => (<Cities 
        {...props}
        Cities = {Cities1} 
        />)} />
}   
      </div>
        
      </div>
    }
    </React.Fragment>
  );
};

export default Home;
