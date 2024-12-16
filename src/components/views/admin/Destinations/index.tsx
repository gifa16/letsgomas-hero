/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/ui/Button';
import styles from './Contents.module.scss';
import { useEffect, useState } from 'react';
import ModalUpdateDestination from './ModalUpdateDestination';
import ModalDeleteDestination from './ModalDeleteDestination';
import ModalAddDestination from './ModalAddDestination';
import { Content } from 'firebase/vertexai-preview';

type PropTypes = {
  destinations: Content[];
};

const DestinationsAdminView = (props: PropTypes) => {
  const { destinations } = props;
  const [updatedDestination, setUpdatedDestination] = useState<any>({});
  const [deletedDestination, setDeletedDestination] = useState<any>({});
  const [modalAddDestination, setModalAddDestination] = useState(false);
  const [destinationsData, setDestinationsData] = useState<Content[]>([]);

  useEffect(() => {
    setDestinationsData(destinations);
  }, [destinations]);

  return (
    <>
      <AdminLayout>
        <div className={styles.destination}>
          <h1>Manajemen Destinasi</h1>
          <Button type="button" className={styles.destination__button} onClick={() => setModalAddDestination(true)}>
            Tambah Destinasi
          </Button>
          <div className={styles.destination__wrapper}>
            <table className={styles.destination__table}>
              <thead className={styles.destination__thead}>
                <tr>
                  <th className={styles.destination__th}>#</th>
                  <th className={styles.destination__th}>Name</th>
                  <th className={styles.destination__th}>Description</th>
                  <th className={styles.destination__th}>Location</th>
                  <th className={styles.destination__th}>Open</th>
                  <th className={styles.destination__th}>Close</th>
                  <th className={styles.destination__th}>contact</th>
                  <th className={styles.destination__th}>Action</th>
                </tr>
              </thead>
              <tbody className={styles.destination__tbody}>
                {destinationsData.map((destination: any, index: number) => (
                  <tr key={destination.id}>
                    <td className={styles.destination__td}>{index + 1}</td>
                    <td className={styles.destination__td}>{destination.name}</td>
                    <td className={styles.destination__td}>{destination.description}</td>
                    <td className={styles.destination__td}>{destination.location}</td>
                    <td className={styles.destination__td}>{destination.opening_hours}</td>
                    <td className={styles.destination__td}>{destination.close_hours}</td>
                    <td className={styles.destination__td}>{destination.contact}</td>
                    <td className={styles.destination__td}>
                      <div className={styles.destination__action}>
                        <Button type="button" variant="secondary" className={styles.destination__buttonUpdate} onClick={() => setUpdatedDestination(destination)}>
                          Ubah
                        </Button>
                        <Button type="button" variant="secondary" className={styles.destination__buttonDelete} onClick={() => setDeletedDestination(destination)}>
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
      {modalAddDestination && <ModalAddDestination setModalAddDestination={setModalAddDestination} setDestinationsData={setDestinationsData} />}
      {Object.keys(updatedDestination).length > 0 ? <ModalUpdateDestination updatedDestination={updatedDestination} setUpdatedDestination={setUpdatedDestination} setDestinationsData={setDestinationsData} /> : null}

      {Object.keys(deletedDestination).length > 0 ? <ModalDeleteDestination deletedDestination={deletedDestination} setDeletedDestination={setDeletedDestination} setDestinationsData={setDestinationsData} /> : null}
    </>
  );
};

export default DestinationsAdminView;
