import { useState,useEffect } from 'react';
import Header from "./components/header";
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";
function App() {

    const [paciente, setPaciente] = useState([]);
    const [pacient,setPacient] = useState ({});

    useEffect(() => {
      const obtenerLS = () => {
        const pacientesLS = JSON.parse(localStorage.getItem('paciente')) ?? [];
        setPaciente (pacientesLS);
      }

      obtenerLS();
    },[])

    useEffect(() => {
      localStorage.setItem('paciente', JSON.stringify(paciente));
    }, [paciente]);

    const eliminarPaciente = (id) => {
      const pacientesActualizados = paciente.filter(pacient => pacient.id !==id);
        setPaciente(pacientesActualizados)
    }

  return (
    <div className="container mx-auto mt-20">
      <Header/>
      <div className="mt-12 md:flex">
        <Formulario
          paciente={paciente}
          setPaciente={setPaciente}
          pacient={pacient}
          setPacient={setPacient}
        />
        <ListadoPacientes
          paciente={paciente}
          setPacient = {setPacient}
          eliminarPaciente = {eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
