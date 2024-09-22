import { useQuery, gql } from "@apollo/client";
import { FC } from "react";

// launchesPast(limit: $limit) {
const PAST_LAUNCHES_QUERY = gql`
  query GetPastLaunches {
    launchesPast(limit: 5) {
      id
      details
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
    }
  }
`;

interface Launch {
  id: string;
  details: string;
  mission_name: string;
  launch_date_local: Date;
  rocket: {
    rocket_name: string;
  };
}

const PastLaunches: FC = () => {
  const { loading, error, data } = useQuery(PAST_LAUNCHES_QUERY);
  console.log("data", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Past SpaceX Launches</h2>
      <ul>
        {data.launchesPast.map((launch: Launch) => (
          <li key={launch.id}>
            <h3>{launch.mission_name}</h3>
            <h5>Rocket Name: {launch.rocket.rocket_name}</h5>
            <p>
              Date: {new Date(launch.launch_date_local).toLocaleDateString()}
            </p>
            <p>Details: {launch.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastLaunches;
