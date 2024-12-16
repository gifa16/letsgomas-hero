/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import destinationServices from '@/services/destination';
import { useSession } from 'next-auth/react';
import styles from './ModalDeleteContent.module.scss';

const ModalDeleteDestination = (props: any) => {
  const { deletedDestination, setDeletedDestination, setDestinationsData } = props;
  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!session?.accessToken) {
      console.error('No access token found');
      return;
    }

    try {
      await destinationServices.deleteDestination(deletedDestination.id, session.accessToken);

      setDeletedDestination({});

      const { data } = await destinationServices.getAllDestinations();
      setDestinationsData(data.data);
    } catch (error: any) {
      console.error('Error deleting content:', error.response?.data || error.message);
    }
  };
  return (
    <Modal onClose={() => setDeletedDestination({})}>
      <h1>Apakah anda yakin?</h1>
      <Button
        type="button"
        onClick={() => {
          handleDelete();
        }}
        className={styles.modal__button}
      >
        Hapus
      </Button>
    </Modal>
  );
};

export default ModalDeleteDestination;
