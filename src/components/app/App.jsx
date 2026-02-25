import { Component } from "react";
import AppHeader from "../app-header/AppHeader";
export default class App extends Component {
    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <div className="char__content">
                        
                    </div>
                </main>
                
            </div>
        )
    }
}