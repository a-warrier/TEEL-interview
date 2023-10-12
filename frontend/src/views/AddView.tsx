import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h1 className="text-center m-4">Add New Person</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                placeholder="Enter first name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                placeholder="Enter last name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <button
              type="button" // Prevents form submission
              className="btn btn-outline-primary"
              onClick={handleAddPerson}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddView;
