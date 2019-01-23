import React, { Component } from "react";
import "../css/App.css";

class App extends Component {
  state = {
    selection: "",
    results: []
  };

  componentDidMount() {
    fetch("./swiss-vote-results-sample.json")
      .then(function(response) {
        return response.json();
      })
      .then(results => this.setState({ results }))
      .catch(error => console.error("FetchError:", error));
  }

  render() {
    return <ResultsTable {...this.state.results[0]} />;
  }
}

function ResultsTable(props) {
  return (
    <table>
      {props.description && <caption>{props.description.en}</caption>}
      <thead>
        <tr>
          <th>Canton</th>
          <th>Yes</th>
          <th>No</th>
        </tr>
      </thead>
      <tbody>
        {props.results &&
          props.results.map(result => {
            return (
              <tr key={result.canton}>
                <td>{result.canton}</td>
                <td>{result.yes}</td>
                <td>{result.no}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default App;
export { ResultsTable };
