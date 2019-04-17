import "@babel/polyfill";
import React from "react";
import descriptions from "../videoData_json";
import Title from "./components/Title.jsx";
import axios from "axios";
import IconTab from "./components/IconTab.jsx";
import LineDivider from "./components/LineDivider.jsx";
import DetailCom from "./components/DetailCom.jsx";
import CommentsList from "./components/CommentsList.jsx";
import url from './config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorImg: "",
      details: "",
      categories: [],
      data: {}
    };
    this.getAuthorImg = this.getAuthorImg.bind(this);
  }

  /* Given a user name, returns the thumbnail for that user */
  getAuthorImg(userId = 1, cb) {
    axios.get(`http://${url}/usersthumbnail/${userId}`)
      .then(data => {
        cb(data);
      });
  }

  getDetail(video_id) {
    axios.get(`http://${url}/details/${video_id}`).then(data => {
      this.setState({
        details: data.data[0].text
      });
    });
  }

  getCategories(video_id) {
    axios.get(`http://${url}/categories/${video_id}`)
      .then(data => {
        this.setState({
          categories: data.data.categories
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    let id = window.location.pathname; //  '/5/'
    id = id.split("/");
    axios.get(`http://18.144.23.223:3001/videos/${Number(id[1])}`)
    .then(data => {
      if (!data) {
        this.setState({
          id: 1,
          user_thumbnail: "https://s3.amazonaws.com/uifaces/faces/twitter/mighty55/128.jpg",
          username: "Charlie21"
        })
      } else {
        this.setState({
          data: data.data[0]
        });
      }
      this.getAuthorImg(data.data[0].user_id, data => {
        this.setState({
          authorImg: data.data.user_thumbnail
        });
      });
    });
    this.getDetail(Number(id[1]));
    this.getCategories(Number(id[1]));
  }

  render() {
    return (
      <div
        style={{ paddingLeft: "2.5rem", paddingTop: "2.5rem", float: "left" }}
      >
        <Title data={this.state.data} authorImg={this.state.authorImg} />
        <LineDivider />
        <IconTab data={descriptions[0]} />
        <DetailCom
          data={this.state.details}
          categories={this.state.categories}
        />
        &nbsp;
        <LineDivider />
        &nbsp;
        <CommentsList />
      </div>
    );
  }
}

export default App;
