import React from 'react'
import '../componentsstyle/LiveCases.css'
import {Card,Container,Table} from 'react-bootstrap'

function LiveCases({countries}) {
    let i=1
    return (
        <div class="table">

        <Table striped bordered>
  <thead>
    <tr>
      <th>#</th>
      <th>Country</th>
      <th>Cases</th>
      <th>Deaths</th>      
    </tr>
  </thead>
  

        
        {countries.map((country) => (

         <tbody className="tableData">
    <tr>
      <td>{i++}</td>
      <td>{country.country}</td>
      <td>{country.cases}</td>
      <td>{country.deaths}</td>      
    </tr>
    
  </tbody>
            
            ))}
        </Table>
        </div>
    )
}

export default LiveCases;
