import React from 'react';
import PropTypes from 'prop-types';

export default function Skeleton({ rows = 5, height = '2rem', widths = [] }) {
  return (
    <div role="status" className="animate-pulse">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5`}
          style={{
            height: height,
            width: widths[index] || '100%',
          }}
        ></div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

Skeleton.defaultProps = {
  rows: 5,
  height: '2rem',
  widths: [],
};

Skeleton.propTypes = {
  rows: PropTypes.number,
  height: PropTypes.string,
  widths: PropTypes.arrayOf(PropTypes.string),
};
