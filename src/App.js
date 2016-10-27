import React, { Component } from 'react'
import logo from './logo2.svg'
import izipost from './izi-post'
import css from './App.css'
import { Grid, Col, Row } from 'react-flexbox-grid/lib/index'
import { Button } from 'react-toolbox/lib/button'

const API_URL = 'https://aura.stavis.me/v1/compute'

const makeTrainable = (input, output) => (
  {
    input,
    output 
  }
)

const initialState = () => (
  {
  "layers": {
    "hidden": 1
  },
  "computables": [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1]
  ],
  "trainables": [
    makeTrainable([0, 0], [0]),
    makeTrainable([1, 0], [0]),
    makeTrainable([0, 1], [0]),
    makeTrainable([1, 1], [1]),
  ],
  "iterations": 10000,
  "precision": 0.0001
  }
)

class AppInterface extends Component { 
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={3}>
            <h2>Layers:</h2> 
            <ul>
              <li>hidden: {this.props.neuralNetwork.layers.hidden}</li>
            </ul>
          </Col>
          <Col xs={3}>
            <h2>Computables:</h2> 
            <ul>
              {this.props.neuralNetwork.computables.map((computable, i) => {
                return (
                  <li key={i}> {i}: {computable}</li>
                )
              })}
            </ul>
          </Col>
          <Col xs={3}>
            <h2>Trainables:</h2> 
            <ul>
              {this.props.neuralNetwork.trainables.map((trainable, i) => {
                return (
                  <li key={i}> {i}:
                    <ul>
                      <li>input: {trainable.input}</li>
                      <li>output: {trainable.output}</li>
                    </ul>
                  </li>
                )
              })}
            </ul>
          </Col>
          <Col xs={3}>
            <h2>Config:</h2>
            <ul>
              <li> iterations: {this.props.neuralNetwork.iterations} </li>
              <li> precision: {this.props.neuralNetwork.precision} </li>
            </ul>
            <Button 
              label="Let's start!" 
              onClick={this.props.onSend} 
              raised primary 
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = Object.assign({}, initialState(), {result: null})
  }
  handleResult(result) {
    console.log(result)
  }
  sendNetwork() {
    izipost(API_URL, initialState()) 
    .then(this.handleResult)
  }
  render() {
    return (
      <div className={css.App}>
        <div className={css.AppHeader}>
          <img src={logo} className={css.AppLogo} alt="logo" />
          <h2>Welcome to Pineapple</h2>
        </div>
        <AppInterface neuralNetwork={this.state} onSend={this.sendNetwork.bind(this)}/>
      </div>
    )
  }
}

export default App
