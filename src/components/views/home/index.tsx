/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import Image from 'next/image';
import { Content as FirebaseContent } from 'firebase/vertexai-preview';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/router';
import Footer from '@/components/fragments/Footer';

type Content = FirebaseContent & {
  name: string;
  average_rating: number;
  image_1: string;
  image_2: string;
  image_3: string;
};

type PropTypes = {
  destinations: Content[];
};

const HomeView = (props: PropTypes) => {
  const { destinations } = props;
  const [destinationsData, setDestinationsData] = useState<Content[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter(); 

  useEffect(() => {
    const filteredData = destinations.filter((destination) => destination.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setDestinationsData(filteredData);
  }, [searchQuery, destinations]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.titleSearch}>Mau ke mana?</h2>
        <div className={styles.search}>
          <div className={styles.searchInput}>
            <div className={styles.searchIcon}>
              <Image src={'/icon_search.png'} alt="search" width={20} height={20} />
            </div>
            <Input
              type="text"
              placeholder="Cari"
              name="search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Button type="button" onClick={() => router.push('/articles')}>
            Artikel
          </Button>
        </div>
        <h2 className={styles.subtitle}>Objek Wisata di Banyumas</h2>
        <div className={styles.destinationObjects}>
          {destinationsData.length > 0 ? (
            destinationsData.map((destination: any) => (
              <div
                key={destination.id}
                className={styles.destinationObject}
                onClick={() => router.push(`/destination/${destination.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.objectDetails}>
                  <h2>{destination.name}</h2>
                  <div className={styles.rating}>
                    {[...Array(destination.average_rating)].map((_, index) => (
                      <span key={index} className={styles.star}>
                        ★
                      </span>
                    ))}
                  </div>
                  <Button type="button" onClick={() => router.push(`/review/${destination.id}`)}>
                    Tambah Ulasan
                  </Button>
                </div>
                <div className={styles.imageDestination}>
                  <Image src={`/images/${destination.image_1}`} alt={destination.name} width={200} height={200} />
                  <Image src={`/images/${destination.image_2}`} alt={destination.name} width={200} height={200} />
                  <Image src={`/images/${destination.image_3}`} alt={destination.name} width={200} height={200} />
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>Tidak ada hasil yang ditemukan untuk pencarian Anda. </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeView;