import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const formatData = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const TableRow = ({ post }) => {
  return (
    <div className="F1000004339_f">
      <td className="F10000043332_f">
        <div className="no_f">{post.num}</div>
      </td>
      <td className="F10000043372_f">
        <div className="title_f">
          <Link to={`/post/${post.num}`}>{post.title}</Link>
        </div>
      </td>
      <td className="F10000043342_f">
        <div className="writer_f">{post.writer}</div>
      </td>
      <td className="F10000043352_f">
        <div className="time_f">{formatData(post.created_at)}</div>
      </td>
      <td className="F10000043362_f">
        <div className="view_f">{post.views}</div>
      </td>
    </div>
  );
};

export default TableRow;
