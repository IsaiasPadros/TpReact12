import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import ListaNoticias from "./ListaNoticias";

const Formulario = () => {
  const [formData, setFormData] = useState({
    categoria: "",
    pais: "",
  });
  const [noticias, setNoticias] = useState([]);
  const [mostrarNoticias, setMostrarNoticias] = useState(false);
  const [paises, setPaises] = useState([]);
  const [categorias, setCategorias] = useState([]);



  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const consultarAPI = async () => {
    try {
      const { categoria, pais } = formData;
      const url = `https://newsdata.io/api/1/news?apikey=pub_27255eeb9aed0b36610336db322bf162164af&category=${categoria}&country=${pais}`;

      const response = await fetch(url);
      const data = await response.json();
      setNoticias(data.results);
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
    <Container className="text-center">
      <Form className="row" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="tarea">
          <Form.Label className="my-3">Seleccione su país</Form.Label>
          <Form.Select
            name="pais"
            onChange={handleChange}
            value={formData.pais}
          >
            <option value="">Seleccionar país</option>
            {paises.map((pais) => (
              <option key={pais.codigo} value={pais.codigo}>
                {pais.nombre}
              </option>
            ))}
          </Form.Select>
          <Form.Label className="my-3">
            Ingrese una categoría de noticias:
          </Form.Label>
          <Form.Select
            name="categoria"
            onChange={handleChange}
            value={formData.categoria}
          >
            <option>Elige qué tipo de noticia te interesa</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nombre}>
                {categoria.nombre}
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
      <Container className="row">
        {mostrarNoticias && <ListaNoticias noticias={noticias} />}
      </Container>
    </Container>
  );
};

export default Formulario;