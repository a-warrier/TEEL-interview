package org.sailplatform.fsbackend.controller;

import java.util.List;

import org.sailplatform.fsbackend.model.Person;
import org.sailplatform.fsbackend.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = { "*"})
public class PersonController {

    @Autowired PersonService personService;

    @GetMapping("/all")
	public List<Person> getAll() {
		return personService.getAll();
	}

	@GetMapping("/search")
    public List<Person> search(@RequestParam String firstName) {
        return personService.search(firstName);
    }

    @PostMapping("/add")
	public Person add(Person toAdd) {
		return personService.add(toAdd);
	}

    @DeleteMapping("/delete")
    public void delete(Person toDelete) {
		personService.delete(toDelete);
		return;
    }

	@PutMapping("/update/{id}")
	public Person update(@RequestBody Person toUpdate, @PathVariable Long id) {
		return personService.update(toUpdate, id);
    }
}
