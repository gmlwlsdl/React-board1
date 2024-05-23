import React from 'react';

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
