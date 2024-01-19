import { Globe2, LandPlot, UsersRound } from "lucide-react";
import { Button } from "primereact/button";
import { useState } from "react";
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";
import Paises from "./Paises";
import Departamentos from "./Departamentos";
import Personas from "./Personas";

function Home() {
  const [selected, setSelected] = useState("paises");

  return (
    <div className="flex flex-column w-full h-screen surface-100">
      <div className="bg-white border-round w-full h-fit py-2 px-2 md:px-4 md:py-3 flex flex-column md:flex-row  gap-0 align-items-center">
        <Button
          type="button"
          size="small"
          text={selected !== "paises"}
          label="Países"
          className="gap-2 transition-all w-full md:w-10rem transition-duration-200 ease-in-out"
          icon={<Globe2 size={22} />}
          onClick={() => setSelected("paises")}
        />
        <Divider layout="vertical" className="h-1rem hidden md:flex" />
        <Divider layout="horizontal" className="h-1rem flex md:hidden my-1" />
        <Button
          type="button"
          size="small"
          text={selected !== "departamentos"}
          label="Departamentos"
          className="gap-2 transition-all w-full md:w-12rem transition-duration-200 ease-in-out"
          icon={<LandPlot size={22} />}
          onClick={() => setSelected("departamentos")}
        />
        <Divider layout="vertical" className="h-1rem hidden md:flex" />
        <Divider layout="horizontal" className="h-1rem flex md:hidden my-1" />

        <Button
          type="button"
          size="small"
          text={selected !== "personas"}
          label="Personas"
          className="gap-2 transition-all w-full md:w-10rem transition-duration-200 ease-in-out"
          icon={<UsersRound size={22} />}
          onClick={() => setSelected("personas")}
        />
      </div>
      <ScrollPanel
        pt={{
          root: {
            className: "flex-1  w-full",
          },
          content: {
            className:
              "w-full flex justify-content-center align-items-center p-1 md:p-0",
          },
        }}
      >
        {selected === "paises" ? (
          <Paises />
        ) : selected === "departamentos" ? (
          <Departamentos />
        ) : (
          <Personas />
        )}
      </ScrollPanel>
    </div>
  );
}

export default Home;
