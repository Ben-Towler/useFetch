import React, { useContext, ReactNode } from "react";

type Data = Record<string, unknown>;

type Context = {
  cache: {
    key: string;
    payload: unknown;
  }[];
  updateCache: (data: Data) => void;
}

const CacheContext = React.createContext<Context>({
  cache: null,
  updateCache: () => {},
});

export const CacheProvider = ({ value, children }: { 
  value: any,
  children: ReactNode,
}) => (
  <CacheContext.Provider value={value}>
    {children}
  </CacheContext.Provider>
);

export const useCache = () => useContext(CacheContext);
