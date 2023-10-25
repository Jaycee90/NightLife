import React from "react";
import '../css/settings.css';

import "react-pro-sidebar/dist/css/styles.css";
export default function Profile() {

  async function findUserByCode() {
    const userInput = prompt("Enter the user code:");
    
    if (userInput) {
      try {
        const response = await fetch(`http://localhost:5050/user?code=${userInput}`);
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
  
        const user = await response.json();
        if (!user) {
          alert(`User with code ${userInput} not found`);
          return;
        }
  
        alert(`User found! Name: ${user.name}`);
      } catch (error) {
        alert(error);
      }
    }
  }
  
  return (
    <div>
    <button onClick={findUserByCode}>Find User by Code</button>
    </div>
  );
}
