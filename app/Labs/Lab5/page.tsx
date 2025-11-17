import EnvironmentVariables from "../../../kambaz-node-server-app/Labs/Lab5/EnvironmentVariables";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <div className="list-group">
        <a href="http://localhost:4000/lab5/welcome"          
           className="list-group-item">
           Welcome
        </a>
      </div><hr/>
       <EnvironmentVariables />

    </div>
);}
