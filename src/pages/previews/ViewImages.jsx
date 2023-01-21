import React, { useState,useEffect,useCallback } from 'react';
import { createStyles,ActionIcon } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import ImageViewer from "react-simple-image-viewer";
import { IconCopy,IconArrowUpRight,IconPhoto,IconLink } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { copyImageToClipboard } from 'copy-image-clipboard'
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
    },
    imageContainer: {
        position: "relative",

    },
    btnsRow: {
        position: "absolute",
        bottom: 0,
        right: 0,
        display: "flex",
        flexDirection: "row",
        margin: "10px",
        "button": {
            margin: "0 2px"
        }
    }
}));



const MAIN_URL = window.location.origin;

export default function ViewImages({}) {
    const {classes} = useStyles();

    const [images, setImages] = useState([
    ]);

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
      }, []);
    
      const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
      };
    useEffect(() => {
        const t = async () => {
            const key = window.location.pathname.split("/")[1]
            const response = await fetch(`${MAIN_URL}/api/images/${key}`);
            const data = await response.json();
            setImages(data.map((image) => `${MAIN_URL}/img/${image}`))
        }
        t();
    }, [])

    const copyImage = async (image) => {
        const img = new Image();
        img.crossOrigin="anonymous"
        img.src = image;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const blob = canvas.toDataURL("image/png");
            copyImageToClipboard(blob);
            
            showNotification({
                title: "Copied",
                message: "Image copied to clipboard as PNG format",
                color: 'teal',
                icon: <IconPhoto size={16} />,
                autoClose: 1000,
            });
        }
    }

    const copyUrl = (image) => {
        navigator.clipboard.writeText(image);
        showNotification({
            title: "Copied",
            message: "Image URL copied to clipboard",
            color: 'teal',
            icon: <IconLink size={16} />,
            autoClose: 1000,
        });
    }

    const openInNewTab = (image) => {
        window.open(image, '_blank').focus();
    }

    return (
        <>   
        <div style={{maxWidth: "90%", margin: "auto"}}>
            <div className={classes.imagesContainer}>
                {images.map((image, index) => (
                    <div key={index} className={classes.imageContainer}>
                        <div
                            className={classes.image}
                            style={{ backgroundImage: `url(${image})`, height: "100%", width: "100%" }}
                            onClick={() => openImageViewer(index)}
                        >
                        </div>
                        <div className={classes.btnsRow}>
                            <ActionIcon variant="default" onClick={()=>copyImage(image)}><IconPhoto size={16} /></ActionIcon>
                            <ActionIcon variant="default" onClick={()=>copyUrl(image)}><IconCopy size={16} /></ActionIcon>
                            <ActionIcon variant="default" onClick={()=>openInNewTab(image)}><IconArrowUpRight size={16} /></ActionIcon>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
        {isViewerOpen && (
            <ImageViewer
                src={images}
                currentIndex={currentImage}
                onClose={closeImageViewer}
                disableScroll={false}
                backgroundStyle={{
                    backgroundColor: "rgba(0,0,0,0.9)"
                }}
                closeOnClickOutside={true}
            />
        )}
        </>
    )
}

