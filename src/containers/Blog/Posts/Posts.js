import React, { Component } from "react";

import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";

import { Route, Link } from "react-router-dom";
import axios from "axios";

import "./Posts.css";

class Posts extends Component {
  state = {
    posts: [],
    id: null
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 6);
        const updatedPosts = posts.map(post => {
          return { ...post, author: "Simo" };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        console.log(error);
      });
  }

  selectedPostHander = id => {
    this.setState({ id: id });
  };
  render() {
    let posts = this.state.posts.map(post => (
      <Link to={"/posts/" + post.id} key={post.id}>
        <Post
          title={post.title}
          author={post.author}
          clicked={() => this.selectedPostHander(post.id)}
        />
      </Link>
    ));

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={this.props.match.url + "/:id"} component={FullPost} />
      </div>
    );
  }
}

export default Posts;
