import { Component } from "react";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import marverService from "../../services/service";
import Loader from "../loader/loader";
import Error from "../error/Error";

export default class RandomChar extends Component {

    state = {
        char: {},
        isLoading: true,
        isError: false
    };

    
    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 6000000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    marverService = new marverService();
    
    onCharLoaded = (char) => {
        this.setState({ char, isLoading: false, isError: false});
    }

    onError = () => {
        this.setState({ isLoading: false, isError: true});
    }

    updateChar = () => {
        this.setState({ isLoading: true, isError: false});
        this.marverService.getCharacter(Math.floor(Math.random() * (21 - 1) + 1))
        .then(this.onCharLoaded)
        .catch(this.onError);
    }

    render() {
        const {char, isLoading, isError} = this.state;
        return (
            <div className="randomchar">
                {isError ? <Error /> : null}
                {isLoading ? <Loader /> : null}
                {!(isLoading || isError) ? <View char={char} /> : null}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                         Random character for today!<br />
                         Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one!
                    </p>
                    <button 
                        className="btn btn__main"
                        onClick={this.updateChar}>
                        <div className="inner">Try It</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={name} className="randomchar__img" />
            <div className="randomchar__info">
                <div className="randomchar__name">{name}</div>
                <p className="randomchar__description">{description}</p>
                <div className="randomchar__btns">
                    <a 
                        href={homepage}
                        className="btn btn__main"
                        rel="noreferrer"
                        target="_blank"
                    >
                        <div className="inner">homepage</div>
                    </a>
                    <a 
                    href={wiki} 
                    className="btn btn__main"
                    rel="noreferrer"
                    target="_blank"
                    >
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}