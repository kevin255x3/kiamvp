import React, { useState, useEffect } from 'react';

const LazyMedia = ({
    src,
    type = 'image',
    alt = '',
    className = '',
    videoProps = {},
    preload = 'auto'
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!src) return;
        setIsLoading(true);
        setHasError(false);
    }, [src]);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    const commonStyles = {
        transform: 'translate3d(0,0,0)',
        WebkitTransform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
        WebkitTransformStyle: 'preserve-3d',
        touchAction: 'manipulation'
    };

    if (type === 'video') {
        return (
            <div
                className={`relative ${className}`}
                style={{ ...commonStyles }}
            >
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                )}
                <video
                    {...videoProps}
                    preload={preload}
                    onLoadedData={handleLoad}
                    onError={handleError}
                    className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                    style={{ ...commonStyles }}
                >
                    <source src={src} type="video/mp4" />
                </video>
            </div>
        );
    }

    return (
        <div
            className={`relative ${className}`}
            style={{ ...commonStyles }}
        >
            {isLoading && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            )}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={handleLoad}
                onError={handleError}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                style={{ ...commonStyles }}
            />
        </div>
    );
};

export default LazyMedia;