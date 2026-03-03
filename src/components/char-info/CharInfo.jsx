import React, { Component, Fragment } from 'react'
import marverService from "../../services/service";
import Loader from '../loader/loader';
import Error from '../error/Error';
import Skeleton from '../skeleton/Skeleton';
import "./charInfo.scss";

export default class CharInfo extends Component {
  state = {
    char: {},
    isLoading: true,
    isRequestLoading: false,
    isError: false
  }

  marverService = new marverService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  

  componentDidCatch(err, info) {
    console.log(err, info);
    this.setState({isLoading: false, isError: true});
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.setState({ isLoading: true, isError: false });
    this.marverService.getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  onCharLoaded = (char) => {
    this.setState({ char, isLoading: false, isError: false });
  }

  onError = () => {
    this.setState({ isLoading: false, isError: true });
  }


  render() {
    const { char, isLoading, isError } = this.state;
    return (
      <div className="char__info">
        {char || isLoading || isError ? null : <Skeleton />}
        {isError ? <Error /> : null}
        {isLoading ? <Loader /> : null}
        {!(isLoading || isError || !char) ? <View char={char} /> : null}
      </div>
    );
  }
}

const View = ({ char }) => {
  return (
    <Fragment>
      <div className="char__basics">
        <img src={char.thumbnail} alt={char.name} />
        <div>
          <div className="char__info-name">{char.name}</div>
          <div className="char__btns">
            <a
              href={char.homepage}
              className="btn btn__main"
              rel="noreferrer"
              target="_blank"
            >
              <div className="inner">homepage</div>
            </a>
            <a
              href={char.wiki}
              className="btn btn__secondary"
              rel="noreferrer"
              target="_blank"
            >
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {char.description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {char.comics.map((comic => {
          return (
            <li className="char__comics-item" key={comic.name}>
              {comic}
            </li>
          )
        }))}
      </ul>
    </Fragment>
  )
}