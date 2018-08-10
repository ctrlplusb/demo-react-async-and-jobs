import React from 'react'
import styled, { keyframes } from 'react-emotion'

import CatPicture from '../CatPicture'
import logo from './react.svg'

export default function Home() {
  return (
    <div>
      <Header>
        <Logo src={logo} alt="logo" />
        <h1>react-async-component + react-jobs</h1>
      </Header>
      <Intro>
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
        <p>
          You can view the source for this demo{' '}
          <a href="https://github.com/ctrlplusb/demo-react-async-and-jobs">
            here
          </a>
          .
        </p>
      </Intro>
    </div>
  )
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Header = styled('div')`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
  text-align: center;
`

const Logo = styled('img')`
  animation: ${spin} infinite 20s linear;
  height: 80px;
`

const Intro = styled('div')`
  font-size: large;
  margin: 0 auto;
  max-width: 600px;
  padding: 25px 0;
`
