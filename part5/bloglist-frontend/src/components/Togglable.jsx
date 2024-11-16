import React, { useState } from 'react';

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div>
      {visible ? (
        <div>
          {children}
          <button onClick={toggleVisibility}>Cancel</button>
        </div>
      ) : (
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      )}
    </div>
  );
};

export default Togglable;
