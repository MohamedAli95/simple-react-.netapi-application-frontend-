import React from 'react';
const Cities = (props) => {

    return ( <ul className="list-group">
        {
         typeof props.Cities !== 'undefined' &&
        props.Cities.map((city,index) => (
            <li key={index} className="list-group-item">
                <div className="row">
                    <div className="col3 mx-2" >
                                    CityId:{city.countryID}
                                </div>
                                <div className="col3">
                                CityName:{city.name}
                                </div>
                                <div className="col3">
                                Belonging Country:{city.countryName}
                                </div>
                                 
        
                    </div>
            </li>
        ))}
  </ul>);
}
 
export default Cities;