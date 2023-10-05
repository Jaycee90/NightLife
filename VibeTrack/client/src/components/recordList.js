import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './recordList.css';

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.address}</td>
    <td>{props.record.about}</td>
    <td>{props.record.phone}</td>
    <td>{props.record.website}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`} style={{ color: '#000000' }}>Edit</Link>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
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
            <th className="nameColumn">Name</th>
            <th className="addressColumn">Address</th>
            <th className="aboutColumn">About</th>
            <th className="phoneColumn">Phone</th>
            <th className="websiteColumn">Website</th>
            <th className="actionColumn">Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
