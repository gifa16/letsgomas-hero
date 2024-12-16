/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import destinationServices from '@/services/destination';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';

const ModalUpdateDestination = (props: any) => {
  const { updatedDestination, setUpdatedDestination, setDestinationsData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();
  const handleUpdateDestination = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      name: form.name.value.trim(),
      description: form.description.value.trim(),
      location: form.location.value.trim(),
      opening_hours: form.open.value.trim(),
      close_hours: form.close.value.trim(),
      contact: form.contact.value.trim(),
    };

    const result = await destinationServices.updateDestination(updatedDestination.id, data, session.data?.accessToken);
    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedDestination({});
      const { data } = await destinationServices.getAllDestinations();
      setDestinationsData(data.data);
    } else {
      setIsLoading(false);
    }
  };
  return (
    <Modal onClose={() => setUpdatedDestination({})}>
      <h1>Ubah Destinasi</h1>
      <form onSubmit={handleUpdateDestination}>
        <Input label="Nama" name="name" type="text" defaultValue={updatedDestination.name} />
        <Input label="Deskripsi" name="description" type="text" defaultValue={updatedDestination.description} />
        <Input label="Lokasi" name="location" type="text" defaultValue={updatedDestination.location} />
        <Input label="Jam Buka" name="open" type="text" defaultValue={updatedDestination.opening_hours} />
        <Input label="Jam Tutup" name="close" type="text" defaultValue={updatedDestination.close_hours} />
        <Input label="Kontak" name="contact" type="number" defaultValue={updatedDestination.contact} />
        <Button type="submit">{isLoading ? 'Updating...' : 'Update'}</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateDestination;
