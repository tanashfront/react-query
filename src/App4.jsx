import {useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import './App.css';
// import { useRef } from 'react';
// import React from 'react';

const deleteUser = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
}

const App4 = () => {
    const queryClient = useQueryClient();

    //use the mutation hook
    const mutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            // Invalidate queries to refetch fresh data after mutation
            queryClient.invalidateQueries(['users'])
        },
        onError: (error) => {
            // Handle error: e.g., show an error message to the user
            console.error('Error deleting user:', error);
        }
    });

    const handleUser = (userId) => {
        mutation.mutate(userId); // Trigger the delete mutation
    }

    return (
        <div>
        <ul>
          {/* Example of user list (should be dynamically fetched in a real app) */}
          <li>
            User 1 <button onClick={() => handleUser(1)}>Delete</button>
          </li>
          {/* More users... */}
        </ul>
  
        {/* Loading, error, or success states */}
        {mutation.isLoading && <p>Deleting...</p>}
        {mutation.isError && <p>Error: {mutation.error.message}</p>}
        {mutation.isSuccess && <p>User deleted successfully!</p>}
      </div>
      );
}

export default App4;
