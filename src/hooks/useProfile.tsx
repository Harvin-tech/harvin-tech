import { nextApiClient } from '@/services/apiClient';
import React, { useEffect, useState } from 'react';

const useProfile = () => {
  const [user, setUser] = useState<any>({});
  const [userCourseId, setUserCourseId] = useState<[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem('user')) {
      const userData = localStorage.getItem('user');
      setUser(userData);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem('user')) {
        const userDataStr = localStorage.getItem('user');
        const userData = userDataStr ? JSON.parse(userDataStr) : null;
        const userId = userData?._id;
        const fetchData = async () => {
          console.log(userId, 'userId');
          const userDataWithCourseId = await nextApiClient.get(
            `/api/private/users/${userId}`
          );
          console.log(userDataWithCourseId.data.data, 'usedatawithcourse');
          const userCourseId = userDataWithCourseId?.data?.data?.userCourseId;
          console.log(userCourseId, 'userCourseId');
          const filterForOnlyCourseId = userCourseId?.map(
            (enrollment: any) => enrollment.courseId
          );
          setUserCourseId(filterForOnlyCourseId);
        };

        fetchData();
      }
    } catch (error) {
      console.log('something issue in fetching users course id');
      console.error(error);
    }
  }, []);
  return {
    user,
    userCourseId,
    loading,
  };
};

export default useProfile;
