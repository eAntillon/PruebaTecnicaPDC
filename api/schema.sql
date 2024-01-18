use db;

CREATE TABLE Pais (
    IdPais INT AUTO_INCREMENT PRIMARY KEY,
    NomPais VARCHAR(250) NOT NULL
);

CREATE TABLE Departamento (
    IdDepto INT AUTO_INCREMENT PRIMARY KEY,
    IdPais INT,
    NomDepto VARCHAR(250) NOT NULL,
    FOREIGN KEY (IdPais) REFERENCES Pais(IdPais)
);

CREATE TABLE Persona (
    IdPersona INT AUTO_INCREMENT PRIMARY KEY,
    NombreCompleto VARCHAR(100) NOT NULL,
    IdDepto INT,
    Direccion VARCHAR(100),
    FOREIGN KEY (IdDepto) REFERENCES Departamento(IdDepto)
);
