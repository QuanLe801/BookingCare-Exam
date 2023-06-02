import React, { Key, useEffect } from 'react';
import styles from './styles.module.css';
import BookingCareItem from '@/app/components/BookingCareItem/BookingCareItem';
import Image from 'next/image';
import { messegerType } from '@/app/const';

function BookingCareContainer({
  setKeySearch,
  keySearch,
  bookingCareItem,
  setBookingCareItem,
  errorMessage,
  fetchData,
  setPage,
  page,
  EmptyResult,
  setReSearch,
  reSearch,
}: any) {
  const handleChange = (event: any) => {
    setKeySearch(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await setPage(1);
    setReSearch(true);
  };

  useEffect(() => {
    if (reSearch) {
      fetchData(keySearch, page);
    }
  }, [reSearch]);

  return (
    <div>
      <div className={styles.header_container}>
        <div className={styles.image_container}>
          <Image src="/bookingcare-cover-4.jpg" alt="" fill={true} />
          <div className={styles.header_wrapper}>
            <div className={styles.header_title}>
              <span>NỀN TẢNG Y TẾ</span> <b>CHĂM SÓC SỨC KHỎE TOÀN CẦU</b>
            </div>
            <div className={styles.header_input}>
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Tìm kiếm gì đó"
                  value={keySearch}
                  onChange={handleChange}
                />
              </form>
            </div>
            <span
              style={{
                display: keySearch !== '' ? 'block' : 'none',
                textAlign: 'center',
                fontSize: '18px',
                color: 'white',
              }}
            >
              Nhấn Enter để tìm kiếm
            </span>
          </div>
        </div>
      </div>
      <div className={styles.booking_care_item_block}>
        {EmptyResult === false ? (
          bookingCareItem.map((item: any, key: Key) => (
            <BookingCareItem
              key={key}
              link={item?.link}
              title={item?.title}
              snippet={item?.snippet}
              imgUrl={
                item?.pagemap?.cse_image !== undefined
                  ? item?.pagemap?.cse_image[0]?.src
                  : ''
              }
            />
          ))
        ) : (
          <span className={styles.alert}>
            ${messegerType.EmptyResult} cho {keySearch}
          </span>
        )}
      </div>
      {errorMessage !== '' && (
        <span className={styles.alert}>{errorMessage}</span>
      )}
    </div>
  );
}

export default BookingCareContainer;
