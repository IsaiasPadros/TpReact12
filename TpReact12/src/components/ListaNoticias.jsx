import { Container } from "react-bootstrap";
import Noticia from "./Noticia";

const ListaNoticias = ({ noticias }) => {
  return (
    <Container className="row justify-content-center">
      {noticias.map((noticia) => (
        <Noticia
          key={noticia.id}
          noticia={noticia}
          className="col-12 col-md-4 mx-4"
        />
      ))}
    </Container>
  );
};

export default ListaNoticias;