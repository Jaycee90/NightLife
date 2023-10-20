import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/recordList.css';

const Record = (props) => (
  <tr>
    <td>{props.record.nameF}</td>
    <td>{props.record.nameL}</td>
    <td>{props.record.phone}</td>
    <td>{props.record.email}</td>
    <td>{props.record.gender}</td>
    <td>{props.record.birthdate}</td>
    <td>{props.record.emergency1}</td>
    <td>{props.record.emergency2}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`} style={{ color: '#000000' }}>Edit</Link>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]); // Define a state variable 'record'

  useEffect(() => { 
    async function getRecords() { // Define an function to fetch data
      // Send a GET request to the server 
      const response = await fetch(`http://localhost:5050/user/`);

      if (!response.ok) { // Check if the response is successful
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json(); // Parse the response (object in database) as JSON

      setRecords(records);  // Update the 'record' state with the fetched data
    }

    getRecords();  // Call fetchData function

    return;
  }, [records.length]);

  async function deleteRecord(id) { // Deletes a record by its ID
    await fetch(`http://localhost:5050/user/${id}`, {
      method: "DELETE"
    });

    //  Create a new array that excludes the record with the matching _id.
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function recordList() {   // Renders the list of records 
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
  return (
    <div >
      <h3>Record List</h3>
      <table style={{ marginTop: 20, color: '#000000' }}>
        <thead>
          <tr>
            <th className="nameColumn">First Name</th>
            <th className="addressColumn">Last Name</th>
            <th className="phoneColumn">Phone</th>
            <th className="emailColumn">Email</th>
            <th className="genderColumn">Gender</th>
            <th className="birthDateColumn">Birthdate</th>
            <th className="emergency1Column">Emergency Contact #1</th>
            <th className="emergency2Column">Emergency Contact #2</th>
            <th className="actionColumn">Birthdate</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
