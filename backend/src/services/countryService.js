import {
  createCountryRecordRepo,
  getCountryRecordRepo,
} from "../repositories/countryRepository.js";
import createResponse from "../utils/createResponse.js";
import axios from "axios";

const REST_COUNTRY = "https://restcountries.com/v3.1";

export async function getAllCountries(req) {
  try {
    const URL = `${REST_COUNTRY}/name/all?fields=name`;
    const data = await axios.get(URL, { timeout: 10000 });
    return createResponse(true, data.data);
  } catch (err) {
    console.error("Error from get All Countries : ", err);
    return createResponse(false, err.message);
  }
}

export async function getCountryDetail(req) {
  try {
    const name = req.params.name;
    const URL = `${REST_COUNTRY}/name/${name}?fields=name,currencies,capital,languages,flag`;
    const data = await axios.get(URL, { timeout: 20000 });
    return createResponse(true, data.data);
  } catch (err) {
    console.error("Error from get Country Detail : ", err);
    return createResponse(false, err.message);
  }
}

export async function createCountryRecordForBlog(req) {
  try {
    const result = await createCountryRecordRepo(req.body);
    return createResponse(true, result);
  } catch (err) {
    console.error("Error from Create Country Record : ", err);
    return createResponse(false, err.message);
  }
}

export async function getCountryRecordByBlogId(req) {
  try {
    const blogId = req.params.id;
    const result = await getCountryRecordRepo(blogId);
    return createResponse(true, result);
  } catch (err) {
    console.error("Error from Get Country Record by Blog Id Service : ", err);
    return createResponse(false, err.message);
  }
}
