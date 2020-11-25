import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";

export default function App() {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [nameFilter, setNameFilter] = useState('');

    useEffect(() => {
        personsService.getAll()
        .then(list => {
            setPersons(list);
        });
    }, []);

    const handleChangeName = (event) => {
        setNewName(event.target.value);
    };
    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value);
    };
    const handleChangeFilter = (event) => {
        setNameFilter(event.target.value);
    };
    const clickSubmit = (event) => {
        event.preventDefault();
        if (persons.map(person => person.name).indexOf(newName.trim()) !== -1) {
            window.alert(`${newName} is already added to phonebook`);
            setNewName('');
            setNewNumber('');
            return;
        }
        const newPerson={name: newName, number: newNumber};
        personsService.create(newPerson)
        .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson));
            setNewName('');
            setNewNumber('');
        });
    };
    const clickDelete = requestedPerson => event => {
        const isDeleted = window.confirm(`Delete ${requestedPerson.name}?`);
        if (isDeleted) {
            personsService.remove(requestedPerson.id)
            .then(removedPerson => {
                // This is one of the weird stuffs of Axios, why response.data is an empty Object?
                const newPersons = persons.filter(person => person.id !== requestedPerson.id);
                setPersons(newPersons);
            });
        }
    };
    const personsToShow = nameFilter.length === 0 ? persons :
        persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()));

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={ nameFilter } handleChange={ handleChangeFilter } />
            <h3>add a new</h3>
            <PersonForm handleSubmit={ clickSubmit }
            valueNewName={ newName } handleChangeName={ handleChangeName }
            valueNewNumber={ newNumber } handleChangeNumber={ handleChangeNumber } />
            <h3>Numbers</h3>
            <Persons persons={ personsToShow }
            buttonDelete={ clickDelete } />
        </div>
    );
};