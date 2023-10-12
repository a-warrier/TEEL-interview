package org.sailplatform.fsbackend.service;

import java.util.List;
import javax.validation.Valid;
import javax.persistence.EntityNotFoundException;

import org.sailplatform.fsbackend.model.Person;
import org.sailplatform.fsbackend.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;
    
    public Person add(@Valid Person toAdd){
        return personRepository.save(toAdd);
    }

    public List<Person> getAll(){
        return personRepository.findAll();
    }

    public Person getPersonById(Long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Person with id " + id + " not found"));
    }

    public List<Person> search(String firstName) {
        return personRepository.findByFirstName(firstName);
    }

    public void delete(Person toDelete) {
            personRepository.delete(toDelete);
            return;
    }

    public Person update(Person toUpdate, Long id) {
        Person existingPerson = personRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Person with id " + id + " not found"));
        existingPerson.setFirstName(toUpdate.getFirstName());
        existingPerson.setLastName(toUpdate.getLastName());
        return personRepository.save(existingPerson);
    }
}
