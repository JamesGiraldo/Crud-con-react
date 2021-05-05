import React, { useState } from 'react';
import uniqid from 'uniqid';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Listadonombres = () => {

    const [nombre, setnombre] = useState('');
    const [listanombre, setlistanombre] = useState( [] );
    const [modoedicion, setmodoedicion] = useState( false );
    const [id, setid] = useState('');
    const [error, seterror] = useState(null);

    const MySwal = withReactContent(Swal)


    const addnombre = ( e ) => {
        e.preventDefault();

        /** validar campo */
        if ( !nombre.trim() ){
            seterror('El campo debe ser obligatorio')
            return
        }
        const nuevonombre = {
            id: uniqid(),
            name: nombre
        }
        setlistanombre([...listanombre, nuevonombre])
        setnombre('')
        MySwal.fire({
            didOpen: () => {
                MySwal.clickConfirm()
            }
        }).then(() => {
         return MySwal.fire(<p>Registo éxitoso</p>)
        })
        seterror(null)
    }
    const deletenombre = ( id ) => {
        const nuevoArray = listanombre.filter( item => item.id !== id )
        setlistanombre(nuevoArray);
        MySwal.fire({
            didOpen: () => {
                MySwal.clickConfirm()
            }
        }).then(() => {
         return MySwal.fire(<p>Registro eliminado</p>)
        })
    }
    const editar = ( item ) => {
        setmodoedicion(true)
        setnombre( item.name )
        setid( item.id )
    }
    const editarNombre = ( e ) => {
        e.preventDefault();
        const NuevoArray = listanombre
        .map(  item => item.id === id ? { id: id, name: nombre } : item )
        setlistanombre(NuevoArray);
        setmodoedicion(false);
        setnombre('')
        MySwal.fire({
            didOpen: () => {
                MySwal.clickConfirm()
            }
        }).then(() => {
         return MySwal.fire(<p>Actualización exitosa</p>)
        })
    }


    return(
        <div className="container-fluid">
            <h2 className="text-center">Aplicación Crud Basico</h2>
            <div className="row mt-5">
                <div className="col-md-6">
                    <h2>
                        Listado de nombres
                    </h2>
                    <ul className="list-group mt-3">
                        {
                            listanombre.map( item =>                                
                                 <li  key={ item.id } className="list-group-item justify-content-between">
                                    { item.name }
                                    <button onClick={ () => { editar( item ) }} className=" float-right btn btn-info">
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                  
                                    <button onClick={ () => { deletenombre( item.id ) }} className="mr-1 float-right btn btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                               </li> 
                            )
                        }
                    </ul>
                </div>
                <div className="col-md-6">
                    <h2>
                        Formulario para añadir nombre 
                    </h2>
                    <form  onSubmit={ modoedicion ? editarNombre : addnombre } className="form-group mt-3">
                        <input 
                            onChange={ (e) => {setnombre(e.target.value)} } 
                            className="form-control mb-2" 
                            type="text" 
                            placeholder="Intruduce el nombre" 
                            value={ nombre }
                        />
                        {
                            error != null  ? (
                                <label className="text-danger">
                                    { error }
                                </label>
                            ) : ( <p></p> )
                        }
                        <input 
                            className="btn btn-info btn-block" 
                            type="submit" 
                            value={ modoedicion ? 'Editar Nombre' : 'Registrar Nombre' }

                        />
                    </form>                    
                </div>
            </div>
        </div>
    )
}

export default Listadonombres;