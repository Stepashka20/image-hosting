import React, { useState,useEffect } from 'react';
import { createStyles } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';


const useStyles = createStyles((theme) => ({
    imagesContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gridAutoRows: "350px",
        gridGap: "10px",
        maxWidth: "90%",
        margin: "auto"
    },
    image: {
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.4)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 10 
    }
}));


const ImageSquares = ({ images }) => {
    const {classes} = useStyles();
    const imagesList = images.map((image, index) => (
        <div
            key={index}
            className={classes.image}
            style={{ backgroundImage: `url(${image})` }}
        />
    ));
    return (
        <div className={classes.imagesContainer}>
            {imagesList}
        </div>
    );
};


export default function ViewImages({}) {
    const [images, setImages] = useState([
        "https://cdn2.thecatapi.com/images/MTY3MjU3OA.jpg",
        "https://cdn2.thecatapi.com/images/GQ61BDToD.jpg",
        "https://i.ibb.co/Yt790Bn/image.png",
        "https://cdn2.thecatapi.com/images/5ii.jpg",
        "https://cdn2.thecatapi.com/images/MTY3MjU3OA.jpg",
        "https://cdn2.thecatapi.com/images/GQ61BDToD.jpg",
        "https://cdn2.thecatapi.com/images/5ii.jpg",
        "https://cdn2.thecatapi.com/images/MTY3MjU3OA.jpg",
        "https://cdn2.thecatapi.com/images/GQ61BDToD.jpg",
        "https://cdn2.thecatapi.com/images/5ii.jpg",
        "https://cdn2.thecatapi.com/images/MTY3MjU3OA.jpg",
        "https://cdn2.thecatapi.com/images/GQ61BDToD.jpg",
        "https://cdn2.thecatapi.com/images/5ii.jpg",
        "https://cdn2.thecatapi.com/images/MTY3MjU3OA.jpg",
        "https://cdn2.thecatapi.com/images/GQ61BDToD.jpg",
    ]);
    const { height, width } = useViewportSize();
    // useEffect(() => {
    //     console.log(width);
    // }, [width])
    return (
        <>
        
        <div style={{maxWidth: "90%", margin: "auto"}}>
            <ImageSquares images={images}/>
        </div>
        </>
    )
}

