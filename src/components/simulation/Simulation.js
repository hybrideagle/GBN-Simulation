import styles from './Simulation.css';
import anime from './anime.min.js'
import React, { Component } from 'react';

export default class Simulation extends Component {

  render() {
    return (
      <div className={ styles.root }>
        <svg className={ styles.svg + " sim"}></svg>
      </div>
    );
  }

};
