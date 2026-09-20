import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts, addPost, addLike, removeLike, deletePost } from '../../redux/slices/postSlice';
import setAuthToken from '../../utils/setAuthToken';

const Posts = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Ensure the token is attached before dispatching the request
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
    dispatch(getPosts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addPost({ text }));
      setText('');
    }
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      <h1 className="form-title">Posts</h1>
      <p className="form-subtitle">Welcome to the developer community</p>

      {error?.msg && <div className="alert alert-danger">{error.msg}</div>}

      <div className="post-form">
        <h3>Say Something...</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginTop: '0.8rem' }}>
            <textarea
              name="text"
              rows="4"
              placeholder="Create a post..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit Post</button>
        </form>
      </div>

      <div className="posts">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-item">
              <div className="user-meta">
                <img src={post.avatar} alt={post.name} />
                <h4>{post.name}</h4>
              </div>
              <div>
                <p style={{ marginBottom: '1rem' }}>{post.text}</p>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => dispatch(addLike(post._id))}
                >
                  👍 <span>{post.likes?.length || 0}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => dispatch(removeLike(post._id))}
                >
                  👎
                </button>
                <Link to={`/posts/${post._id}`} className="btn btn-primary">
                  Discussion{' '}
                  {post.comments?.length > 0 && (
                    <span style={{ marginLeft: '4px', background: '#fff', color: '#17a2b8', padding: '0.1rem 0.4rem', borderRadius: '50%' }}>
                      {post.comments.length}
                    </span>
                  )}
                </Link>
                {authUser && post.user === authUser._id && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => dispatch(deletePost(post._id))}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No posts found. Be the first to create one!</p>
        )}
      </div>
    </div>
  );
};

export default Posts;