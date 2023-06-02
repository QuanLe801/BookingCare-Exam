'use client';

import styles from './page.module.css';
import BookingCareContainer from './containers/BookingCareContainer/BookingCareContainer';
import { useEffect, useState } from 'react';
import { apiKey, cx, messegerType } from './const';

export default function Home() {
  const [bookingCareItem, setBookingCareItem] = useState([]);
  const [keySearch, setKeySearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [EmptyResult, setEmptyResult] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [reSearch, setReSearch] = useState(false);
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const fetchData = (keySearch: string, page: number) => {
    fetch(
      `https://www.googleapis.com/customsearch/v1/siterestrict?key=${apiKey}&cx=${cx}&q=${keySearch}&num=${pageSize}&start=${
        (page - 1) * pageSize + 1
      }`
    )
      .then((response) => {
        if (response.status === 429) {
          setErrorMessage(messegerType.searchLimited);
        }
        return response.json();
      })
      .then((data) => {
        let listBookingCare;
        if (parseInt(data?.searchInformation.totalResults) === 0) {
          setEmptyResult(true);
        } else {
          if (reSearch === true) {
            listBookingCare = bookingCareItem.slice(0, 0).concat(data?.items);
          } else {
            listBookingCare = bookingCareItem.concat(data?.items);
          }
          setBookingCareItem(listBookingCare);
          setEmptyResult(false);
          setIsLoadMore(false);
          setReSearch(false);
        }
      });
  };

  const handleScroll = () => {
    window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight && setIsLoadMore(true);
  };

  useEffect(() => {
    if (isLoadMore === true) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(keySearch, nextPage);
    }
  }, [isLoadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={styles.main}>
      <BookingCareContainer
        setKeySearch={setKeySearch}
        keySearch={keySearch}
        bookingCareItem={bookingCareItem}
        setBookingCareItem={setBookingCareItem}
        errorMessage={errorMessage}
        fetchData={fetchData}
        setPage={setPage}
        page={page}
        EmptyResult={EmptyResult}
        setReSearch={setReSearch}
        reSearch={reSearch}
      />
    </main>
  );
}
