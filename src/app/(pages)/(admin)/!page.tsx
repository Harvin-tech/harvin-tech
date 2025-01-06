'use client';
import apiClient from '@/api/services/apiClient';
import React, { useEffect } from 'react';

// TODO: This is only fro testing purposes  Remove later
const Page = () => {
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState<any>(null);
  async function getAllusers() {
    try {
      const response = await apiClient.get(
        `${process.env.NEXT_PUBLIC_API_URL}/private/users`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      setError(error);
      return;
    }
  }
  useEffect(() => {
    getAllusers().then((response) => {
      setUsers(response.data.users);
      console.log(response);
    });
  }, []);
  return (
    <div className="min-h-screen">
      {!error ? (
        users.map((user: any) => (
          <div key={user._id} className="flex justify-between">
            <p>{user._id}</p>
            <p>{user.firstName}</p>
            <p>{user.email}</p>
          </div>
        ))
      ) : (
        <p>{JSON.stringify(error)}</p>
      )}
    </div>
  );
};

export default Page;
