import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { postDepartamento, putDepartamento } from "../services/departamentos";
import { getPaises } from "../services/pais";
import { Dropdown } from "primereact/dropdown";

function CreateDepto({
  visible,
  setVisible,
  mode,
  initialValues = { IdPais: "", NomDepto: "" },
}) {
  const queryClient = useQueryClient();

  const queryPaises = useQuery({
    queryKey: ["paises"],
    queryFn: getPaises,
  });

  const mutation = useMutation({
    mutationKey: ["createDepto"],
    mutationFn: () => {
      if (mode === "Crear") {
        return postDepartamento(formik.values);
      } else {
        return putDepartamento(formik.values.IdDepto, {
          IdPais: formik.values.IdPais,
          NomDepto: formik.values.NomDepto,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("departamentos");
      setVisible(false);
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors = {};
      if (!values.NomDepto) {
        errors.NomDepto = "Requerido";
      }
      return errors;
    },
    onSubmit: (values) => {
      mutation.mutate(values);
    },
    enableReinitialize: true,
  });

  if (queryPaises.isLoading) return <div>Cargando...</div>;

  return (
    <Dialog
      header={mode + " Departamento"}
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
          <label htmlFor="NomDepto">País</label>
          <Dropdown
            value={formik.values.IdPais}
            onChange={(e) => formik.setFieldValue("IdPais", e.target.value)}
            options={queryPaises.data}
            placeholder="Seleciona un País"
            className="w-full"
            optionValue="IdPais"
            optionLabel="NomPais"
          />
        </div>

        <div className="flex flex-column gap-2">
          <label htmlFor="NomDepto">Nombre</label>
          <InputText
            id="NomDepto"
            value={formik.values.NomDepto}
            className="w-full"
            onChange={(e) => formik.setFieldValue("NomDepto", e.target.value)}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default CreateDepto;
