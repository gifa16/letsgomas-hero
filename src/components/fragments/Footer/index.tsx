import styles from './Footer.module.scss';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h4>Tentang Kami</h4>
          <p>LET&apos;SGOMAS adalah platform yang menyediakan informasi lengkap tentang wisata di Banyumas. Temukan destinasi favorit Anda!</p>
        </div>
        <div className={styles.section}>
          <h4>Kontak Kami</h4>
          <ul>
            <li>Email: info@letsgomas.com</li>
            <li>Telepon: +62 812 3456 7890</li>
          </ul>
        </div>
        <div className={styles.verticalDivider}></div>
        <div className={styles.section}>
          <h4>Ikuti Kami</h4>
          <div className={styles.socialIcons}>
            <a href="https://www.instagram.com/lukemana_" target="_blank" rel="noopener noreferrer">
              <Image src={'/icon_instagram.png'} alt="instagram" width={30} height={30} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100015252965704" target="_blank" rel="noopener noreferrer">
              <Image src={'/icon_facebook.png'} alt="facebook" width={30} height={30} />
            </a>
            <a href="https://x.com/YogiF03" target="_blank" rel="noopener noreferrer">
              <Image src={'/icon_twitter.png'} alt="twitter" width={30} height={30} />
            </a>
            <a href="https://www.tiktok.com/@onlyme_1609" target="_blank" rel="noopener noreferrer">
              <Image src={'/icon_tiktok.png'} alt="tikto" width={30} height={30} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>&copy; 2024 LET&apos;SGOMAS. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;