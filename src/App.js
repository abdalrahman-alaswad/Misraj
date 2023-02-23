import './App.css';
import { Container, Footer, Header } from './components';
import TableMisraj from './components/Table/TableMisraj';


function App() {
  return (<>
    <Header />
    <Container>
      <TableMisraj />
    </Container>
    <Footer />

  </>
  );
}

export default App;
