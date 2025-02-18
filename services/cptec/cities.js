import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { CPTEC_URL } from './constants';

const parser = new XMLParser();

const formatCity = (city) => {
  const newCity = city;
  newCity.estado = city.uf;
  delete newCity.uf;

  return newCity;
};

/**
 * Get all Brazilian cities on CPTEC database
 * @returns {Array}
 */
export const getAllCitiesData = async () => {
  const citiesData = await axios.get(`${CPTEC_URL}/listaCidades`, {
    responseType: 'application/xml',
    responseEncoding: 'binary',
  });

  if (parser.parse(citiesData.data).cidades.cidade) {
    return parser.parse(citiesData.data).cidades.cidade.map(formatCity);
  }
  return [];
};

/**
 * Search Brazilian cities by name
 * @param {string} name
 * @returns {Array}
 */
export const getCityData = async (name) => {
  const citiesData = await axios.get(`${CPTEC_URL}/listaCidades?city=${name}`, {
    responseType: 'application/xml',
    responseEncoding: 'binary',
  });

  if (parser.parse(citiesData.data).cidades.cidade) {
    return parser.parse(citiesData.data).cidades.cidade.map(formatCity);
  }
  return [];
};
