import {useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import './App.css';
// import { useRef } from 'react';
// import React from 'react';

const updateUser = async ({id,updates}) => {
    const {data} = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updates);
    return data;
}

const App3 = () => {
    const queryClient = useQueryClient();

    //use the mutation hook
    const mutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            // Invalidate queries to refetch fresh data after mutation
            queryClient.invalidateQueries(['users'])
        },
        onError: (error) => {
            // Handle error: e.g., show an error message to the user
            console.error('Error updating user:', error);
        }
    });

    const handleUser = () => {
        mutation.mutate({
            id: 1,
            updates: {name: 'updated user'}
        });
    }

    return (
        <div>
             
          <button onClick={handleUser}>Update User</button>
          {mutation.isLoading && <p>Updating user...</p>}
          {mutation.isError && <p>Error: {mutation.error.message}</p>}
          {mutation.isSuccess && <p>User updated successfully!</p>}
        </div>
      );
}

export default App3;
