import React, { useState, useEffect } from 'react'

const Base = () => {

    const [nombre, setnombe] = useState('James');
    useEffect( () => {
        setTimeout( () =>{
            setnombe('Andres')
        }, 2000);
    });

    return (
        <div>
            <h1>Pagina de Base Ruta / { nombre }</h1>
        </div>
    )
}

export default Base;
