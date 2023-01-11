import React, { useState } from 'react';
import { Carousel,useAnimationOffsetEffect  } from '@mantine/carousel';
import { Header, Image,Container,Text } from '@mantine/core';

export default function ViewImages({}) {
    const [images, setImages] = useState([
        "https://cdn2.thecatapi.com/images/MTY3MjU3OA.jpg",
        "https://cdn2.thecatapi.com/images/GQ61BDToD.jpg",
        "https://cdn2.thecatapi.com/images/5ii.jpg"
    ]);
    const [embla, setEmbla] = useState(null);
    useAnimationOffsetEffect(embla, 200);
    return (
        <>
        <Header height={56} mb={40}>
            <Container style={{display: "flex", alignItems: "center", height: 56, justifyContent: "center"}}>
                <Text size="xl" weight={700} color="white">
                    Image Hosting
                </Text>
            </Container>
        </Header>
        <div style={{maxWidth: "90%", margin: "auto"}}>
            {images.map((url) => (
                <Image src={url} />
            ))}
        </div>
        </>
    )
}

