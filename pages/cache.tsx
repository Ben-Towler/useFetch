import React, { useEffect, useState } from 'react';
import { useFetch } from '@lib/hooks';
import { FetchStatus, User } from '@lib/types';

type Props = {};

const Cache: React.FC<Props> = () => {
  const [ state, setState] = useState({
    data: undefined,
    status: undefined,
  });
  const { get: getUsers } = useFetch<User[]>('/users', null, true);

  useEffect(() => {
    if (state?.status === FetchStatus.FETCHED) return;

    (async() => {
      const { data, status } = await getUsers({
        params: { _page: 1, _limit: 20 }
      });
      setState({ data, status });
    })();
  }, [state?.status]);

  console.log('CACHE', state);

  return (
    <>test</>
  )
}

export default Cache;
