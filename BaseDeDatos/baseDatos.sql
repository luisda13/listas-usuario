CREATE DATABASE data_base_listas;

USE data_base_listas;

CREATE TABLE usuario (
  `identificacion` int(11) PRIMARY KEY NOT NULL,
  `codUsuario` int(11) UNIQUE NOT NULL,
  `nombres` varchar(30) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `fechaNacimiento` Date NOT NULL,
  `género` varchar(2) NOT NULL
);

CREATE TABLE informacion (
  `idForanea` int(11) NOT NULL,
  `nombres` varchar(30) NOT NULL,
  `numeroContacto` varchar(20) NOT NULL,
  `tipoNumero` varchar(2) NOT NULL,
  `parentesco` varchar(30) NOT NULL
);

ALTER TABLE informacion ADD FOREIGN KEY(idForanea) REFERENCES usuario(codUsuario);