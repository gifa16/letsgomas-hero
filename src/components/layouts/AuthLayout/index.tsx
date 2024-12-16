import styles from './AuthLayout.module.scss';

type Proptypes = {
  error?: string;
  title?: string;
  children: React.ReactNode;
};

const AuthLayout = (props: Proptypes) => {
  const { error, title, children } = props;
  return (
    <div className={styles.auth}>
      <h1 className={styles.auth__title}>{title}</h1>
      {error && <p className={styles.auth__error}>{error}</p>}
      <div className={styles.auth__form}>{children}</div>
    </div>
  );
};

export default AuthLayout;
