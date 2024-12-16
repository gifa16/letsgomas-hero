import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './Navbar.module.scss';
import router from 'next/router';
const Navbar = () => {
  const { data } = useSession();

  return (
    <div className={styles.navbar}>
      <h2 className={styles.navbar__logo} onClick={() => router.push('/')}>
        LET&apos;SGOMAS
      </h2>
      <button className={styles.navbar__button} onClick={() => (data ? signOut() : signIn())}>
        {data ? 'Log out' : 'Log in'}
      </button>
    </div>
  );
};

export default Navbar;
