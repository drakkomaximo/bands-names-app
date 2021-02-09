import React, { useContext, useState } from "react";
import BandAdd from "../../components/bandAdd";
import BandList from "../../components/banList";
import { SocketContext } from "../../context/SocketContext";

function HomePage() {
  const [bandsLength, setBandsLength] = useState(true);
  const { online } = useContext(SocketContext);
  return (
    <div className="container">
      <div className="alert">
        <p>
          Service Status:
          {online === true ? (
            <span className="text-success"> Online </span>
          ) : (
            <span className="text-danger"> Offline </span>
          )}
        </p>
      </div>
      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          {online ? (
            bandsLength ? (
              <BandList setBandsLength={setBandsLength} />
            ) : (
              <h4> No hay bandas </h4>
            )
          ) : (
            <h4> Socket desconectado </h4>
          )}
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
