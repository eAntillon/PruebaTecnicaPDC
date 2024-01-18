CREATE TABLE Pais (
    Pais VARCHAR(5) PRIMARY KEY,
    NomPais VARCHAR(250) NOT NULL
);

CREATE TABLE Departamento (
    Pais VARCHAR(5),
    Depto VARCHAR(5),
    NomDepto VARCHAR(250) NOT NULL,
    PRIMARY KEY (Pais, Depto),
    FOREIGN KEY (Pais) REFERENCES Pais(Pais)
);

CREATE TABLE Persona (
    IdPersona INT PRIMARY KEY,
    NombreCompleto VARCHAR(100) NOT NULL,
    Pais VARCHAR(5),
    Departamento VARCHAR(5),
    Direccion VARCHAR(100),
    FOREIGN KEY (Pais) REFERENCES Pais(Pais),
    FOREIGN KEY (Departamento) REFERENCES Departamento(Depto)
);
