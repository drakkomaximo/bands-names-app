import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import BandAdd from './components/bandAdd';
import BandList from './components/banList';

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket'],
    autoConnect: true,
    forceNew: true,
  });
  return socket
}

function App() {

  const [socket] = useState(connectSocketServer())
  const [online, setOnline] = useState(false)
  const [bandsList, setBandsList] = useState([])

  useEffect(() => {
    setOnline(socket.connected)
  }, [socket])

  useEffect(() => {
    socket?.on('connect', () => {
      setOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket?.on('disconnect', () => {
      setOnline(false)
    })
  }, [socket])

  useEffect(() => {
    socket?.on('current-band-list', (bands) => {
      setBandsList(bands)
    })
  }, [socket])

  const vote = (id) => {
    socket.emit('vote-band', id)
  }
  const deleteBand = (id) => {
    socket.emit('delete-band', id)
  }
  const changeBandName = ( id, name ) => {
    socket.emit('change-band-name', {
      id, name
    })
  }
  const addBand = ( bandName ) => {
    socket.emit('add-new-band', {
      name: bandName
    })
  }

  return (
    <div className='container'>

      <div className='alert'>
        <p>
          Service Status:
          {
            online === true ? (
              <span className='text-success'> Online </span>
            ) : (
                <span className='text-danger'> Offline </span>
              )
          }
        </p>
      </div>
      <h1>BandNames</h1>
      <hr />

      <div className='row'>
        <div className='col-8'>
          {
            online ? 
            bandsList.length > 0
              ? <BandList 
                data={bandsList} 
                vote={vote} 
                deleteBand={deleteBand} 
                changeBandName={changeBandName}
                />
              : <h4> No hay bandas </h4>
            : <h4> Socket desconectado </h4>
          }
        </div>
        <div className='col-4'>
          <BandAdd addBand={addBand}/>
        </div>

      </div>
    </div>


  );
}

export default App;
