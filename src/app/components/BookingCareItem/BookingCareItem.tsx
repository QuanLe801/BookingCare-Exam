import { BookingCareProps } from '@/app/types/BookingCareInterface';
import styles from './style.module.css';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function BookingCareItem({ ...props }: BookingCareProps) {
  const { link, title, snippet, imgUrl } = props;
  return (
    <div className={styles.card_wrapper}>
      <Link href={link} target="_blank">
        <div className={styles.card_header}>
          <Image src={imgUrl} alt="" width={300} height={300} />
        </div>
        <div className={styles.card_content}>
          <h5 className={styles.card_title}>{title}</h5>
          <span className={styles.card_description}>{snippet}</span>
        </div>
      </Link>
    </div>
  );
  {
    imgUrl;
  }
}

export default BookingCareItem;
