package org.sailplatform.fsbackend.service;

import java.util.List;

import org.sailplatform.fsbackend.model.Person;
import org.sailplatform.fsbackend.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;
    
    public Person add(Person toAdd){
        
        return personRepository.save(toAdd);
    }

    public List<Person> getAll(){
        return personRepository.findAll();
    }

    public Person delete(Person toDelete) {
        try {
            Person deletedPerson = personRepository.save(toDelete);
            return deletedPerson;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting person: " + e.getMessage());
        }
    }
}
