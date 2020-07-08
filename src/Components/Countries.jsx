import React from 'react';

const Countries = (props) => {
    console.log(props.Countries)
    return ( <ul className="list-group">
        {
         typeof props.Countries !== 'undefined' &&
        props.Countries.map((country,index) => (
            <li key={index} className="list-group-item">
                <div className="row">
        <div className="col-3">ID:{country.id}</div>
                    <div className="col-3">{country.name}</div>
                    <div className="col-3">
                                            {
                                                country.cities.map((city,index)=>(
                                                    <React.Fragment key={index}>
                                                    <div className="row">
                                    <div className="col6 mx-2" >
                                    CityId:{city.id}
                                </div>
                                <div className="col6">
                                CityName:{city.name}
                                </div>
                    </div>
                                </React.Fragment>
                                 ))                   
                                }
        
                    </div>
                </div>
            </li>
        ))}
  </ul>);
}
 
export default Countries;