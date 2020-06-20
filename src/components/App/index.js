import React, { Component } from "react";
import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  DEFAULT_HPP,
  BASE_PATH,
  SEARCH_PATH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from "../../constants/index";
import Table from '../Table';
import { CustomButton, Loading } from "../Button";
import Search from '../Search';


const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading ? <Loading /> : <Component {...rest} />;

const updateSetTopStories = (hits, page) => (prevState) => {
  const { results, searchKey } = prevState;
  const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  const updatedHits = [...oldHits, ...hits];
  return {
    results: { ...results, [searchKey]: { hits: updatedHits, page } },
    isLoading: false,
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
    };
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  checkTopStoriesSearchTerm(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setTopStories(result) {
    const { hits, page } = result;

    this.setState(updateSetTopStories(hits, page));
    // const oldHits = (page !== 0) ? this.state.result.hits : []
  }

  fetchTopStories(searchTerm, page) {
    this.setState({ isLoading: true });
    fetch(
      `${BASE_PATH}${SEARCH_PATH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP} `
    )
      .then((response) => response.json())
      .then((result) => this.setTopStories(result))
      .catch((e) => e);
  }

  componentDidMount() {
    // console.log("api url", url);
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchTopStories(searchTerm, DEFAULT_PAGE);
  }

  removeItem(id) {
    const { results, searchKey } = this.state;
    const { hits, page } = results[searchKey];
    const updatedList = hits.filter((item) => item.objectID !== id);
    this.setState({
      results: { ...results, [searchKey]: { hits: updatedList, page } },
    });
  }

  searchValue(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.checkTopStoriesSearchTerm(searchTerm)) {
      this.fetchTopStories(searchTerm, DEFAULT_PAGE);
    }
  }

  render() {
    const { results, searchTerm, searchKey, isLoading } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];
    return (
      <div>
        <div className="jumbotron text-center">
          <Search
            onChange={this.searchValue}
            value={searchTerm}
            onSubmit={this.onSubmit}
          >
            NEWS APP
          </Search>
        </div>

        <Table list={list} removeItem={this.removeItem} />

        <div className="text-center alert">
          <ButtonWithLoading
            isLoading={isLoading}
            variant="primary"
            size="lg"
            onClick={() => this.fetchTopStories(searchTerm, page + 1)}
          >
            Load more..
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}



const ButtonWithLoading = withLoading(CustomButton);

export default App;
