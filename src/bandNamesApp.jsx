import React from 'react'
import { SocketProvider } from './context/SocketContext'
import HomePage from './pages/homePages'
/* import PropTypes from 'prop-types' */

const BandNamesApp = ({}) => {
    return (
        <SocketProvider>
            <HomePage/>
        </SocketProvider>
    )
}

/* BandNamesApp.propTypes = {

} */

export default BandNamesApp
