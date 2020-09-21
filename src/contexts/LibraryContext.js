import React, { useCallback, useMemo, createContext, useContext } from 'react';
import { useQuery, queryCache } from 'react-query';

import GlobalState from '../contexts/GlobalStateContext';

const LibraryContext = createContext();

export default LibraryContext;

const GET_BOOKS = 'GET_BOOKS';
let SERVER_URL = null;

async function fetchData() {
    const response = await fetch(`${SERVER_URL}/libros`);
    const json = await response.json();
    return json;
}

export function LibraryContextProvider({children}) {
    const [appConfiguration] = useContext(GlobalState);
    SERVER_URL = appConfiguration.serverURL;
    const { isSuccess, isLoading, data } = useQuery(GET_BOOKS, fetchData);

    const invalidateBooksListCache = useCallback(function(){
        queryCache.invalidateQueries(GET_BOOKS);
    }, []);

    const value = useMemo(()=> {
        return {
            isSuccess,
            isLoading,
            books: data,
            invalidateBooksListCache,
        }
    }, [
        isSuccess,
        isLoading,
        data,
        invalidateBooksListCache,
    ]);

    return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}
