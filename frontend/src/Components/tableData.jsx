import React, { Component } from "react";
import "./styles/table.css";

class Table extends Component {
  renderCell(row, col) {
    if (col === "index") {
      const val = row[col] + 1;
      return <td>{val}</td>;
    }
    const val = row[col] || "-";
    return <td>{val}</td>;
  }

  renderTableData() {
    const { rows = [], columns = [] } = this.props;

    const cols = ["index"].concat(columns.map((c) => c.value));
    return rows.map((row) => {
      const { id } = row;
      return <tr key={id}>{cols.map((col) => this.renderCell(row, col))}</tr>;
    });
  }

  renderTableHeader() {
    const { columns = [] } = this.props;
    return [{ name: "index" }].concat(columns).map(({ name }, index) => {
      return <th key={index}>{name.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div>
        <h1 id="title">Table</h1>
        <table id="sampleData">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
