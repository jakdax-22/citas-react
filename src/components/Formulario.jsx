import { useState,useEffect } from 'react'
import Error from './Error';

const Formulario = ({ paciente,setPaciente,pacient,setPacient }) => {
  const [nombre,setNombre] = useState('');
  const [propietario,setPropietario] = useState('');
  const [email,setEmail] = useState('');
  const [fecha,setFecha] = useState('');
  const [sintomas,setSintomas] = useState('');

  const [error,setError] = useState (false);

  useEffect(() => {
    if(Object.keys(pacient).length>0){
      setNombre(pacient.nombre);
      setPropietario(pacient.propietario);
      setEmail(pacient.email);
      setFecha(pacient.fecha);
      setSintomas(pacient.sintomas);
    }
    else {
      console.log ("No hay nada");
    };
  },[pacient])
  


  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }

  const handelSubmit = (event) => {
    event.preventDefault();

    //Validación del Formulario
    if ([nombre,propietario,email,fecha,sintomas].includes('')){
      console.log ("Hay almenos un campo vacío");
      setError(true)
      return;
    }
    setError(false);

      //Objeto de Paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    }

    if (pacient.id){
      // Editando el Registro
      objetoPaciente.id = pacient.id;
      const pacientesActualizados = paciente.map(pacienteState => 
        pacienteState.id === pacient.id ? objetoPaciente : pacienteState
      )
      setPaciente(pacientesActualizados);
      setPacient({});

    }
    else {
      //Nuevo registro
      objetoPaciente.id = generarId();
      setPaciente([...paciente, objetoPaciente]);
    }

    //Reiniciar formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }


  
  

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl tex-center">Seguimiento pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
      Añade Pacientes y {''}
      <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form 
        className="bg-white shadow-md rounded-lg py-10 px-5"
        onSubmit={handelSubmit}
      >
        {error && (<Error>Todos los campos son obligatorios</Error> )}
        <div className="mb-5">
          <label htmlFor="mascota"className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={ (event) => setNombre(event.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario"className="block text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={ (event) => setPropietario(event.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email"className="block text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={ (event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta"className="block text-gray-700 uppercase font-bold">
            Alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={ (event) => setFecha(event.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario"className="block text-gray-700 uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los síntomas"
            value={sintomas}
            onChange={ (event) => setSintomas(event.target.value)}
          
          />
        </div>

        <input 
        type="submit"
        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        value={pacient.id ? 'Editar paciente' : 'Agregar paciente'}
        />
      </form>
    </div>

  )
}

export default Formulario
