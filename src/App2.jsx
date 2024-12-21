import {useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import './App.css';
// import { useRef } from 'react';
// import React from 'react';

const createUser = async (user) => {
    const {data} = await axios.post("https://jsonplaceholder.typicode.com/users", user);
    return data;
}

const App2 = () => {
    const queryClient = useQueryClient();

    //use the mutation hook
    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            // Invalidate queries to refetch fresh data after mutation
            queryClient.invalidateQueries(['users'])
        },
        onError: (error) => {
            // Handle error: e.g., show an error message to the user
            console.error('Error creating user:', error);
        }
    });

    const handleUser = () => {
        mutation.mutate({
            name: 'New User',
            email: 'newuser@example.com',
            username: 'newuser',
        });
    }

    return (
        <div>
             
          <button onClick={handleUser}>Add User</button>
          {mutation.isLoading && <p>Adding user...</p>}
          {mutation.isError && <p>Error: {mutation.error.message}</p>}
          {mutation.isSuccess && <p>User added successfully!</p>}
        </div>
      );
}

export default App2;
