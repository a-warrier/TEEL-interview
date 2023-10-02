import React, { useState, useEffect, ChangeEvent } from "react";
import Person from "../models/Person";
import { AxiosResponse } from "axios";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ListView() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Person[]>([]);

  useEffect(() => {
    axios("http://localhost:8080/all")
      .then((response: AxiosResponse<Person[]>) => {
        setPeople(response.data);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoadingComplete(true);
      });
  }, []);

  const handleDeletePerson = async (person: Person) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/delete?id=${person.id}&firstName=${person.firstName}&lastName=${person.lastName}`
      );
      console.log("Person deleted successfully", response.data);

      // Remove the deleted person from the local state
      setPeople((prevPeople) =>
        prevPeople.filter((prevPerson) => prevPerson.id !== person.id)
      );
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setSearchResults([]); // Clear search results while typing
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/search?firstName=${search}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching by first name:", error);
      setSearchResults([]); // Clear search results in case of an error
    }
  };

// ... (previous code)

return (
    <>
      <h1>List of all People</h1>
      <div>
        <input
          type="text"
          placeholder="Search by First Name"
          value={search}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      {loadingComplete && (
        <div>
          {search.trim() === "" ? (
            // Display the full list when not searching
            people.map((person: Person) => (
              <PersonRow key={person.id}>
                <PersonCell>{person.firstName}</PersonCell>
                <PersonCell>{person.lastName}</PersonCell>
                <DeleteButton onClick={() => handleDeletePerson(person)}>
                  Delete
                </DeleteButton>
                <UpdateButton>
                  <Link to={`/update/${person.id}`}>Update</Link>
                </UpdateButton>
              </PersonRow>
            ))
          ) : searchResults.length > 0 ? (
            // Display search result when found
            searchResults.map((person: Person) => (
              <PersonRow key={person.id}>
                <PersonCell>{person.firstName}</PersonCell>
                <PersonCell>{person.lastName}</PersonCell>
                <DeleteButton onClick={() => handleDeletePerson(person)}>
                  Delete
                </DeleteButton>
                <UpdateButton>
                  <Link to={`/update/${person.id}`}>Update</Link>
                </UpdateButton>
              </PersonRow>
            ))
          ) : (
            // Display "Not Found" when search is hit and no results are found
            <div>Not Found</div>
          )}
        </div>
      )}
      <Link to={"/add"}>Add Person</Link>
    </>
  );
}

export default ListView;

const PersonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PersonCell = styled.span`
  padding: 1rem;
`;

const DeleteButton = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const UpdateButton = styled.button`
  background-color: #00ff00;
  color: #fff;
  border: none;
  cursor: pointer;
`;
