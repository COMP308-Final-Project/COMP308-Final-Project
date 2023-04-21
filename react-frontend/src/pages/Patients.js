import {React, useEffect} from 'react'
import { useQuery,useMutation, gql} from "@apollo/client";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const GET_PATIENTS = gql`
{
  getPatients{
    _id
    name
    email
    userType
    
  }
}
`;


export default function Patients() {

    const { loading, error, data } = useQuery(GET_PATIENTS);

    //Use Effects
    useEffect(()=>{
        console.log(data);

    })

    if (loading) {return "Loading...";}
    if (error){ return `Error! ${error.message}`;}
  return (
    <Container>
    <Table striped bordered hover variant="dark" className='text-center'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {/** Displaying public or private leagues depending on toggle switch btn */}
        { data.getPatients.map((patient, index)=>{
          return(
          <tr  key={index}>
            <td>{patient.name}</td>
            <td>{patient.email} </td>
           
          </tr>)
        })
      
      }

        </tbody>

        
      </Table>
     
</Container>
  )
}
