import { Component } from 'react'
import marvelService from '../../services/service';
import "./charList.scss";
import Loader from '../loader/loader';
import Error from '../error/Error';
export default class CharList extends Component {

  state = {
    charList: [],
    isLoading: true,
    isRequestLoading: false,
    isError: false,
    isNoMoreChars: false,
    offset: 0
  }

  marvelService = new marvelService();

  componentDidMount() {
    this.onRequest();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.offset !== this.state.offset) {
      this.setState({
        isNoMoreChars: this.state.offset > this.state.charList.length
      })
    }
  }

  onRequest(offset = 0) {
    this.marvelService.getCharactersAll(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  }

  onCharListLoading = () => {
    this.setState({ isRequestLoading: true });
  }


  onCharListLoaded = (newCharList) => {
    this.setState(({ offset, charList }) => {
      return {
        charList: [...charList, ...newCharList],
        isLoading: false,
        isError: false,
        offset: offset + 6
      }
    });
  }

  onError = () => {
    this.setState({ isError: true, isLoading: false });
  }

  renderItems(arr) {
    const items = arr.map((item) => {
      return (
        <li
          onClick={() => this.props.onCharSelected(item.id)}
          className="char__item"
          key={item.id}
        >
          <img src={item.thumbnail ? item.thumbnail : "Error"} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      )
    })
    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charList, isRequestLoading, isLoading, isError, isNoMoreChars } = this.state;

    const items = this.renderItems(charList);

    return (
      <div className="char__list">

        {isError ? <Error /> : null}
        {isLoading || isRequestLoading ? <Loader /> : null}
        {!(isLoading || isRequestLoading || isError) ? items : null}

        {
          isNoMoreChars ? null : <button
              onClick={() => this.onRequest(this.state.offset)}
              className='btn btn__main btn__long'
              disabled={this.state.isRequestLoading}
            >
              <div className="inner">{this.state.isRequestLoading ? "loading..." : "load more"}</div>
            </button>
        }
      </div>
    );
  }
}
