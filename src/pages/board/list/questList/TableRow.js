import React, { useState } from 'react';
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
  const [hover, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div
      className={hover ? 'color_q' : 'F1000004339_q'}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <td className="F10000043332_q">
        <div className="no_q">{post.num}</div>
      </td>
      <td className="F10000043372_q">
        <div className="title_q">
          <Link to={`/quest/${post.num}`}>{post.title}</Link>
        </div>
      </td>
      <td className="F10000043342_q">
        <div className="writer_q">{post.writer}</div>
      </td>
      <td className="F10000043352_q">
        <div className="time_q">{formatData(post.created_at)}</div>
      </td>
      <td className="F10000043362_q">
        <div className="view_q">{post.views}</div>
      </td>
    </div>
  );
};

export default TableRow;
