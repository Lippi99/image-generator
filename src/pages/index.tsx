import { Header } from "@/components/Header";
import Head from "next/head";
import NextImage from "next/image";
import styles from "../styles/pages/home.module.scss";
import { motion } from "framer-motion";
import { Input, Button, Select, notification } from "antd";
import { useEffect, useState } from "react";
import { CardImage } from "@/components/Card";
import { startConverting, stopConverting } from "@/service/generate-speechText";
import { Microphone } from "@/components/Microphone";
import { generateImage } from "@/service/generate-image";

type NotificationType = "success" | "info" | "warning" | "error";

export default function Home() {
  const [api, contextHolder] = notification.useNotification();
  const [input, setInput] = useState("");
  const [numberOfImagesToBeGenerated, setNumberOfImagesToBeGenerated] =
    useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [finalTranscripts, setFinalTranscripts] = useState("");
  const [interimTranscripts, setInterimTranscripts] = useState("");
  const [isActivated, setIsActivated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const visible = { opacity: 1, y: 0, transition: { duration: 1 } };

  const { TextArea } = Input;

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Invalid Input",
    });
  };

  const selectOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];

  useEffect(() => {
    if (interimTranscripts) {
      setInput(interimTranscripts);
    }
  }, [interimTranscripts]);

  const handleGenerateImage = async () => {
    setImages([]);
    setIsLoading(true);
    stopConverting();
    setIsActivated(false);
    const data = {
      input,
      numberOfImagesToBeGenerated,
    };
    try {
      const dataImages = await generateImage(data);
      if (dataImages.error) {
        throw new Error(dataImages.error);
      }
      setImages(dataImages.success);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      openNotificationWithIcon("error");
    }
  };

  const activateMicrophone = () => {
    startConverting({
      finalTranscripts,
      interimTranscripts,
      setFinalTranscripts,
      setInterimTranscripts,
    });
  };

  const disableMicrophone = () => {
    stopConverting();
  };

  return (
    <>
      {contextHolder}
      <Head>
        <title>AI generate image</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.main
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        className={styles.container}
      >
        <div>
          <Header />
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible,
            }}
            className={styles.content}
          >
            <div className={styles.imageContainer}>
              <NextImage
                width={500}
                height={220}
                style={{ objectFit: "contain" }}
                src="/metaVerse.svg"
                alt="meta verse"
              />
              <p>
                The metaverse can be defined as a simulated digital environment
                that uses augmented reality, virtual reality, and blockchain to
                create spaces for rich user interaction mimicking the real
                world.
              </p>
              <div className={styles.personContainer}>
                <NextImage
                  fill
                  style={{ objectFit: "contain" }}
                  src="/shape.png"
                  alt="shape"
                />
                <NextImage
                  fill
                  style={{ objectFit: "contain" }}
                  src="/person.png"
                  alt="person"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className={styles.generateImageContainer}>
          <div className={styles.inputContainer}>
            <h1>Generate your images!</h1>
            <TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="A cat jumping in the moon..."
              rows={4}
            />
            <p>Or if you would like to...</p>
            <div className={styles.microphoneContainer}>
              <Microphone
                activateMicrophone={activateMicrophone}
                disableMicrophone={disableMicrophone}
                setIsActivated={setIsActivated}
                isActivated={isActivated}
              />
            </div>
            <Select
              defaultValue={1}
              onChange={(e) => setNumberOfImagesToBeGenerated(Number(e))}
              placeholder="Number of images"
              options={selectOptions}
            ></Select>

            <Button
              loading={isLoading}
              onClick={handleGenerateImage}
              type="primary"
            >
              Generate Images
            </Button>
          </div>
          <section>
            {images &&
              images.map((image, index) => (
                <CardImage
                  key={index}
                  isLoading={isLoading}
                  src={image}
                  index={index}
                />
              ))}
          </section>
        </div>
      </motion.main>
    </>
  );
}
