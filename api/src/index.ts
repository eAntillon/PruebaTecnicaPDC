import { PrismaClient } from '@prisma/client'
import cors from 'cors';
import express from "express";
const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())


app.get("/paises", async (req, res) => {
  const todos = await prisma.pais.findMany();
  res.json(todos);
});

app.get("/departamentos", async (req, res) => {
  const todos = await prisma.departamento.findMany({
    include: {
      Pais: true,
    },
  });
  res.json(todos);
});

app.get("/personas", async (req, res) => {
  const todos = await prisma.persona.findMany({
    include: {
      Departamento: {
        include: {
          Pais: true,
        },
      },
    },
  });
  res.json(todos);
});


app.post("/paises", async (req, res) => {
  console.log(req.body);
  const data = req.body;
  console.log(data);
  const pais = await prisma.pais.create({
    data: {
      ...data,
    },
  });
  return res.json(pais);
});

app.post("/departamentos", async (req, res) => {
  const data = req.body;
  const departamento = await prisma.departamento.create({
    data: {
      ...data,
    },
  });
  return res.json(departamento);
});

app.post("/personas", async (req, res) => {
  const data = req.body;
  const persona = await prisma.persona.create({
    data: {
      ...data,
    },
  });
  return res.json(persona);
});

app.put("/paises/:id", async (req, res) => {
  const id = req.params.id;
  const pais = await prisma.pais.update({
    where: { IdPais: parseInt(id) },
    data: req.body,
  });
  return res.json(pais);
});

app.put("/departamentos/:id", async (req, res) => {
  const id = req.params.id;
  const departamento = await prisma.departamento.update({
    where: { IdDepto: parseInt(id) },
    data: req.body,
  });
  return res.json(departamento);
});

app.put("/personas/:id", async (req, res) => {
  const id = req.params.id;
  const persona = await prisma.persona.update({
    where: { IdPersona: parseInt(id) },
    data: req.body,
  });
  return res.json(persona);
});

app.delete("/paises/:id", async (req, res) => {
  console.log(`DELETE /paises/${req.params.id}`);
  const id = req.params.id;
  const pais = await prisma.pais.delete({
    where: { IdPais: parseInt(id) },
  });
  return res.json(pais);
});

app.delete("/departamentos/:id", async (req, res) => {
  const id = req.params.id;
  const departamento = await prisma.departamento.delete({
    where: { IdDepto: parseInt(id) },
  });
  return res.json(departamento);
});

app.delete("/personas/:id", async (req, res) => {
  const id = req.params.id;
  const persona = await prisma.persona.delete({
    where: { IdPersona: parseInt(id) },
  });
  return res.json(persona);
});


app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});