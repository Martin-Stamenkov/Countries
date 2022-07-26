import { API, getCountryUrl } from "./endpoints";
import { countriesUrl } from "./endpoints";

export const GetCountries = async () => {
  const response = await API.get(countriesUrl);
  return response.data;
};

export const GetCountryByName = async (name) => {
  const response = await API.get(getCountryUrl(name));
  return response.data[0];
};
