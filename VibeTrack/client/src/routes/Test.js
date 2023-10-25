import React, { useEffect } from "react";
import '../css/settings.css';
import "react-pro-sidebar/dist/css/styles.css";
import db from "./path/to/db"; // Make sure to replace this with the correct path

export default function Test() {
  const emailToFind = "rnb90@txstate.edu"; // Change this to the desired email

  const findEmail = async () => {
    try {
      const user = await db.collection("User").findOne({ email: emailToFind });

      if (!user) {
        console.log('User not found');
      } else {
        console.log('User found:', user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    findEmail(); // Call the function
  }, []); // Empty dependency array to run the effect once when the component mounts

  return (
    <div>
      {/* Additional JSX content can go here */}
    </div>
  );
}
