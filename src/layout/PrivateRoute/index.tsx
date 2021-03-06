import React, { useEffect, useState } from 'react';
import userApi from '@api/user-api';
import { deserialize } from '@common/utils';
import useCashableState from '@hooks/use-cashable-state';
import TopMenu from '@layout/TopMenu';
import PublicHome from '@pages/PublicHome';
import Spinner from '@components/Spinner';

const retrieveFromSearch = (search:string, q: string) => {
  if (search) {
    return deserialize(search)[q];
  }

  return null;
}

interface PrivateRouteProps {
  children: JSX.Element,
  location: {search: string}
}

function PrivateRoute({children, location}: PrivateRouteProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [spinnerIsOn, setSpinnerIsOn] = useState(true);
  const [access_token, setAccessToken] = useCashableState(retrieveFromSearch(location?.search, 'access_token'), 'access_token');
  const [refresh_token, setRefreshToken] = useCashableState(retrieveFromSearch(location?.search, 'refresh_token'), 'refresh_token');
 
  useEffect(() => {
    if (refresh_token && access_token) {
      setIsLoggedIn(true);
      setSpinnerIsOn(false);
    } else if (refresh_token && !access_token) {
      userApi.getNewTokens(refresh_token).then(data => {
        if (data.refresh_token && data.access_token) {
          setRefreshToken(data.refresh_token);
          setAccessToken(data.access_token);
          setIsLoggedIn(true);
          setSpinnerIsOn(false);
        }
      });
    } else {
      setSpinnerIsOn(false);
      setIsLoggedIn(false);
    };
  }, []);
    
    return !spinnerIsOn && isLoggedIn
        ? <><TopMenu data-testid="main-menu-desktop" /><div className="container">{React.cloneElement(children, { access_token, refresh_token })}</div></>
        : spinnerIsOn ? <Spinner></Spinner> : <PublicHome />
}

export default React.memo(PrivateRoute);

