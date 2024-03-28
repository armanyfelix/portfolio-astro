import { apiUrl } from "../constants/api";

export const pbImagePath = (record: any, image: any) => {
  return `${apiUrl}/api/files/${record.collectionId}/${record.id}/${image}`;
};
