// Search.js
import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Users from './Users';
import { searchUsers } from '../../api';

const Search = () => {
  const history = useHistory();
  const location = useLocation();
  const [text, setText] = useState('');
  const [users, setUsers] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setText(query);
      searchUsers(query).then((result) => setUsers(result));
    }
  }, [location.search]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (text === '') {
      alert('Please enter something');
    } else {
      history.push(`?q=${text}`);
      const fetchedUsers = await searchUsers(text);
      setUsers(fetchedUsers);
    }
  };

  const clearUsers = () => {
    setUsers([]);
    setText(''); // Clear the input field
    history.push('');
    inputRef.current.focus(); // Focus on the input field
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          ref={inputRef}
          type="text"
          name="text"
          placeholder="Search User"
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-success btn-block"
        />
      </form>
      {users.length > 0 && (
        <button className="btn btn-danger btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
      <Users users={users} />
    </div>
  );
};

export default Search;
