import axiosInstance from "./service";

export async function getDepartamentos() {
  const { data: response } = await axiosInstance.get("/departamentos");
  return response;
}

export async function postDepartamento(body) {
  const { data: response } = await axiosInstance.post("/departamentos", body);
  return response;
}

export async function putDepartamento(id, body) {
  const { data: response } = await axiosInstance.put(
    `/departamentos/${id}`,
    body
  );
  return response;
}

export async function deleteDepartamento(id) {
  const { data: response } = await axiosInstance.delete(`/departamentos/${id}`);
  return response;
}
