import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { postPais, putPais } from "../services/pais";

function CreatePais({
  visible,
  setVisible,
  mode,
  initialValues = { NomPais: "" },
}) {
  const queryClient = useQueryClient();
  console.log({initialValues})
  const mutation = useMutation({
    mutationKey: ["createPais"],
    mutationFn: () => {
      if (mode === "Crear") {
        return postPais(formik.values);
      } else {
        return putPais(formik.values.IdPais, {NomPais: formik.values.NomPais});
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("paises");
      setVisible(false);
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors = {};
      if (!values.NomPais) {
        errors.NomPais = "Requerido";
      }
      return errors;
    },
    onSubmit: (values) => {
      mutation.mutate(values);
    },
    enableReinitialize: true,
  });

  return (
    <Dialog
      header={mode + " País"}
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
      <div>
        <div className="flex flex-column gap-2">
          <label htmlFor="NomPais">Nombre</label>
          <InputText
            id="NomPais"
            value={formik.values.NomPais}
            className="w-full"
            onChange={(e) => formik.setFieldValue("NomPais", e.target.value)}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default CreatePais;
