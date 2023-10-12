import React, { useState, useEffect, ChangeEvent } from "react";
import { AxiosResponse } from "axios";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Person from "../models/Person";

function ListView() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Person[]>([]);

  // Toast state variables
  const [showEmptyListToast, setShowEmptyListToast] = useState(false);

  useEffect(() => {
    // Fetch the list of people when the component mounts
    axios("http://localhost:8080/all")
      .then((response: AxiosResponse<Person[]>) => {
        setPeople(response.data);
        setLoadingComplete(true);

        // Show the toast message if the list is empty
        if (response.data.length === 0) {
          setShowEmptyListToast(true);
        }
      })
      .catch((error) => {
        alert(error);
        setLoadingComplete(true);
      });
  }, []);

  const handleDeletePerson = async (person: Person) => {
    // Handle deleting a person
    try {
      const response = await axios.delete(
        `http://localhost:8080/delete?id=${person.id}&firstName=${person.firstName}&lastName=${person.lastName}`
      );
      console.log("Person deleted successfully", response.data);

      // Remove the deleted person from the local state
      setPeople((prevPeople) =>
        prevPeople.filter((prevPerson) => prevPerson.id !== person.id)
      );

      // Check if the list is empty and show the toast
      if (people.length === 1) {
        setShowEmptyListToast(true);
      }
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Handle changes in the search input
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    if (searchTerm.trim() === "") {
      // If the search input is empty, clear the search results
      setSearchResults([]);
    } else {
      // Filter the people array based on the search term
      const filteredPeople = people.filter(
        (person) =>
          (person.firstName?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          )
      );
      setSearchResults(filteredPeople);
    }
  };

  return (
    <Container>
      <SearchContainer>
        <label htmlFor="searchInput" style={{ display: "none" }}>
          Search by first name
        </label>
        <input
          id="searchInput"
          className="form-control"
          type="text"
          placeholder="Search by first name"
          value={search}
          onChange={handleSearchChange}
          aria-label="Search by first name"
        />
      </SearchContainer>
      {loadingComplete && (
        <PeopleList>
          {people.length === 0 ? (
            // Display a Bootstrap toast when the list is empty
            <div className="toast-container position-fixed top-50 start-50 translate-middle">
              <div
                id="emptyListToast"
                className="toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                data-bs-delay="5000" // Adjust delay as needed
                style={{ display: showEmptyListToast ? "block" : "none" }}
              >
                <div className="toast-header">
                  <strong className="me-auto">Empty List</strong>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                    onClick={() => setShowEmptyListToast(false)}
                  ></button>
                </div>
                <div className="toast-body">
                  The list is currently empty. Click 'Add New Person' to update the list!
                </div>
              </div>
            </div>
          ) : search.trim() === "" ? (
            // Display the full list when not searching
            <TableSection people={people} onDelete={handleDeletePerson} />
          ) : searchResults.length > 0 ? (
            // Display search results when found
            <TableSection people={searchResults} onDelete={handleDeletePerson} />
          ) : (
            // Display "Not Found" when search is hit and no results are found
            <div>Sorry, this name does not exist!</div>
          )}
        </PeopleList>
      )}
    </Container>
  );
}

function TableSection({
  people,
  onDelete,
}: {
  people: Person[];
  onDelete: (person: Person) => void;
}) {
  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person: Person) => (
              <tr key={person.id}>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/update/${person.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => onDelete(person)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListView;

const Container = styled.div`
  text-align: center;
  padding: 1rem;
`;

const SearchContainer = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
`;

const PeopleList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;
