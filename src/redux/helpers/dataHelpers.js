import axios from "axios";

export const getScreamsFromScreams = async () => {
  try {
    const { data } = await axios.get("/screams");
    return data;
  } catch (error) {
    const jsonObjError = JSON.stringify(error.response.data);
    throw new Error(jsonObjError);
  }
};
