import axiosInstance from "./service";

export async function getPersonas() {
  const { data: response } = await axiosInstance.get("/personas");
  return response;
}

export async function postPersonas(body) {
  const { data: response } = await axiosInstance.post("/personas", body);
  return response;
}

export async function putPersonas(id, body) {
  const { data: response } = await axiosInstance.put(`/personas/${id}`, body);
  return response;
}

export async function deletePersonas(id) {
  const { data: response } = await axiosInstance.delete(`/personas/${id}`);
  return response;
}
