import React, { useEffect, useState } from 'react';
import ListComponent from './ListComponent';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main style={styles.container}>
      <h1>User List</h1>

      {loading && <p>Loading users...</p>}
      {error && <p style={styles.error}>Error: {error}</p>}

      {!loading && !error && (
        <ListComponent
          items={users}
          renderItem={(user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          )}
        />
      )}
    </main>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial',
    padding: '2rem',
    textAlign: 'center',
  },
  error: {
    color: 'red',
  },
};

export default App;
