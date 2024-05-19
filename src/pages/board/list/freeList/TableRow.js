import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const TableRow = ({ post }) => {
  return (
    <tr key={post.num}>
      <td>{post.num}</td>
      <td>
        <Link to={`/api/post/${post.num}`}>{post.title}</Link>
      </td>
      <td>{post.writer}</td>
      <td>{formatDate(post.created_at)}</td>
      <td>{post.views}</td>
    </tr>
  );
};

export default TableRow;
