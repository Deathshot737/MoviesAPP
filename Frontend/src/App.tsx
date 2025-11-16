import { useContext } from 'react';
import './App.css'
import { MovieModal } from './components/MovieModal/MovieModal'
import { isOpenContext } from './context/isOpenContext';

function App() {
  const isOpencontext = useContext(isOpenContext);
  if (!isOpencontext) throw new Error('ToggleButton debe estar dentro de IsOpenProvider');
  const { isOpen, handleOpen } = isOpencontext;
  console.log(isOpen);

  return (
    <>
      <button onClick={() => handleOpen()}>Agregar pelicula</button>
      {isOpen &&
        <MovieModal />
      }
    </>
  )
}

export default App
