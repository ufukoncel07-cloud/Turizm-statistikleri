import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Antalya from './pages/Antalya';
import Turkey from './pages/Turkey';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Antalya />} />
        <Route path="turkey" element={<Turkey />} />
      </Route>
    </Routes>
  );
}

export default App;
