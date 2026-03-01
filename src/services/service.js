export default class marvelService {
    #API_URL = "https://marvel-server-zeta.vercel.app";
    #API_KEY = "d4eecb0c66dedbfae4eab45d312fc1df";

    getComicsJson = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        
        return await res.json();
    }

    getCharactersAll = async () => {
        const res = this.getComicsJson(`${this.#API_URL}/characters?apikey=${this.#API_KEY}`);
        return res.data.results.map(this.transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getComicsJson(`${this.#API_URL}/characters/${id}/?apikey=${this.#API_KEY}`);
        return this.transformCharacter(res.data.results[0]);
    }

    transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }

    }

}
