import PocketBase from "pocketbase";
import { apiUrl } from "../constants/api";
const pb = new PocketBase(apiUrl);

// export const revalidate = 30 // Currently not working, big L from vercel

export const getProyects = async () => {
  const res = await pb.collection("Proyects").getFullList({ sort: "name" });
  return res;
};

export const getTechonolgies = async () => {
  const res = await pb.collection("technologies").getFullList({ sort: "name" });
  return res;
};

export const getResources = async () => {
  const res = await pb.collection("resources").getFullList({ sort: "name" });
  return res;
};
