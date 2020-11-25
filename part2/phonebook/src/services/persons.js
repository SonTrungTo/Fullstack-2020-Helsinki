import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';
let personsService = {};

const getAll = () => {
    return axios.get(baseUrl)
    .then(response => response.data);
};

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
    .then(response => response.data);
};

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data);
};

const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
    .then(response => response.data);
};

personsService = { getAll, create, remove, update };
export default personsService;