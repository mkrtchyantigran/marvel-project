import { Component, createRef } from 'react'
import marvelService from '../../services/service';
import "./charList.scss";
import Loader from '../loader/loader';
import Error from '../error/Error';
export default class CharList extends Component {
  RefForSelected = createRef();

  state = {
    charList: [],
    isLoading: true,
    isRequestLoading: false,
    isError: false,
    isNoMoreChars: false,
    offset: 0,
    isScrolled: false
  }





  marvelService = new marvelService();

  componentDidMount() {
    this.onRequest();
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.offset !== this.state.offset) {
      this.setState({
        isNoMoreChars: this.state.offset > this.state.charList.length
      })
    }
  }

  onScroll = () => {
    const { isRequestLoading, isNoMoreChars } = this.state;
    if (isRequestLoading || isNoMoreChars) return;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 100) { // -100 для раннего срабатывания
      this.setState({ isRequestLoading: true }); // используй isRequestLoading вместо isScrolled
      this.onRequest(this.state.offset);
    }
  }

  onRequest(offset = 0) {
    this.onCharListLoading();
    this.marvelService.getCharactersAll(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  }

  onCharListLoading = () => {
    this.setState({ isRequestLoading: true });
  }


  onCharListLoaded = (newCharList) => {
    this.setState(({ offset, charList }) => {
      const existingIds = new Set(charList.map(char => char.id));
      const filteredNewChars = newCharList.filter(char => !existingIds.has(char.id));
      return {
        charList: [...charList, ...filteredNewChars],
        isLoading: false,
        isRequestLoading: false,
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
          key={item.id}
          onClick={() => {
            this.props.onCharSelected(item.id);
            this.RefForSelected.current = item.id;
          }}
          className={`char__item ${this.RefForSelected.current === item.id ? "char__item_selected" : ""}`}
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
          isNoMoreChars ? null :
            <div className="inner">
              {this.state.isScrolled ? <Loader size={60} /> : null}
            </div>
        }
      </div>
    );
  }
}
