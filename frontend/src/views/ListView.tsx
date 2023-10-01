import { useState, useEffect } from "react";
import Person from "../models/Person";
import { AxiosResponse } from "axios";
import axios from 'axios';
import styled from "styled-components";
import { Link } from "react-router-dom";

function ListView(){

    const [people, setPeople] = useState<Person[]>([]);
    const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

    useEffect(()=>{

        axios("http://localhost:8080/all").then((response: AxiosResponse<Person[]> ) => {
            setPeople(response.data);
        }).catch((error)=>{
            alert(error);
        }).finally(()=>{
            setLoadingComplete(true);
        })

    },[])

    return <> 
        <h1>List of all People</h1>
        {
        loadingComplete &&
        <div>
            {
                people.map((person: Person)=>{
                    return <PersonRow>
                                <PersonCell>{person.firstName}</PersonCell>
                                <PersonCell>{person.lastName}</PersonCell>
                            </PersonRow>
                })
            }
        </div>
        }
        <Link to={"/add"}>Add Person</Link>
    </>
}

export default ListView;

const PersonRow = styled.div`

`;

const PersonCell = styled.span`
    padding: 1rem;
`;