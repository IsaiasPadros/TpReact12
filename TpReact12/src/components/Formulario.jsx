import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import ListaNoticias from "./ListaNoticias";

const Formulario = () => {
  const [categoria, setCategoria] = useState("");
  const [pais, setPais] = useState("");
  const [noticias, setNoticias] = useState([]);
  const [mostrarNoticias, setMostrarNoticias] = useState(false);

  // Lista de categorías disponibles
  const categorias = [
    { value: "business", label: "Negocios" },
    { value: "entertainment", label: "Entretenimiento" },
    { value: "world", label: "Globales" },
    { value: "health", label: "Salud" },
    { value: "science", label: "Ciencia" },
    { value: "sports", label: "Deportes" },
    { value: "technology", label: "Tecnología" },
  ];

  // Lista de países disponibles
  const paises = [
    { value: "de", label: "Alemania" },
    { value: "ar", label: "Argentina" },
    { value: "br", label: "Brasil" },
    { value: "cl", label: "Chile" },
    { value: "us", label: "Estados Unidos" },
    { value: "es", label: "España" },
    { value: "mx", label: "México" },
    { value: "jp", label: "Japón" },
  ];

  const consultarAPI = async () => {
    try {
      const url = `https://newsdata.io/api/1/news?apikey=pub_24226bea9b87e0d87603664a9762b89a71aa4&category=${categoria}&country=${pais}`;
      const respuesta = await fetch(url);
      const dato = await respuesta.json();
      setNoticias(dato);
      setMostrarNoticias(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    consultarAPI();
  };

  return (
    <>
      <Container className="text-center">
        <Form className="row" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="tarea">
            <Form.Label className="my-3">Seleccione su país</Form.Label>
            <Form.Select onChange={(e) => setPais(e.target.value)} value={pais}>
              <option value="">Seleccionar país</option>
              {paises.map((pais) => (
                <option key={pais.value} value={pais.value}>
                  {pais.label}
                </option>
              ))}
            </Form.Select>
            <Form.Label className="my-3">Ingrese una categoría de noticias:</Form.Label>
            <Form.Select onChange={(e) => setCategoria(e.target.value)} value={categoria}>
              <option>Elige qué tipo de noticia te interesa</option>
              {categorias.map((categoria) => (
                <option key={categoria.value} value={categoria.value}>
                  {categoria.label}
                </option>
              ))}
            </Form.Select>
            <Container className="my-3 text-center">
              <Button variant="success" type="submit">
                Buscar
              </Button>
            </Container>
          </Form.Group>
        </Form>
      </Container>
      <Container className="row">
        {mostrarNoticias && <ListaNoticias noticias={noticias.results} />}
      </Container>
    </>
  );
};

export default Formulario;
