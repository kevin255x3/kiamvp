import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import LazyMedia from './LazyMedia';

const LandingPage = () => {
    const navigate = useNavigate();
    const pageRef = useRef(null);
    const imageRef = useRef(null);
    const buttonRef = useRef(null);
    const whiteOverlayRef = useRef(null);

    useEffect(() => {
        // Initial page load animation
        const tl = gsap.timeline();

        gsap.set([imageRef.current, buttonRef.current], {
            opacity: 0
        });

        tl.to(imageRef.current, {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power2.out"
        })
            .to(buttonRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.6");
    }, []);

    const handleEnter = () => {
        // Show white overlay first
        const tl = gsap.timeline({
            onComplete: () => navigate('/carousel')
        });

        tl.to(imageRef.current, {
            scale: 1.1,
            rotation: 360,
            duration: 0.8,
            ease: "power2.inOut"
        })
            .to(whiteOverlayRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.inOut"
            }, "-=0.3");
    };

    return (
        <>
            <div ref={whiteOverlayRef} className="fixed inset-0 bg-white z-50 pointer-events-none" style={{ opacity: 0 }} />

            <div ref={pageRef} className="min-h-screen bg-white text-black flex items-center justify-center">
                <main className="w-full">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
                        <div
                            ref={imageRef}
                            onClick={handleEnter}
                            className="cursor-pointer w-full aspect-[3/4] max-w-[280px] sm:max-w-md md:max-w-xl mx-auto mb-4 sm:mb-6 md:mb-8 bg-white hover:opacity-95 transition-opacity"
                        >
                            <LazyMedia
                                src="/magcover.jpg"
                                alt="MVP Race Hero"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="flex justify-center items-start max-w-[280px] sm:max-w-md md:max-w-xl mx-auto">
                            <button
                                ref={buttonRef}
                                onClick={handleEnter}
                                className="text-xs sm:text-sm uppercase tracking-wide hover:opacity-60 transition-opacity"
                            >
                                Enter →
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default LandingPage;