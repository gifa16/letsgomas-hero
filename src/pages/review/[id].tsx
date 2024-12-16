import { GetServerSideProps } from 'next';
import { useState } from 'react';
import styles from './Review.module.scss';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Timestamp } from 'firebase/firestore';

type ReviewProps = {
    review: {
        id: string;
        rating: number;
        comment: string;
        createdAt: Timestamp;
    };
    destination: {
        name: string;
        image_1: string;
    }
};

const ReviewPage = ({ review, destination }: ReviewProps) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = () => {
        console.log({ comment, rating, review });
        alert('Ulasan berhasil disubmit!');
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.leftColumn}>
                    <div className={styles.reviewTitle}>Beri tahu kami tentang kunjungan Anda.</div>
                    <div className={styles.reviewImage}>
                        <Image src={`/images/${destination.image_1}`} alt={destination.name} width={300} height={300} />
                        <p>{destination.name}</p>
                    </div>
                </div>
                <div className={styles.verticalDivider}></div>
                <div className={styles.rightColumn}>
                    <div className={styles.ratingContainer}>
                        <p>Bagaimana penilaian Anda tentang pengalaman Anda?</p>
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                className={`${styles.star} ${rating > index ? styles.selected : ''}`}
                                onClick={() => setRating(index + 1)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <div className={styles.form}>
                        <p>Tulis Ulasan</p>
                        <textarea
                            maxLength={280}
                            className={styles.commentBox}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Bagikan detail pengalaman Anda sendiri di tempat ini' />
                        <Button type="button" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/destination?id=${id}`);
    const data = await res.json();

    if (!data.status) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            destination: data.data,
        },
    };
};

export default ReviewPage;