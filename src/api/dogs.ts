import axios from "./axiosInstance";
import { Dog } from "../models/dogModel";
import { DogSearch } from "../models/dogModel";
import { DogSearchResponse } from "../models/dogModel";
import { MatchResponse } from "../models/dogModel";

export const getBreeds = async (): Promise<string[]> => {
  const response = await axios.get<string[]>("/dogs/breeds");
  return response.data;
};

export const searchDogs = async (
  params: DogSearch
): Promise<DogSearchResponse> => {
  const response = await axios.get<DogSearchResponse>("/dogs/search", {
    params,
  });
  return response.data;
};

export const fetchDogsById = async (ids: string[]): Promise<Dog[]> => {
  const response = await axios.post<Dog[]>("/dogs", ids);
  return response.data;
};

export const matchDogs = async (
  favoriteIds: string[]
): Promise<MatchResponse> => {
  const response = await axios.post<MatchResponse>("/dogs/match", favoriteIds);
  return response.data;
};
