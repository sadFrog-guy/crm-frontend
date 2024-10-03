import { BaseQueryFn, TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { useState, useEffect } from 'react';

interface RequestFuncReturn<DataType> {
  entities: DataType | undefined;
  isError: boolean | null;
  isLoading: boolean;
  isUninitialized?: boolean;
}

type RequestFunc<DataType> = () => TypedUseQueryHookResult<DataType, any, BaseQueryFn>;

const usePersistentError = <DataType>(requestFunc: RequestFunc<DataType>): RequestFuncReturn<DataType> => {
  const { data: entities, isError, isLoading } = requestFunc();
  const [persistentError, setPersistentError] = useState<boolean | null>(null);

  useEffect(() => {
    if (isError && persistentError === null) {
      setPersistentError(true);
    }

    if (!isError && entities) {
      setPersistentError(false);
    }
  }, [isError, entities]);

  return { entities, isError: persistentError, isLoading };
};

export default usePersistentError;