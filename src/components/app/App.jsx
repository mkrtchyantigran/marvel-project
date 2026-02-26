import { Component } from 'react'

import AppHeader from "../app-header/AppHeader";
import RandomChar from "../random-char/RandomChar";
import CharList from "../char-list/CharList";
import CharInfo from "../char-info/CharInfo";

import decoration from "../../resources/img/decoration.png";

export default class App extends Component{
  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />
          <div className="char__content">
            <CharList />
            <CharInfo />
          </div>
          <img src={decoration} alt="decoration" className="bg-decoration" />
        </main>
      </div>
    );
  }
}