import React, { Component } from "react";
import Selector from "./Selector";
import { Map, ResultsTable } from "./Map";
import "../css/App.css";

class App extends Component {
  state = {
    selection: "",
    results: []
  };

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/epfl-exts-react/63181e2beb4f813d9988734e93026b0c/raw/e9c7ef1cea83434f867b69fe8cc73ccdc02ff667/swiss-vote-results-sample.json"
    )
      .then(function(response) {
        return response.json();
      })
      .then(responseJSON => this.setState({ results: responseJSON }))
      .catch(error => console.error("FetchError:", error));
  }

  handleChange = selection => {
    this.setState({ selection });
  };

  render() {
    return (
      <div>
        <Selector {...this.state} onChange={this.handleChange} />
        <figure>
          <Map {...this.state.selection}>
            <ResultsTable />
          </Map>
        </figure>
      </div>
    );
  }
}

export default App;