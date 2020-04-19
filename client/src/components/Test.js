import React, { useEffect, useState } from 'react';

import Container from 'muicss/lib/react/container';
import { GET_USER } from '../graphql/queries';
import axios from 'axios';
import { useQuery } from '@apollo/react-hooks';

const Test = () => {
  const { data, loading, error } = useQuery(GET_USER);

  if (error) return <h1>Error fetching user </h1>;
  if (loading) return <h2>Loading songs...</h2>;

  return (
    <Container>
      <div className={`song-container`}>{JSON.stringify(data)}</div>
    </Container>
  );
};

const TestWrapper = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const loginWithFB = async () =>
      await axios.get('http://localhost:3001/auth/facebook');

    loginWithFB().then(a => console.log(a));
  }, []);

  const handleClick = () => setShow(!show);
  return (
    <div>
      <button onClick={handleClick}>Toggle</button>
      {show ? <Test /> : null}
    </div>
  );
};

export default TestWrapper;
