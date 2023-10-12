import React, { useState, ChangeEvent, useEffect } from "react";
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

  useEffect(() => {
    // Fetch the current person's details by ID and pre-fill the input fields
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${id}`);
        const personData = response.data;
        setFirstName(personData.firstName);
        setLastName(personData.lastName);
      } catch (error) {
        console.error("Error fetching person details:", error);
      }
    };
    fetchData();
  }, [id]);

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
      // Handle errors, e.g., show an error message
      console.error("Error updating person:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Person Details</h2>
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
              onClick={handleUpdatePerson}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateView;
