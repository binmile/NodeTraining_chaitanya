import { useEffect, useState } from 'react';
import './App.css';

interface EmployeeData {
  EmployeeID: number;
  FirstName: string;
  LastName: string;
  Department: string;
  Salary: number;
}


function App() {
  const [data, setData] = useState<EmployeeData[]>([]); 

  useEffect(() => {
    fetch('http://localhost:8081/users')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>fName</th>
            <th>lName</th>
            <th>Depart</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.EmployeeID}</td>
              <td>{d.FirstName}</td>
              <td>{d.LastName}</td>
              <td>{d.Department}</td>
              <td>{d.Salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
