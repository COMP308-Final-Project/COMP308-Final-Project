import { React, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { Badge } from 'react-bootstrap';
import { useQuery, useMutation, gql } from "@apollo/client";
import {
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon,
    MDBTypography,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from "mdb-react-ui-kit";

const GET_FORM_BY_ID = gql`
  query GetFormById($patientId: String!) {
    formById(patientId: $patientId) {
      patientId
      heartRate
      bodyTemp
      bloodPress
      respRate
    }
  }
`;

export default function PatientModal({ PatientModalProps }) {

    //Hoooks
    const { loading, error, data } = useQuery(GET_FORM_BY_ID, {
        variables: { patientId: PatientModalProps.patientid },
    });

    //UseEffect
    useEffect(() => {

        console.log("PatientModalProps", PatientModalProps)
        console.log("Data:", data)
    })


    //Rendering
    if (loading) { return "Loading..."; }
    if (error) { return `Error! ${error.message}`; }



    return (
        <Modal {...PatientModalProps} aria-labelledby="contained-modal-title-vcenter" size="lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2 className='text-center'><Badge bg="dark">Vital Signs History</Badge></h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <MDBRow>
                        <MDBCol xl="8">
                            <MDBTypography listUnStyled>
                                {
                                    data.formById.length>0?
                                    data.formById.map((form, index) => {
                                       
                                        return (
                                            <>
                                            <h3>Record {index +1}</h3>
                                            <ul key={index}>
                                                <li className="text-muted">
                                                    Blood Pressure: <span style={{ color: "#5d9fc5" }}>{form.bloodPress} mmHg</span>
                                                </li>
                                                <li className="text-muted">
                                                    Body Temperature: <span style={{ color: "#5d9fc5" }}>{form.bodyTemp} °C</span>
                                                </li>
                                                <li className="text-muted">
                                                    Heart Rate: <span style={{ color: "#5d9fc5" }}>{form.heartRate} bpm</span>
                                                </li>
                                                <li className="text-muted">
                                                    Respiratory Rate: <span style={{ color: "#5d9fc5" }}>{form.respRate} bpm</span>
                                                </li>
                                               
                                            </ul>
                                            </>
                                        )
                                        
                                    }) : <span style={{ color: "red" }}>No Data</span>
                                }


                            </MDBTypography>
                        </MDBCol>
                    </MDBRow>

                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={PatientModalProps.onHide}>Close</Button>

            </Modal.Footer>
        </Modal>
    );
}
