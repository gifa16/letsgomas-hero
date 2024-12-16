import Sidebar from '@/components/fragments/Sidebar';
import styles from './AdminLayout.module.scss';

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: 'Dashboard',
    url: '/admin',
  },
  {
    title: 'Destination',
    url: '/admin/destinations',
  },
  {
    title: 'Article',
    url: '/admin/articles',
  },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} />
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
};

export default AdminLayout;
