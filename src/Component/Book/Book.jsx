/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';

export default function Book() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filterArray, setFilterArray] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    fetch('https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/get-category-items/5366/books/ar/ar/1/25/json', {
      signal: abortController.signal,
    }).then((response) => response.json())
      .then(({ data }) => {
        setLoading(false);
        setBooks(data);
      })
      .catch((err) => console.log(err));
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    setFilterArray(books.filter((book) => book.title.includes(searchValue)));
  }, [searchValue]);

  return (
    <>
      <div>Book</div>
      <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      { !loading ? !filterArray.length ? books.map((book) => (
        <BookCard book={book} />
      )) : filterArray.map((book) => (
        <BookCard book={book} />
      )) : <h2>Loading...</h2>}
    </>
  );
}
