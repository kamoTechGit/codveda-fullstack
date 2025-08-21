import React, { useEffect, useState } from 'react';
import { Button, Container, List, ListItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users`);
        const data = await response.json();
        setUsers(data.data || data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [apiUrl]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Welcome to Codveda Full-Stack
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate('/dashboard')}
        sx={{ mb: 3 }}
      >
        Go to Dashboard
      </Button>

      <Typography variant="h6">Connected to: {apiUrl}</Typography>
      
      {loading ? (
        <Typography>Loading users...</Typography>
      ) : (
        <>
          <Typography variant="h5" sx={{ mt: 2 }}>Users:</Typography>
          <List>
            {users.length > 0 ? (
              users.map(user => (
                <ListItem key={user._id}>
                  {user.name} - {user.email}
                </ListItem>
              ))
            ) : (
              <ListItem>No users found</ListItem>
            )}
          </List>
        </>
      )}
    </Container>
  );
}