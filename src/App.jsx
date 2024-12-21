// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import './App.css'

// const queryClient = new QueryClient();

const getUsers = async() => {
  const {data} = await axios.get("https://jsonplaceholder.typicode.com/users");
  return data;
}

function App() {
  // const [count, setCount] = useState(0)
  const {data, isLoading, error} = useQuery(
    {queryKey: ['users'],
     queryFn: getUsers,
     staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
     cacheTime: 1000 * 60 * 10, // Cache data remains in memory for 10 minutes
     refetchOnWindowFocus: false, // Disable automatic refetching on window focus
    }
  );

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    // <QueryClientProvider client={queryClient}>
      <div>
        <ul>
          {data.map(d => (
            <li key={d.id}>
              {d.name}
            </li>
          ))}
        </ul>
       </div>
    // </QueryClientProvider>
  )
}

export default App
