import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const setToken = newToken => {
    token = `Bearer ${newToken}`;
};

const create = async newObject => {

    const config = {
        headers: {
            Authorization: token
        }
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const like = async (id, newObject) => {

    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
};

const removeBlog = async (id) => {
    const config = {
        headers: {
            Authorization: token
        }
    };

    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
};

const addComment = async (id, newObject) => {
    const config = {
        headers: {
            Authorization: token
        }
    };

    const response = await axios.post(`${baseUrl}/${id}/comments`, newObject, config);
    return response.data;
};

export default { getAll, setToken, create, like, removeBlog,
    addComment };