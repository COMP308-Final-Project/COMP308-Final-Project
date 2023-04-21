import {React, useEffect, useState} from 'react'
import { useQuery,useMutation, gql} from "@apollo/client";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import PatientModal from '../modals/PatientModal';

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

    //Hooks
    const { loading, error, data } = useQuery(GET_PATIENTS);
    const [patientModalShow, setPatientModalShow] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState({});



    //Use Effects
    useEffect(()=>{
        console.log(data);

    })

    //Callbacks
    const onPatientClick = (patientId)=>{
        setSelectedPatientId(patientId);
        setPatientModalShow(true);

    }

     //Setting props for modal component
  const PatientModalProps = {
    show: patientModalShow,
    onHide: () => setPatientModalShow(false),
    patientid:selectedPatientId
  }



    //Rendering
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
          <tr  key={index}  onClick={()=>{onPatientClick(patient._id)}}>
            <td>{patient.name}</td>
            <td>{patient.email} </td>
           
          </tr>)
        })
      
      }

        </tbody>

        
      </Table>

      <PatientModal PatientModalProps={PatientModalProps} />
     
</Container>
  )
}
