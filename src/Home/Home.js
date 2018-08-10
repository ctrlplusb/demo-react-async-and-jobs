import React from 'react'

import './Home.css'
import CatPicture from '../CatPicture'
import logo from './react.svg'

export default function Home() {
  return (
    <div className="Home">
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h1>react-async-component + react-jobs</h1>
      </div>
      <div className="Home-intro">
        <p>
          This component is loaded asynchronously. It renders on both the client
          and the server.
        </p>
        <p>
          It additionally has a child component that asynchronously loads a
          picture of a cat via the react-jobs package. This child component will
          also be resolved on the server.
        </p>
        <p>
          The asynchrnous loading of the component and the data are both
          supported via the react-async-bootstrapper library.
        </p>
        <p>
          <CatPicture />
        </p>
      </div>
    </div>
  )
}
