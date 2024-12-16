import HomeView from '@/components/views/home';
import destinationServices from '@/services/destination';
import { useEffect, useState } from 'react';

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    const getAllDestinations = async () => {
      const { data } = await destinationServices.getAllDestinations();
      setDestinations(data.data);
    };
    getAllDestinations();
  }, []);
  return (
    <>
      <HomeView destinations={destinations} />
    </>
  );
}
