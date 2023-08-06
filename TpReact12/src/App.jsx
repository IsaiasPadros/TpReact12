
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import Formulario from "./components/Formulario";
import ListaNoticias from "./components/ListaNoticias";
import Noticia from "./components/Noticia";

function App() {
  return (
    <>
      <Container>
        <h1 className='my-5 text-center'>Portal de Noticias</h1>
        <Formulario />
        <ListaNoticias noticias={[]} />
      </Container>
    </>
  );
}

export default App;
