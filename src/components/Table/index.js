import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, CardColumns, Card } from "react-bootstrap";
import { sortBy } from "lodash";
import { Sort, CustomButton } from '../Button'

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, "title"),
  AUTHOR: (list) => sortBy(list, "author"),
  COMMENTS: (list) => sortBy(list, "num_comments").reverse(),
  POINTS: (list) => sortBy(list, "points").reverse(),
};

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: "NONE",
      isSortReverse: false,
    };
    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const { list, removeItem } = this.props;
    const { sortKey, isSortReverse } = this.state;
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <Container>
        <div>
          <div className="text-center">
            
            <Sort
              sortKey={"TITLE"}
              onSort={this.onSort}
              className={"sort-btn"}
              activeSoftKey={sortKey}
            >
              Title
            </Sort>
            <Sort
              sortKey={"AUTHOR"}
              onSort={this.onSort}
              className={"sort-btn"}
              activeSoftKey={sortKey}
            >
              Author
            </Sort>
            <Sort
              sortKey={"COMMENTS"}
              onSort={this.onSort}
              className={"sort-btn"}
              activeSoftKey={sortKey}
            >
              Comments
            </Sort>
            <Sort
              sortKey={"POINTS"}
              onSort={this.onSort}
              className={"sort-btn"}
              activeSoftKey={sortKey}
            >
              Points
            </Sort>
            <hr />
          </div>
          <CardColumns>
            {reverseSortedList.map((item) => (
              <Card key={item.objectID}>
                {/* <Card.Img variant="top" src="https://holder.js/100px160" /> */}
                <Card.Body>
                  <Card.Title>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                  </Card.Title>
                  <Card.Text>by {item.author}</Card.Text>
                  <CustomButton
                    className="remove-btn"
                    variant="danger"
                    size="sm"
                    type="button"
                    onClick={() => removeItem(item.objectID)}
                  >
                    Remove
                  </CustomButton>
                </Card.Body>
                <Card.Footer className="text-right">
                  <div>
                    <small className="text-muted">
                      <span
                        className="material-icons"
                        style={{
                          verticalAlign: "middle",
                          lineHeight: "0",
                          fontSize: "18px",
                        }}
                      >
                        comment
                      </span>
                      <span style={{ marginRight: "10px" }}>
                        {item.num_comments}
                      </span>
                      <span
                        className="material-icons"
                        style={{
                          verticalAlign: "middle",
                          lineHeight: "0",
                          fontSize: "18px",
                        }}
                      >
                        thumb_up_alt
                      </span>
                      <span style={{ lineHeight: "1" }}>{item.points}</span>
                    </small>
                  </div>
                </Card.Footer>
              </Card>
            ))}
          </CardColumns>
        </div>
      </Container>
    );
  }
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default Table;
