import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Single() {
  const history = useHistory();
  const [updateb, setupdateb] = useState(false);
  const logeduser = JSON.parse(localStorage.getItem("logeduser"));

  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const [post, setpost] = useState([]);
  const [title, settilte] = useState("");
  const [desc, setdesc] = useState("");

  const baseUrl = "http://localhost:5000/api/posts/";
  const publicFolder = "http://localhost:5000/images/";

  useEffect(() => {
    axios
      .get(baseUrl + postId)
      .then((res) => setpost(res.data))
      .catch((err) => console.log(`err`, err));
  }, []);

  const handledelete = (id, username) => {
    console.log("id :>> ", id, username);
    axios
      .delete("http://localhost:5000/api/posts/" + id, username)
      .then(
        (res) => console.log(`res`, res),

        history.push("/")
      )
      .catch((err) => alert("error "));
  };
  const handledeupdate = (id, username) => {
    setupdateb(true);
  };
  const handlepublish = (id, username) => {
    // setupdateb(true);
    // console.log("id :>> ", id, username);
    // axios
    //   .put("http://localhost:5000/api/posts/" + id, username)
    //   .then(
    //     (res) => console.log(`res`, res),
    //     history.push("/")
    //   )
    //   .catch((err) => alert("error "));
  };
  console.log("updateb :>> ", updateb);
  return (
    <div className="mx-auto col-md-10">
      <div className="">
        <img
          alt="not load"
          className="singlePostimg img-fluid"
          src={publicFolder + post.photo}
        />{" "}
        <div className="singlepostimageitem mt-3">
          {!updateb && <h4 className="singlepostTitle">Title:{post.title}</h4>}
          {updateb && (
            <input
              className="border"
              placeholder="title"
              type="text"
              class="form-contro-sm singlepostTitle"
            />
          )}

          {post.username == logeduser.username && (
            <button
              className="btn btn-success"
              onClick={() => handledeupdate(post._id, post.username)}
            >
              Edit <i class="fas fa-edit text-success "></i>
            </button>
          )}
          {post.username == logeduser.username && (
            <button
              className="btn btn-danger"
              onClick={() => handledelete(post._id, post.username)}
            >
              Delete
            </button>
          )}
          {updateb && post.username == logeduser.username ? (
            <button
              class="btn btn-success "
              onClick={() => handlepublish(post._id, post.username)}
            >
              Publish
            </button>
          ) : null}
        </div>
      </div>

      {!updateb && (
        <p className="singlePostFesc ml-2">Description:{post.desc}</p>
      )}
      {updateb && (
        <input
          rows={4}
          cols={50}
          className="border"
          value={post.desc}
          placeholder="title"
          type="textarea"
          class="form-control singlePostFesc"
        />
      )}

      <Link to={`/?user=${post.username}`} className="text-decoration-none">
        <h5 className="text-danger">author:{post.username}</h5>
      </Link>
    </div>
  );
}
