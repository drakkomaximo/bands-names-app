import React, { useState } from "react";
/* import PropTypes from 'prop-types' */

const BandAdd = ({ addBand }) => {
  const [valor, setValor] = useState("");
  const [nullValor, setNullValor] = useState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (valor.trim().length > 0) {
      addBand(valor);
      setNullValor(false);
    } else {
      setNullValor(true);
    }
    setValor("");
  };

  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Nuevo nombre de banda"
          onChange={(e) => {
            setValor(e.target.value);
          }}
          value={valor}
        />
        { nullValor && <h5 className='text-danger'>No puede enviar información vacia</h5>}
      </form>
    </>
  );
};

/* BandAdd.propTypes = {

} */

export default BandAdd;
