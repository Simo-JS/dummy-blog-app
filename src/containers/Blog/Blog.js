import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

import axios from "axios";

class Blog extends Component {
  state = {
    posts: [],
    id: null
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
      const posts = response.data.slice(0, 6);
      const updatedPosts = posts.map(post => {
        return { ...post, author: "Simo" };
      });
      this.setState({ posts: updatedPosts });
    });
  }

  selectedPostHander = id => {
    this.setState({ id: id });
  };

  render() {
    let posts = this.state.posts.map(post => (
      <Post
        key={post.id}
        title={post.title}
        author={post.author}
        clicked={() => this.selectedPostHander(post.id)}
      />
    ));
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.id} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
