package org.sailplatform.fsbackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Person {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    
    String firstName;

    String lastName;

    // Getter method for id
    public Long getId() {
        return id;
    }

    // Setter method for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter method for firstName
    public String getFirstName() {
        return firstName;
    }

    // Setter method for firstName
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    // Getter method for lastName
    public String getLastName() {
        return lastName;
    }

    // Setter method for lastName
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}