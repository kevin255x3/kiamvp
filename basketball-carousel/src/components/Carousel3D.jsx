import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import LazyMedia from './LazyMedia';

const Carousel3D = ({ items }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);

    const handleCardClick = (item, index) => {
        if (index !== currentIndex) return;

        const card = containerRef.current.children[index];

        const otherCards = [...containerRef.current.children].filter((_, idx) => idx !== index);
        gsap.to(otherCards, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "power2.inOut"
        });

        const tl = gsap.timeline({
            onComplete: () => navigate(`/player/${item.id}`)
        });

        tl.to(card, {
            scale: 1.2,
            zIndex: 50,
            duration: 0.5,
            ease: "power2.inOut"
        })
            .to(card, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            }, "-=0.1");
    };

    useEffect(() => {
        const cards = containerRef.current.children;
        const totalCards = items.length;

        // Clear any existing animations
        gsap.killTweensOf(cards);

        Array.from(cards).forEach((card, idx) => {
            const angle = ((idx - currentIndex) * (2 * Math.PI)) / totalCards;

            // Tighter radius but pushed back
            const xOffset = Math.sin(angle) * 800;
            const zOffset = Math.cos(angle) * 400;

            // Kill any existing animations on this card
            gsap.killTweensOf(card);

            // Position animation
            gsap.to(card, {
                x: xOffset,
                z: -200,
                scale: idx === currentIndex ? 1 : 0.85,
                opacity: idx === currentIndex ? 1 : 0.5,
                rotateY: 0,
                duration: 1.2,
                ease: "power2.inOut"
            });

            // Separate floating animation that starts after position is set
            gsap.to(card, {
                y: '+=25',
                duration: 3.5,
                delay: idx * 0.25 + 1.2, // Start after position animation completes
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    }, [currentIndex, items.length]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white overflow-hidden">
            <div className="relative w-full max-w-[1600px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px]">
                <div
                    ref={containerRef}
                    className="relative w-full h-full flex items-center justify-center"
                    style={{
                        transform: 'translateY(-5%) translateZ(200px)',
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="absolute flex flex-col items-center cursor-pointer transform-gpu"
                            style={{
                                width: 'min(70vw, 280px)',
                                maxWidth: '400px',
                                willChange: 'transform',
                            }}
                            onClick={() => handleCardClick(item, index)}
                        >
                            <div className="w-full aspect-[3/4] bg-white">
                                <LazyMedia
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transform-gpu"
                                />
                            </div>

                            <h3 className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black text-center">
                                {item.title}
                            </h3>

                            <div className="mt-1 sm:mt-2 md:mt-3 w-20 sm:w-24 md:w-28 lg:w-32 h-10 sm:h-12 md:h-14 lg:h-16 overflow-hidden">
                                <LazyMedia
                                    type="video"
                                    src={item.teamLogoVideo}
                                    videoProps={{
                                        autoPlay: true,
                                        loop: true,
                                        muted: true,
                                        playsInline: true
                                    }}
                                    className="w-full h-full object-cover transform-gpu"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute left-0 right-0 flex justify-center items-center gap-8 sm:gap-10 md:gap-12 z-10
                               -bottom-16 sm:-bottom-20 md:bottom-0 lg:bottom-8">
                    <button
                        onClick={handlePrev}
                        className="p-2 text-black hover:scale-110 transition-transform duration-300"
                    >
                        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="p-2 text-black hover:scale-110 transition-transform duration-300"
                    >
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carousel3D;