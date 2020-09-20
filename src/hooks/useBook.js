import { useQuery } from 'react-query';

const SERVER_URI = 'http://192.168.10.100:8088/api';

const GET_BOOK = 'GET_BOOK';

export default function useBook({ bookId }){
    async function fetchBook(){
        const response = await fetch(`${SERVER_URI}/libros/${bookId}`);
        const json = await response.json();
        return json;
    }

    return useQuery([ GET_BOOK, bookId ], fetchBook);
}