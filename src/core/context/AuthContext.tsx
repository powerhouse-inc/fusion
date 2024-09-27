'use client';

import { GraphQLClient } from 'graphql-request';
import React, { useLayoutEffect, useCallback } from 'react';
import { GRAPHQL_ENDPOINT } from '../../config/endpoints';
import PermissionManager from '../auth/permissionManager';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { getAuthFromStorage } from '../utils/authStorage';
import { LOCAL_STORAGE_AUTH_KEY } from '../utils/const';
import type { LoginDTO, UserDTO } from '../models/dto/authDTO';

interface AuthContextProps {
  user?: UserDTO;
  authToken?: string;
  setCredentials?: (value: LoginDTO) => void;
  clearCredentials?: () => void;
  clientRequest?: GraphQLClient;
  hasToken: boolean;
  isAuth?: boolean;
  isAdmin?: boolean;
  permissionManager: PermissionManager;
}

export const AuthContext = React.createContext<AuthContextProps>({
  hasToken: false,
  isAdmin: false,
  permissionManager: new PermissionManager(),
});
const clientRequest = new GraphQLClient(GRAPHQL_ENDPOINT);
export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const [authToken, setAuthToken] = React.useState<string | undefined>();
  const hasToken = authToken !== undefined;
  const isAuth = !!authToken;
  const [user, setUser] = React.useState<UserDTO | undefined>(undefined);
  const isAdmin = useIsAdmin(user || ({} as UserDTO));

  const permissionManager = React.useMemo(() => new PermissionManager(user, authToken), [user, authToken]);

  useLayoutEffect(() => {
    const auth = getAuthFromStorage();
    const newAuth = auth?.authToken;
    if (newAuth) {
      clientRequest.setHeaders({
        authorization: `Bearer ${newAuth}`,
      });
    }
    setAuthToken(newAuth);
    setUser(auth?.user);
  }, []);

  const setCredentials = (value: LoginDTO) => {
    setAuthToken(value.authToken || '');
    setUser(value.user);
    window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(value));
  };

  const clearCredentials = useCallback(() => {
    setAuthToken('');
    setUser(undefined);
    window.localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        setCredentials,
        clearCredentials,
        clientRequest,
        hasToken,
        isAuth,
        isAdmin,
        permissionManager,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
