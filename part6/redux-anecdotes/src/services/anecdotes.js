import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createNew = async (content) => {
    const newObject = { content, votes: 0 };
    const response = await axios.post(baseUrl, newObject);
    return response.data;
};

const upVote = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
};

export default {
    getAll, createNew, upVote
};