import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilLine, Plus, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Skeleton } from "primereact/skeleton";
import { useState } from "react";
import CreatePais from "../components/CreatePais";
import { deletePais, getPaises } from "../services/pais";

const Acciones = (props) => {
  return (
    <div className="flex flex-row gap-2">
      <Button
        type="button"
        size="small"
        className="p-2"
        icon={<PencilLine size={20} />}
        onClick={() => {
          props.setoObjectData(props);
          props.setMode("Editar");
          props.setVisible(true);
          console.log("EDITAR",props);
        }}
      />
      <Button
        type="button"
        size="small"
        className="p-1"
        severity="danger"
        icon={<Trash2 size={20} />}
        onClick={() => {
          props.deleteFn.mutate(props.IdPais);
        }}
      />
    </div>
  );
};
function Paises() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("Crear");
  const [objectData, setoObjectData] = useState({})

  const queryClient = useQueryClient();
  const queryPaises = useQuery({
    queryKey: ["paises"],
    queryFn: getPaises,
  });

  const deleteMutation = useMutation({
    mutationKey: ["deletePais"],
    mutationFn: deletePais,
    onSuccess: () => {
      queryClient.invalidateQueries("paises");
    },
  });

  return (
    <div className="w-full flex flex-column align-items-center justify-content-center h-full pt-4 md:py-8">
      <Card
        header={
          <div className="flex px-4 justify-content-between align-items-center gap-2">
            <h1 className="text-lg md:text-3xl"> Tabla de Países</h1>
            <div className="flex gap-2">
              <Button
                icon={<Plus />}
                label="Añadir"
                size="small"
                severity="success"
                className="py-2 px-3"
                onClick={() => {
                  setoObjectData({});
                  setMode("Crear");
                  setVisible(true);
                }}
              />
              <Button
                icon={<RotateCcw />}
                size="small"
                severity="info"
                className="p-1"
                onClick={() => queryPaises.refetch()}
              />
            </div>
          </div>
        }
        className="w-full md:w-9 xl:w-9 h-fit"
        pt={{
          body: {
            className: "px-2 md:p-3 pb-0 md:pt-0",
          },
          content: {
            className: "p-0",
          },
        }}
      >
        {queryPaises.isLoading && (
          <Skeleton className="mb-2 w-full h-12rem"></Skeleton>
        )}
        {!queryPaises.isLoading && queryPaises.isFetched && (
          <DataTable
            scrollable
            scrollHeight="30rem"
            value={queryPaises.data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column field="IdPais" header="Id" className="w-2"></Column>
            <Column field="NomPais" header="Nombre" className="w-2"></Column>
            <Column
              header="Acciones"
              className="w-1"
              body={(props) => (
                <Acciones deleteFn={deleteMutation} setMode={setMode} setVisible={setVisible} setoObjectData={setoObjectData} {...props} />
              )}
            />
          </DataTable>
        )}
      </Card>
      <CreatePais visible={visible} initialValues={objectData} mode={mode}  setVisible={setVisible} />
    </div>
  );
}

export default Paises;
