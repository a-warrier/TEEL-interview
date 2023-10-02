import React, { useState, useEffect } from "react";
import Person from "../models/Person";
import { AxiosResponse } from "axios";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ListView() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

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

  return (
    <>
      <h1>List of all People</h1>
      {loadingComplete && (
        <div>
          {people.map((person: Person) => {
            return (
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
            );
          })}
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
