import React, { useCallback, useMemo, createContext } from 'react';
import { useQuery,queryCache } from 'react-query';

const LibraryContext = createContext();

export default LibraryContext;

const GET_BOOKS = 'GET_BOOKS';
// const SERVER_URI = 'https://crud.upn164.edu.mx/api';
const SERVER_URI = 'http://192.168.10.100:8088/api';

async function fetchData() {
    const response = await fetch(`${SERVER_URI}/libros`);
    const json = await response.json();
    return json;
}

export function LibraryContextProvider({children}) {
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
