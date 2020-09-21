import {useQuery} from 'react-query';
const GET_BOOK = 'GET_BOOK';
export default function useBook({bookId, server}) {
  async function fetchBook() {
    const response = await fetch(`${server}/libros/${bookId}`);
    const json = await response.json();
    return json;
  }
  return useQuery([GET_BOOK, bookId], fetchBook);
}
