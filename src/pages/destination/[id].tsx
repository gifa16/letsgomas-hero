// DetailDestination.tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styles from './Detail.module.scss';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Timestamp } from 'firebase/firestore';

type DestinationProps = {
  destination: {
    id: string;
    name: string;
    description: string;
    image_1: string;
    image_2: string;
    image_3: string;
    location: string;
    contact: string;
    opening_hours: string;
    close_hours: string;
    average_rating: number;
    reviews: [];
    created_at: Timestamp;
    updated_at: Timestamp;
    rating: number;
    comment: string;
  };

  review: {
    id: string;
    rating: number;
    comment: string;
    created_at: Timestamp;
  }
};

const DetailDestination = ({ destination }: DestinationProps) => {
  const router = useRouter();

  if (!destination) {
    return <p>Loading...</p>;
  }


  const days = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>{destination.name}</h1>
        </header>
        <div className={styles.rating}>
          {[...Array(destination.average_rating)].map((_, index) => (
            <span key={index} className={styles.star}>
              ★
            </span>
          ))}
        </div>
        <div className={styles.imageGallery}>
          {[destination.image_1, destination.image_2, destination.image_3].map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image src={`/images/${image}`} alt={`${destination.name} ${index + 1}`} width={350} height={300} />
            </div>
          ))}
        </div>
        <div className={styles.details}>
          <p className={styles.description}>{destination.description}</p>
          <div className={styles.location}>
            <div className={styles.locationIcon}>
              <Image src={'/icon_location.png'} alt="search" width={25} height={25} />
            </div>
            <p>
              {destination.location}
            </p>
          </div>
          <div className={styles.hours}>
            <div className={styles.clockIcon}>
              <Image src={'/icon_clock.png'} alt="search" width={25} height={25} />
            </div>
            <div className={styles.hoursContent}>
              {days.map((day) => (
                <div key={day} className={styles.dayHours}>
                  <p className={styles.day}>{day}</p>
                  <p className={styles.hoursRange}>
                    {destination.opening_hours} - {destination.close_hours}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.contact}>
            <div className={styles.contactIcon}>
              <Image src={'/icon_contact.png'} alt="search" width={25} height={25} />
            </div>
            <p>{destination.contact}</p>
          </div>
        </div>
        {/* <div className={styles.review}>
          <div className={styles.rating}>
          {[...Array(destination.rating)].map((_, index) => (
            <span key={index} className={styles.star}>
              ★
            </span>
          ))}
          </div>
          <div className={styles.comment}>
            <p>{destination.comment}</p>
          </div>
        </div> */}
        <Button type="button" onClick={() => router.push('/')}>
          Kembali
        </Button>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/destination?id=${id}`);
  const data = await res.json();

  if (!data.status) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      destination: data.data,
    },
  };
};

export default DetailDestination;