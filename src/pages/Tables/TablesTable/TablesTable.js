import React, { Component } from "react";
import { Segment, Input, Table, Loader } from "semantic-ui-react";
import { db, firebase } from "../../../config/firebase";
import TablesTableRow from "./TablesTableRow";
import _ from "lodash";

class TablesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      diplayedTableDocs: this.props.tableDocs,
      direction: null
    };
  }

  componentDidMount() {}

  handleSort = clickedColumn => () => {
    const { column, diplayedTableDocs, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        diplayedTableDocs: _.sortBy(diplayedTableDocs, function(o) {
          return o.data()[clickedColumn];
        }),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      diplayedTableDocs: diplayedTableDocs.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  handleSearch = event => {
    const searchTerm = event.target.value;
    const { diplayedTableDocs } = this.state;
    const { tableDocs } = this.props;

    const filtered = _.filter(tableDocs, function(o) {
      const id = o.id;
      const { name, capacity } = o.data();
      const searchString = id + name;
      return searchString.toLowerCase().includes(searchTerm.toLowerCase());
    });

    this.setState({
      diplayedTableDocs: filtered
    });

    if (searchTerm === "") {
      this.setState({ diplayedTableDocs: this.props.tableDocs });
    }
  };

  render() {
    const { column, direction, diplayedTableDocs } = this.state;
    const { onDataChange } = this.props;

    return (
      <React.Fragment>
        <Segment attached="top" color="blue" inverted>
          <Input
            size="small"
            icon="search"
            placeholder="Suchen..."
            onChange={this.handleSearch}
          />
        </Segment>
        <Table sortable celled fixed striped attached>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "id" ? direction : null}
                onClick={this.handleSort("id")}
              >
                ID
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={column === "name" ? direction : null}
                onClick={this.handleSort("name")}
              >
                Name
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={column === "capacity" ? direction : null}
                onClick={this.handleSort("capacity")}
              >
                Capacity
              </Table.HeaderCell>

              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {diplayedTableDocs.map(doc => (
              <TablesTableRow
                tableDoc={doc}
                key={doc.id}
                onDataChange={onDataChange}
              />
            ))}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

export default TablesTable;
