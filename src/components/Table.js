import React from 'react'
import './Table.css'
function Table({countries}) {
    return (
        <div className="table">
           {
              countries.map(country =>(
                  
                  <tr>
                      <td>
                           
                            <img 
                            className="flag"
                            src={country.countryInfo.flag} alt=""/>
                            <strong>{country.country}</strong>
                        </td>
                      <td><strong>{country.cases}</strong></td>
                  </tr>
              ))
           }
        </div>
    )
}

export default Table
