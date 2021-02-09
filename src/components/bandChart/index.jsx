import React, { useEffect, useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import { Chart } from "chart.js";
/* import PropTypes from 'prop-types' */

const BandChart = () => {

    const { socket } = useContext(SocketContext);

    function generarNumero(numero){
        return (Math.random()*numero).toFixed(0);
    }
    
    function colorRGB(){
        var coolor = "("+generarNumero(255)+"," + generarNumero(255) + "," + generarNumero(255) +")";
        return "rgb" + coolor;
    }

    useEffect(() => {
      socket?.on("current-band-list", (bands) => {
        createGraph( bands )
      });
    }, [socket]);

  const createGraph = ( bands = [] ) =>{
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "horizontalBar",
      data: {
        labels: bands.map( band => band.name ),
        datasets: [
          {
            label: "# of Votes",
            data: bands.map( band => band.vote ),
            backgroundColor: bands.map(() => colorRGB()),
            borderColor: bands.map(() => colorRGB()),
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    });
  }

  return (
    <>
      <canvas id="myChart"></canvas>
    </>
  );
};

/* BandChart.propTypes = {

} */

export default BandChart;
