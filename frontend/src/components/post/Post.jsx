import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, addComment, deleteComment } from '../../redux/slices/postSlice';

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.post);
  const authUser = useSelector((state) => state.auth.user);
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addComment({ postId: id, formData: { text } }));
      setText('');
    }
  };

  if (loading || post === null) return <div>Loading...</div>;

  return (
    <div>
      <Link to="/posts" className="btn btn-light" style={{ marginBottom: '1.5rem' }}>
        Back To Posts
      </Link>

      <div className="post-item">
        <div className="user-meta">
          <img src={post.avatar} alt={post.name} />
          <h4>{post.name}</h4>
        </div>
        <div>
          <p>{post.text}</p>
        </div>
      </div>

      <div className="post-form">
        <h3>Leave a Comment</h3>
        <form onSubmit={handleCommentSubmit}>
          <div className="form-group" style={{ marginTop: '0.8rem' }}>
            <textarea
              rows="3"
              placeholder="Comment on this post..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      <div className="comments">
        {post.comments.map((comment) => (
          <div key={comment._id} className="post-item" style={{ gridTemplateColumns: '1fr 5fr' }}>
            <div className="user-meta">
              <img src={comment.avatar} alt={comment.name} style={{ width: '60px' }} />
              <h5>{comment.name}</h5>
            </div>
            <div>
              <p>{comment.text}</p>
              {authUser && comment.user === authUser._id && (
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ marginTop: '0.5rem' }}
                  onClick={() => dispatch(deleteComment({ postId: post._id, commentId: comment._id }))}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;