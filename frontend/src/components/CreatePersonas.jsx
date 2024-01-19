import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { getPersonas, postPersonas, putPersonas } from "../services/personas";
import { getDepartamentos } from "../services/departamentos";

function CreatePersona({
  visible,
  setVisible,
  mode,
  initialValues = { IdDepto: "", NombreCompleto: "",  IdPersona:"", Direccion: ""},
}) {
  const queryClient = useQueryClient();

  const queryDepartamentos = useQuery({
    queryKey: ["departamentos"],
    queryFn: getDepartamentos,
  });

  const mutation = useMutation({
    mutationKey: ["createPersona"],
    mutationFn: () => {
      if (mode === "Crear") {
        return postPersonas(formik.values);
      } else {
        return putPersonas(formik.values.IdPersona, {
          IdDepto: formik.values.IdDepto,
          NombreCompleto: formik.values.NombreCompleto,
          Direccion: formik.values.Direccion,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("personas");
      setVisible(false);
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors = {};
      if (!values.NombreCompleto) {
        errors.NombreCompleto = "Requerido";
      }
      if(!values.Direccion){
        errors.Direccion = "Requerido";
      }
      return errors;
    },
    onSubmit: (values) => {
      mutation.mutate(values);
    },
    enableReinitialize: true,
  });

  if (queryDepartamentos.isLoading) return <div>Cargando...</div>;

  return (
    <Dialog
      header={mode + " Persona"}
      visible={visible}
      className="w-full md:w-3"
      onHide={() => setVisible(false)}
      footer={
        <div className="flex justify-content-end">
          <Button type="button" onClick={formik.handleSubmit}>
            {mode}
          </Button>
        </div>
      }
    >
      <div className="flex flex-column gap-4">
        <div className="flex flex-column gap-2 w-full">
          <label htmlFor="NomDepto">Departamento</label>
          <Dropdown
            value={formik.values.IdDepto}
            onChange={(e) => formik.setFieldValue("IdDepto", e.target.value)}
            options={queryDepartamentos.data}
            placeholder="Seleciona un Departamento"
            className="w-full"
            optionValue="IdDepto"
            optionLabel="NomDepto"
          />
        </div>

        <div className="flex flex-column gap-2">
          <label htmlFor="NombreCompleto">Nombre Completo</label>
          <InputText
            id="NombreCompleto"
            value={formik.values.NombreCompleto}
            className="w-full"
            onChange={(e) => formik.setFieldValue("NombreCompleto", e.target.value)}
          />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="Direccion">Dirección</label>
          <InputText
            id="Direccion"
            value={formik.values.Direccion}
            className="w-full"
            onChange={(e) => formik.setFieldValue("Direccion", e.target.value)}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default CreatePersona;
