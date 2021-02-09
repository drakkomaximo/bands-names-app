import React, { useEffect, useState } from "react";
/* import PropTypes from 'prop-types' */

const BandList = ({ data, vote, deleteBand, changeBandName }) => {
  const [bands, setbands] = useState([]);

  useEffect(() => {
    setbands(data);
  }, [data]);

  const changeName = (e, bandId) => {
    const newName = e.target.value;
    setbands((bands) =>
      bands.map((band) => {
        if (band.id === bandId) {
          return {
            id: band.id,
            name: newName,
            vote: band.vote,
          };
        } else {
          return band;
        }
      })
    );
  };

  const onPerdioFoco = (bandId, bandName) => {
    changeBandName( bandId, bandName )
  };

  const crearRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => {
              vote(band.id);
            }}
          >
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={band.name}
            onChange={(e) => {
              changeName(e, band.id);
            }}
            onBlur={() => {
              onPerdioFoco(band.id, band.name);
            }}
          />
        </td>
        <td>
          <h3> {band.vote} </h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteBand(band.id);
            }}
          >
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{bands.length > 0 && crearRows()}</tbody>
      </table>
    </>
  );
};

/* BandList.propTypes = {

} */

export default BandList;
