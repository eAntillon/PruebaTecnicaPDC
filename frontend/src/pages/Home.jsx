import { Globe2, LandPlot, UsersRound } from "lucide-react";
import { Button } from "primereact/button";
import { useState } from "react";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ScrollPanel } from "primereact/scrollpanel";

function Home() {
  const [selected, setSelected] = useState("paises");

  return (
    <div className="flex flex-column w-full h-screen surface-300">
      <div className="bg-white border-round w-full h-fit md:px-4 md:py-3 flex gap-0 align-items-center">
        <Button
          type="button"
          size="small"
          text={selected !== "paises"}
          label="Países"
          className="gap-2 transition-all transition-duration-200 ease-in-out"
          icon={<Globe2 />}
          onClick={() => setSelected("paises")}
        />
        <Divider layout="vertical" className="h-1rem" />
        <Button
          type="button"
          size="small"
          text={selected !== "departamentos"}
          label="Departamentos"
          className="gap-2 transition-all transition-duration-200 ease-in-out"
          icon={<LandPlot />}
          onClick={() => setSelected("departamentos")}
        />
        <Divider layout="vertical" className="h-1rem" />
        <Button
          type="button"
          size="small"
          text={selected !== "personas"}
          label="Personas"
          className="gap-2 transition-all transition-duration-200 ease-in-out"
          icon={<UsersRound />}
          onClick={() => setSelected("personas")}
        />
      </div>
      <ScrollPanel
        pt={{
          root: {
            className:
              "flex-1  w-full",
          },
          content: {
            className: "w-full flex justify-content-center align-items-center",
          },
        }}
      >
        <Card title="Simple Card" className="w-full md:w-9 xl:w-6">
          <DataTable value={[]} tableStyle={{ minWidth: "50rem" }}>
            <Column field="code" header="Id"></Column>
            <Column field="name" header="Nombre"></Column>
            <Column header="Acciones">
              <Button>X</Button>
            </Column>
          </DataTable>
        </Card>
      </ScrollPanel>
    </div>
  );
}

export default Home;
