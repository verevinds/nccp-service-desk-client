import React, { memo, useEffect, useState } from 'react';
import Incident from '../component/Incident/Incident';
import { useSelector } from 'react-redux';

const MyIncidentPage = (props) => {
  const {
    incidents: { list },
    auth: { user },
  } = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [myList, setMyList] = useState([]);
  useEffect(() => {
    if (user && list) {
      let newList = list.filter((item) => item.number == user.number);
      setMyList(newList);

      if (newList.length) {
        setIsLoading(true);
      }
    }
  }, [user, list]);

  return <Incident list={myList} isLoading={isLoading} myincident={true} />;
};

export default memo(MyIncidentPage);
