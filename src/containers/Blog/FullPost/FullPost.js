import React, { Component } from "react";

import "./FullPost.css";

import axios from "axios";

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  deletePostHandler = () => {
    axios.delete("/posts/" + this.props.id).then(response => {});
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        +this.props.match.params.id !== this.state.loadedPost.id
      )
        axios.get("/posts/" + this.props.match.params.id).then(response => {
          this.setState({ loadedPost: response.data });
        });
    }
  }

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Loading...</p>;
    }
    if (this.props.match.params.id && this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;
