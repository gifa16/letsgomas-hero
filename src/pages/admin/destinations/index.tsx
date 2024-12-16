import DestinationsAdminView from '@/components/views/admin/Destinations';
import destinationServices from '@/services/destination';
import { useEffect, useState } from 'react';

const AdminDestinationPage = () => {
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
      <DestinationsAdminView destinations={destinations} />
    </>
  );
};

export default AdminDestinationPage;