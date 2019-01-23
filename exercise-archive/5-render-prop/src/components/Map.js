import React, { Component } from "react";
import { drawCanvas } from "../helpers";

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

class Map extends Component {
  componentDidMount() {
    this.ctx = this.refs.canvas.getContext("2d");
    drawCanvas(this.ctx, this.props.results);
  }

  componentDidUpdate() {
    this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
    drawCanvas(this.ctx, this.props.results);
  }

  render() {
    const { description, results } = this.props;
    return (
      <canvas height={538} width={840} ref="canvas">
        {/* cloneElement is being used because we wish to merge
            the description and results props with this.props.children */}
        {React.cloneElement(this.props.children, { description, results })}
      </canvas>
    );
  }
}

export { Map, ResultsTable };
