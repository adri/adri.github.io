/** @jsx jsx */
import React, { Component } from "react";
import { Link } from "gatsby";
import { jsx, Link as TLink } from "theme-ui";

// Search component
class Search extends Component {
  state = {
    query: "",
    results: [],
  };

  render() {
    const ResultList = () => {
      if (this.state.results.length > 0) {
        return this.state.results.map((page, i) => (
          <div className="item-search" key={i}>
            <TLink as={Link} to={page.slug} className="link">
              <h4>{this.getHighlightedText(page.title, this.state.query)}</h4>
            </TLink>
          </div>
        ));
      } else if (this.state.query.length > 0) {
        return "No results for ";
      } else {
        return "";
      }
    };

    return (
      <div className={this.props.classNames}>
        <input
          className="search__input"
          type="text"
          onChange={this.search}
          placeholder={"Search"}
        />
        <div className="search__list">
          <ResultList />
        </div>
      </div>
    );
  }

  getHighlightedText(text, query) {
    const sanitizedKeyword = query.replace(/\W/g, "");
    const regexForContent = new RegExp(sanitizedKeyword, "gi");

    return text.replace(regexForContent, "<em>$&</em>");
  }

  getSearchResults(query) {
    // adicionar variável para língua
    var index = window.__FLEXSEARCH__.en.index;
    var store = window.__FLEXSEARCH__.en.store;
    if (!query || !index) {
      return [];
    } else {
      var results = [];
      // search the indexed fields
      Object.keys(index).forEach((idx) => {
        results.push(
          ...index[idx].values.search(query, { suggest: true, limit: 10 })
        ); // more search options at https://github.com/nextapps-de/flexsearch#index.search
      });

      // find the unique ids of the nodes
      results = Array.from(new Set(results));

      // return the corresponding nodes in the store
      var nodes = store
        .filter((node) => (results.includes(node.id) ? node : null))
        .map((node) => node.node);

      return nodes;
    }
  }

  search = (event) => {
    const query = event.target.value;
    if (this.state.query.length > 0) {
      const results = this.getSearchResults(query);
      this.setState({ results: results, query: query });
    } else {
      this.setState({ results: [], query: query });
    }
  };
}

export default Search;
