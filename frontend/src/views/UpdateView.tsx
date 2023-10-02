import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UpdateView() {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleUpdatePerson = async () => {
    const updatedPerson = {
      id: 0,
      firstName: firstName,
      lastName: lastName,
    };

    try {
      // Send a PUT request to update the person's details
      const response = await axios.put('http://localhost:8080/person/update/', null, {
        params: {
            firstName: updatedPerson.firstName,
            lastName: updatedPerson.lastName
        }
    });

      // Handle success
      console.log('Person updated successfully', response.data);

      // Redirect back to the list view after updating
      history.push("/");
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  return (
    <div>
      <h2>Update Person</h2>
      <div>
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          id="firstname"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <div>
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          id="lastname"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>
      <button onClick={handleUpdatePerson}>Update Person</button>
    </div>
  );
}

export default UpdateView;
