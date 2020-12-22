import axios from 'axios';

const getCountry = async (name) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`);
    return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getCountry
};