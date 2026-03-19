import { Component } from 'react'

import AppHeader from "../app-header/AppHeader";
import RandomChar from "../random-char/RandomChar";
import CharList from "../char-list/CharList";
import CharInfo from "../char-info/CharInfo";

import decoration from "../../resources/img/decoration.png";
import { ErrorBoundary } from '../errorBoundary/ErrorBoundary';
import CharSearch from '../char-search/CharSearch';
export default class App extends Component{
   state = {
      selectedChar: null
    };

  onCharSelected =(id) => {
    this.setState({selectedChar: id});
  }
  
  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />
          <div className="char__content">
            <CharList onCharSelected={this.onCharSelected} />
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedChar}  />
            </ErrorBoundary>
          </div>
          <CharSearch />
          <img src={decoration} alt="decoration" className="bg-decoration" />
        </main>
      </div>
    );
  }
}