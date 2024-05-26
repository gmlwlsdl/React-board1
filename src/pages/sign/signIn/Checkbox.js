import React from 'react';
import './index';

function Checkbox({ checked, onChange }) {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
        className="checkbox-input"
      />
    </label>
  );
}

export default Checkbox;
