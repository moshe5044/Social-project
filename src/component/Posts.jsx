import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

const Posts = ({ id, user }) => {

  const [posts, setPosts] = useState([]);
  const [showCurrentUserPosts, setShowCurrentUserPosts] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedPostTitle, setEditedPostTitle] = useState("");
  const [editedPostBody, setEditedPostBody] = useState("");

  const API_URL = "http://localhost:8000/posts";

  useEffect(() => {
    fetchPosts();
  }, [showCurrentUserPosts]);

  const fetchPosts = async () => {
    try {
      const fetchOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: `${user.username}:${user.website}`,
        },
      };

      const url = showCurrentUserPosts
        ? `${API_URL}/getPostsOf/${user.id}`
        : `${API_URL}/${user.id}`;

      const response = await fetch(url, fetchOptions);
      let data = await response.json();

      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostClick = (postId) => {
    setExpandedPostId((prevId) => (prevId === postId ? null : postId));
  };

  const handleAddPost = async () => {
    try {
      const addOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `${user.username}:${user.website}`,
        },
        body: JSON.stringify({
          title: newPostTitle,
          postBody: newPostBody,
        }),
      };

      const response = await fetch(`${API_URL}/addPost/${user.id}`, addOptions);

      if (response.status === 201) {
        fetchPosts();
        setNewPostTitle("");
        setNewPostBody("");
      } else {
        console.error("Error adding post:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleEditPost = async () => {
    try {
      const editOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          auth: `${user.username}:${user.website}`,
        },
        body: JSON.stringify({
          postId: editingPostId,
          title: editedPostTitle,
          postBody: editedPostBody,
        }),
      };

      const response = await fetch(`${API_URL}/updatePost/${user.id}`, editOptions);

      if (response.status === 200) {
        fetchPosts();
        setEditingPostId(null);
        setEditedPostTitle("");
        setEditedPostBody("");
      } else {
        console.error("Error updating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const deleteOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          auth: `${user.username}:${user.website}`,
        },
        body: JSON.stringify({
          itemId: postId,
        }),
      };

      const response = await fetch(`${API_URL}/deletePost/${user.id}`, deleteOptions);

      if (response.status === 200) {
        fetchPosts();
      } else {
        console.error("Error deleting post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="postsContainer">
      <h2>Posts</h2>

      <div> 
        <button className="postButton" onClick={() => setShowCurrentUserPosts(true)}>Show My Posts</button>
        <button className="postButton" onClick={() => setShowCurrentUserPosts(false)}>Show All Posts</button>
      </div>

      <div className="addPostButton" onClick={() => setIsAdding((prev) => !prev)}>
        <FaPlus />
      </div>

      {isAdding && (
        <div className="addPostForm">
          <input
            type="text"
            placeholder="Enter post title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Enter post body"
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}
          />
          <br />
          <button onClick={handleAddPost}>Add Post</button>
        </div>
      )}

      {posts.map((post) => (
        <div
          key={post.id}
          className={`post ${expandedPostId === post.id ? "expanded" : ""}`}
        >
          <div className="postHeader" onClick={() => handlePostClick(post.id)}>
            <h3>#{post.id}</h3>
            <div className="postTitle">{post.title}</div>
          </div>
          {expandedPostId === post.id && (
            <div className="postBody">
              <span>{post.body}</span>
            </div>
          )}
          {post.userId === id && (
            <div className="postIcons">
              {!editingPostId && (
                <>
                  <FaEdit
                    className="editIcon"
                    onClick={() => {
                      setEditingPostId(post.id);
                      setEditedPostTitle(post.title);
                      setEditedPostBody(post.body);
                    }}
                    role="button"
                    tabIndex="0"
                    aria-label={`Edit`}
                  />
                  <FaTrashAlt
                    className="trashIcon"
                    onClick={() => handleDeletePost(post.id)}
                    role="button"
                    tabIndex="0"
                    aria-label={`Delete`}
                  />
                </>
              )}
            </div>
          )}
        </div>
      ))}

      {editingPostId && (
        <div className="editPostForm">
          <input
            type="text"
            placeholder="Edit post title"
            value={editedPostTitle}
            onChange={(e) => setEditedPostTitle(e.target.value)}
          /> <br />
          <textarea
            placeholder="Edit post body"
            value={editedPostBody}
            onChange={(e) => setEditedPostBody(e.target.value)}
          /> <br />
          <button onClick={handleEditPost}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default Posts;
