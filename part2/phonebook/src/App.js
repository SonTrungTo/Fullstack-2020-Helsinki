import React, { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

export default function App() {
    const [persons, setPersons] = useState([
        {   
            name: 'Arto Hellas',
            number: '040-1234567'
        },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [nameFilter, setNameFilter] = useState('');

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
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
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
            <Persons persons={ personsToShow } />
        </div>
    );
};