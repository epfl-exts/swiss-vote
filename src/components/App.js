import React, { Component } from "react";
import Selector from "./Selector";
import { Map, ResultsTable } from "./Map";
import "../css/App.css";

function getToken(encodedData) {
  return fetch(
    "https://api.srgssr.ch/oauth/v1/accesstoken?grant_type=client_credentials",
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + encodedData
      }
    }
  );
}

function getAllVoteDescriptions(accessToken) {
  fetch("https://api.srgssr.ch/polis-api/v2/cases?lang=en", {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken
    }
  });
}

// function getVoteResults() {}

// function getData() {
//   fetch("./swiss-vote-results-sample.json")
//     .then(function(response) {
//       return response.json();
//     })
//     .then(results => this.setState({ results }))
//     .catch(error => console.error("FetchError:", error));
// }

class App extends Component {
  state = {
    selection: "",
    results: {}
  };

  componentDidMount() {
    const encodedData = window.btoa(
      "hHzFcM9fbZ0tmOjKhpVDEfHLPMWvwcmd:S17Kvc4GceKNCxdH"
    ); // aEh6RmNNOWZiWjB0bU9qS2hwVkRFZkhMUE1XdndjbWQ6UzE3S3ZjNEdjZUtOQ3hkSA==

    const accessToken = getToken(encodedData)
      .then(response => response.json())
      .then(json => json.access_token);

    accessToken.then(response =>
      fetch("https://api.srgssr.ch/polis-api/v2/cases?lang=en", {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + response
        }
      })
    );

    // console.log(allVotes);

    // allVotes.then(response => console.log(response)); // parses response to JSON

    // console.log(allVotes);

    // allVotes
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(results => this.setState({ results }));
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

// const payLoad = {
//   refresh_token_expires_in: "0",
//   api_product_list: "[SRG-SSR-PUBLIC-API-V2]",
//   api_product_list_json: ["SRG-SSR-PUBLIC-API-V2"],
//   organization_name: "srgssr",
//   "developer.email": "harry.anderson@epfl.ch",
//   token_type: "BearerToken",
//   issued_at: "1548337301707",
//   client_id: "hHzFcM9fbZ0tmOjKhpVDEfHLPMWvwcmd",
//   access_token: "rTqJQWrxYjaF7mVdmHAnCTdTGCF4",
//   application_name: "48519448-9e74-4f19-a865-0275b587e00d",
//   scope: "",
//   expires_in: "2591999",
//   refresh_count: "0",
//   status: "approved"
// };

// fetch("https://api.srgssr.ch/polis-api/v2/cases?lang=en&listAllCases=tru", {
//   method: "GET", // *GET, POST, PUT, DELETE, etc.
//   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//   headers: {
//     Authorization: "Bearer rTqJQWrxYjaF7mVdmHAnCTdTGCF4",
//     Accept: "application/json"
//   }
// })
//   .then(response => response.json())
//   .then(json => console.log(json));
