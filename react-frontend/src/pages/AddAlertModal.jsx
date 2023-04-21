import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, gql, useQuery } from "@apollo/client";
//import { ADD_ALERT } from "../mutations/alertMutations";
//import { GET_ALERTS } from "../queries/alertQueries";
//import { GET_PATIENTS } from "../queries/patientQueries";

// GET_ALERTS
const GET_ALERTS = gql`
{
    getAlerts {
        _id
        alertName
        alertDescription
        status 
    }
}
`;

// GET_PATIENTS
const GET_PATIENTS = gql`
{
  getPatients{
    name
    email
    userType
    
  }
}
`;

// ADD_ALERT
const ADD_ALERT = gql`
    mutation AddAlert(
        $alertName: String!
        $alertDescription: String!
        $patientId: ID!
        $status: AlertStatus!
    ) {
        addAlert(
            alertName: $alertName
            alertDescription: $alertDescription
            status: $status
            patientId: $patientId
        ) {
            _id
            alertName
            alertDescription
            status
            user {
                _id
                name
                email
                userType
            }
        }
    }

`;

export default function AddAlertModal() {
    const [alertName, setAlertName] = useState("");
    const [alertDescription, setAlertDescription] = useState("");
    const [patientId, setPatientId] = useState("");
    const [status, setStatus] = useState("new");

    const [addAlert] = useMutation(ADD_ALERT, {
        variables: { alertName, alertDescription, patientId, status },
        update(cache, { data: { addAlert } }) {
            const { alerts } = cache.readQuery({ query: GET_ALERTS });
            cache.writeQuery({
                query: GET_ALERTS,
                data: { alerts: [...alerts, addAlert] },
            });
        },
    });

    // Get Patients for select
    const { loading, error, data } = useQuery(GET_PATIENTS);

    const onSubmit = (e) => {
        e.preventDefault();

        if ( alertName === '' || alertDescription === '' || status === '' ) {
            return alert('Please fill in all fields');
        }
        addAlert( alertName, alertDescription, patientId, status );

        setAlertName('');
        setAlertDescription('');
        setPatientId('');
        setStatus('new');
    };

    if (loading) return null;
    if (error) return 'Something Went Wrong';

  return (
    <>
    {!loading && !error && (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addAlertModal"
            >
                <div className="d-flex align-items-center">
                    <FaList className="icon" />
                    <div>New Alert</div>
                    </div>
                    </button>
                    
                    <div
                        className="modal fade"     
                        id="addAlertModal"
                        aria-labelledby="addAlertModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addAlertModalLabel">
                                        New Alert
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={onSubmit}>
                                                <div className="mb-3">
                                                    <label className="form-label">Alert Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="alertName"
                                                        value={alertName}
                                                        onChange={(e) => setAlertName(e.target.value)}
                                                    />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Alert Description</label>
                                                        <textarea
                                                            className="form-control"
                                                            id="alertDescription"
                                                            value={alertDescription}
                                                            onChange={(e) => setAlertDescription(e.target.value)}
                                                        ></textarea>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Status</label>
                                                            <select
                                                                id="status"
                                                                className="form-select"
                                                                value={status}
                                                                onChange={(e) => setStatus(e.target.value)}
                                                            >
                                                                <option value="ACTIVE">ACTIVE</option>
                                                                <option value="INACTIVE">INACTIVE</option>
                                                                </select>
                                                                </div>

                                                                <div className="mb-3">
                                                                    <label className="form-label">Patient</label>
                                                                    <select
                                                                        id="patientId"
                                                                        className="form-select"
                                                                        value={patientId}
                                                                        onChange={(e) => setPatientId(e.target.value)}
                                                                    >
                                                                        <option value="">Select Patient</option>
                                                                        {data.patients.map((patient) => (
                                                                            <option key={patient._id} value={patient._id}>
                                                                                {patient.firstName} {patient.lastName}
                                                                                </option>
                                                                                ))}
                                                                                </select>
                                                                                </div>

                                                                                <button
                                                                                    type="submit"
                                                                                    className="btn btn-primary"
                                                                                    data-bs-dismiss="modal"
                                                                                >
                                                                                    Submit
                                                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
                                            
  )
}
