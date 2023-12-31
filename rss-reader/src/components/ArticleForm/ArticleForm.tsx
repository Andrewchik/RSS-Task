import React, { useState } from 'react';
import axios from 'axios';
import { ArticleFormProps } from '../../interfaces/article.interfaces';

const ArticleForm: React.FC<ArticleFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/articles', { title, content });
      onCreate(response.data);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
<form style={{ width: '70%' }} onSubmit={handleSubmit}>
  <div className={'article-input'}>
    <label>Title:</label>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>
  <div className={'article-textarea'}>
    <label>Content:</label>
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  </div>
  <button
    type="submit"
    className={'submit-button'}
    disabled={!title || !content}
  >
    Create Article
  </button>
</form>
  );
};

export default ArticleForm;