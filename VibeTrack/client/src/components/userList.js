import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/recordList.css';

const User = (props) => (
  <tr>
    <td>{props.user.nameF}</td>
    <td>{props.user.nameL}</td>
    <td>{props.user.email}</td>
    <td>{props.user.phone}</td>
    <td>{props.user.gender}</td>
    <td>{props.user.birthdate}</td>
    <td>{props.user.emergency1}</td>
    <td>{props.user.emergency2}</td>
    <td>
      <Link className="btn btn-link" to={`/settings/${props.user._id}`} style={{ color: '#000000' }}>Edit</Link>
    </td>
  </tr>
);

export default function UserList() {
  const [users, setUsers] = useState([]); // Define a state variable 'record'

  useEffect(() => { 
    async function getUsers() { // Define an function to fetch data
      // Send a GET request to the server 
      const response = await fetch(`http://localhost:5050/user/`);

      if (!response.ok) { // Check if the response is successful
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const users = await response.json(); // Parse the response (object in database) as JSON

      setUsers(users);  // Update the 'record' state with the fetched data
    }

    getUsers();  // Call fetchData function

    return;
  }, [users.length]);

  async function deleteUser(id) { // Deletes a record by its ID
    await fetch(`http://localhost:5050/user/${id}`, {
      method: "DELETE"
    });

    //  Create a new array that excludes the record with the matching _id.
    const newUsers = users.filter((el) => el._id !== id);
    setUsers(newUsers);
  }

  function userList() {   // Renders the list of records 
    return users.map((user) => {
      return (
        <User 
          user={user}
          deleteUser={() => deleteUser(user._id)}
          key={user._id}
        />
      );
    });
  }
  return (
    <div >
      <h3 style={{ color: '#000000' }}>User List</h3>
      <table style={{ marginTop: 20, color: '#000000' }}>
        <thead>
          <tr>
            <th className="nameColumn">First Name</th>
            <th className="nameColumn">Last Name</th>
            <th className="emailColumn">Email</th>
            <th className="phoneColumn">Phone</th>
            <th className="genderColumn">Gender</th>
            <th className="birthdateColumn">Birthdate</th>
            <th className="emergencyColumn">Emergency Contact #1</th>
            <th className="emergencyColumn">Emergency Contact #2</th>
            <th className="actionColumn">Action</th>
          </tr>
        </thead>
        <tbody>{userList()}</tbody>
      </table>
    </div>
  );
}
