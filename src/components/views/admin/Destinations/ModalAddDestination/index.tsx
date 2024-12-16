/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import destinationServices from '@/services/destination';
import { Content } from 'firebase/vertexai-preview';
import { useSession } from 'next-auth/react';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

type Proptypes = {
  setModalAddDestination: Dispatch<SetStateAction<boolean>>;
  setDestinationsData: Dispatch<SetStateAction<Content[]>>;
};

const ModalAddDestination = (props: Proptypes) => {
  const { setModalAddDestination, setDestinationsData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

    const result = await destinationServices.addDestination(data, session.data?.accessToken);
    if (result.status === 200) {
      setIsLoading(false);
      form.reset();
      const { data } = await destinationServices.getAllDestinations();
      setDestinationsData(data.data);
    } else {
      setIsLoading(false);
    }
  };
  return (
    <Modal onClose={() => setModalAddDestination(false)}>
      <h1>Tambah Destinasi</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Nama" name="name" type="text" />
        <Input label="Deskripsi" name="description" type="text" />
        <Input label="Lokasi" name="location" type="text" />
        <Input label="Jam Buka" name="open" type="text" />
        <Input label="Jam Tutup" name="close" type="text" />
        <Input label="Kontak" name="contact" type="number" />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Tambah Destinasi'}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddDestination;
