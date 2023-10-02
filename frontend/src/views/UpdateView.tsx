import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

function UpdateView() {
  const { id } = useParams<{ id: string }>(); // Extract 'id' as a string from route parameters

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
    const idAsLong = parseInt(id, 10); // Assuming base 10

    // Create a person object with the id, firstName, and lastName
    const updatedPerson = {
        id: idAsLong,
        firstName: firstName,
        lastName: lastName,
    };

    console.log("Person to update", updatedPerson);

    try {
      // Send a PUT request to update the person's details
      const response = await axios.put(`http://localhost:8080/update/${id}`, updatedPerson);

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
