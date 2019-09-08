import React from 'react';

import './UserList.css';

const UserList = props => {
  return (
    <section className="user-list">
      <h2>Loaded Users</h2>
      <ul>
        {props.users.map(ig => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            <span>{ig.firstName}</span>
            <span>{ig.age}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserList;
