import React, { useState, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';

function AddView() {
  const [id, setId] = useState<number>(0); // Assuming id is an integer
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(parseInt(event.target.value, 10)); // Parse the input as an integer
  };

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleAddPerson = () => {
    // Create a person object with the id, firstName, and lastName
    const newPerson = {
      id: id,
      firstName: firstName,
      lastName: lastName,
    };

    // Make a POST request to add the person
    axios
      .post('http://localhost:8080/add', newPerson)
      .then((response: AxiosResponse) => {
        // Handle success, e.g., show a success message or update the list of people
        console.log('Person added successfully', newPerson);
        // ADD CODE to update the list of people here
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error('Error adding person:', error);
      });
  };

  return (
    <div>
      <h2>Add Person</h2>
      <div>
        <label>ID:</label>
        <input type="number" value={id} onChange={handleIdChange} />
      </div>
      <div>
        <label>First Name:</label>
        <input type="text" value={firstName} onChange={handleFirstNameChange} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={handleLastNameChange} />
      </div>
      <button onClick={handleAddPerson}>Add Person</button>
    </div>
  );
}

export default AddView;
