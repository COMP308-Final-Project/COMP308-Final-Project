import { useQuery } from "@apollo/client";
import { GET_ALERTS } from "../queries/alertQueries";
import AlertCard from "./AlertCard";

export default function Alerts() {
    const { loading, error, data } = useQuery(GET_ALERTS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

  return (
    <>
        {data.alerts.length > 0 ? (
            <div className="row mt-4">
                {data.alerts.map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
                ))}
            </div>
        ) : (
            <p> No Alerts </p>

        )}
    </>
    );
}
