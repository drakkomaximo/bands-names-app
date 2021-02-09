import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
/* import PropTypes from 'prop-types' */

const BandList = ({setBandsLength}) => {
  
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket?.on("current-band-list", (bands) => {
      if(bands.length > 0){
        setBands(bands);
        setBandsLength(true)
      }else{
        setBands([])
        setBandsLength(false)

      }
    });
    return ()=> socket.off("current-band-list");
  }, [socket]);

  const changeName = (e, bandId) => {
    const newName = e.target.value;
    setBands((bands) =>
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

  const onPerdioFoco = (id, name) => {
    socket.emit("change-band-name", { id, name });
  };

  const vote = (id) => {
    socket.emit('vote-band', id)
  }

  const deleteBand = (id) => {
    socket.emit('delete-band', id)
  }

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
