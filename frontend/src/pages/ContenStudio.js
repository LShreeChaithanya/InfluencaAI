import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { createPost } from '../slices/contentSlice';

const ContentStudioContainer = styled.div`
  padding: 1rem;
`;

const TweetInput = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 1rem;
`;

const ContentStudio = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(content));
    setContent('');
  };

  return (
    <ContentStudioContainer>
      <h1>Content Studio</h1>
      <form onSubmit={handleSubmit}>
        <TweetInput
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your tweet here..."
        />
        <button type="submit">Post Tweet</button>
      </form>
    </ContentStudioContainer>
  );
};

export default ContentStudio;