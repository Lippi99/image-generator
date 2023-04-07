import { Card, Spin } from "antd";
import NextImage from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./card.module.scss";

interface CardImageProps {
  src: string;
  index: number;
  isLoading: boolean;
}

export const CardImage = ({ src, index, isLoading }: CardImageProps) => {
  const [loading, setLoading] = useState(true);
  const { Meta } = Card;

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <Card
        hoverable
        className={styles.card}
        cover={
          <>
            {loading && (
              <motion.div className={styles.imageContainer}>
                <Spin className={styles.spin} spinning={loading} />
              </motion.div>
            )}
            <NextImage
              fill
              style={{ transform: "translate3d(0, 0, 0)" }}
              alt={`example ${index}`}
              src={src}
              onLoad={handleImageLoad}
            />
          </>
        }
      ></Card>
    </>
  );
};
