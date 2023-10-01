import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function AddView() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const history = useHistory();

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleAddPerson = async () => {
    // Create a person object with the id, firstName, and lastName
    const newPerson = {
      id: 0,
      firstName: firstName,
      lastName: lastName,
    };

    try {
        const response = await axios.post('http://localhost:8080/add', null, {
            params: {
                firstName: newPerson.firstName,
                lastName: newPerson.lastName
            }
        });
        // Handle success
        console.log('Person added successfully', response.data);

        // Redirect back to the list view after adding
        history.push('/');

      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error('Error adding person:', error);
      }

  };

  return (
    <div>
      <h2>Add Person</h2>
      <div>
        <label htmlFor="firstname">First Name:</label>
        <input type="text" id="firstname" value={firstName} onChange={handleFirstNameChange} />
      </div>
      <div>
        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" value={lastName} onChange={handleLastNameChange} />
      </div>
      <button onClick={handleAddPerson}>Add Person</button>
    </div>
  );
}

export default AddView;
