import axiosInstance from "./service";

export async function getPaises() {
  const { data: response } = await axiosInstance.get("/paises");
  return response;
}

export async function postPais(body) {
  const { data: response } = await axiosInstance.post("/paises", body);
  return response;
}

export async function putPais(id, body) {
  const { data: response } = await axiosInstance.put(`/paises/${id}`, body);
  return response;
}

export async function deletePais(id) {
  const { data: response } = await axiosInstance.delete(`/paises/${id}`);
  return response;
}
