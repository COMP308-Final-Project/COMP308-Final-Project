import { useQuery, gql } from "@apollo/client";
import {useState, useEffect} from "react";
//import { GET_ALERTS } from "../queries/alertQueries";
import AlertCard from "./AlertCard";

//putting this here because I was getting an error with the import statement
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


export default function Alerts() {

    const [alertList, setAlertList] = useState([]);
    const [message, setMessage] = useState("");

    

    const { loading, error, data } = useQuery(GET_ALERTS);

    useEffect(()=>{
        if(loading){
            setMessage("loading...")

        }
        else if(data){
            setAlertList(data.getAlerts)
            console.log(data.getAlerts)
        }else if(error){
            setMessage("Error:")
        }      

    }, [loading,data, error]);


  return (
    <>
    <p>{message}</p>
        {alertList.length > 0 ? (
            <div className="row mt-4">
                {alertList.map((item) => (
                    <AlertCard key={item._id} alert={item} />
                ))}
            </div>
        ) : (
            <p> No Alerts </p>

        )}
    </>
    );
}
