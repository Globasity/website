import React, { useState, useEffect } from 'react';
// import './ImageWithLoader.css'; // Import your CSS file for styling
import Skeleton from '@mui/material/Skeleton';
const ImageLoader = ({ imageUrl, classes }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => setLoading(false);
    }, [imageUrl]);

    return (
        <div className={classes} style={{ borderRadius: "inherit" }}>
            {loading ? (
                <>
                    <Skeleton variant="rectangular" className='skelet ' style={{ borderRadius: "inherit" }} />
                </>
            ) : (
                <img
                    src={imageUrl}
                    alt={""}
                    loading="lazy"
                    className={classes}
                    style={{ borderRadius: "inherit" }}
                />
            )}
        </div>
    );
};

export default ImageLoader;
