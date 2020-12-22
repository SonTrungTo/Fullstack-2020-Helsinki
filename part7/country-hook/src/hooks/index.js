import { useState, useEffect } from 'react';
import countriesService from '../services/countries';

export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = event => {
        setValue(event.target.value);
    };

    return {
        type,
        value,
        onChange
    };
};

export const useCountry = (name) => {
    const [country, setCountry] = useState(null);
  
    useEffect(() => {
        countriesService.getCountry(name).then(response => {
          const countryData = response[0];
          setCountry({ ...countryData, found: true });
        })
        .catch(error => {
          setCountry({ found: false });
        });
    }, [name]);
  
    return country;
};