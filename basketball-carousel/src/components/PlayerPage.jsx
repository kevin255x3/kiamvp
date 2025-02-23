import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { players } from '../data/players';
import { useNavigate, useParams } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import LazyMedia from './LazyMedia';

gsap.registerPlugin(ScrollTrigger);

const PlayerPage = () => {
    const [player, setPlayer] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    // Refs for animations
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const titleRef = useRef(null);
    const statsRef = useRef(null);
    const statsItemsRef = useRef([]);
    const accoladesRef = useRef(null);
    const achievementsRef = useRef(null);
    const teamLogoRef = useRef(null);

    useEffect(() => {
        const playerData = players.find(p => p.id === parseInt(id));
        setPlayer(playerData);
    }, [id]);

    useEffect(() => {
        if (!player) return;

        // Initial page load animations
        const tl = gsap.timeline();

        tl.from(videoRef.current, {
            scale: 1.1,
            duration: 2,
            ease: "power2.out"
        })
            .from(titleRef.current.children, {
                y: 30,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=1.5");

        // Stats section scroll animation
        statsItemsRef.current.forEach((stat, index) => {
            gsap.from(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: "top 85%",
                    end: "top 65%",
                    scrub: 1
                },
                y: 50,
                opacity: 0,
                duration: 1,
                delay: index * 0.1
            });
        });

        // Accolades title and intro scroll animation
        gsap.from(accoladesRef.current, {
            scrollTrigger: {
                trigger: accoladesRef.current,
                start: "top 80%",
                end: "top 60%",
                scrub: 1
            },
            y: 30,
            opacity: 0,
            duration: 1
        });

        // Achievements scroll animations
        const achievements = achievementsRef.current.children;
        Array.from(achievements).forEach((achievement, index) => {
            gsap.from(achievement, {
                scrollTrigger: {
                    trigger: achievement,
                    start: "top 85%",
                    end: "top 75%",
                    scrub: 1
                },
                x: -20,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1
            });
        });

        // Team logo reveal
        gsap.from(teamLogoRef.current, {
            scrollTrigger: {
                trigger: teamLogoRef.current,
                start: "top 85%",
                end: "top 65%",
                scrub: 1
            },
            y: 20,
            opacity: 0,
            duration: 1
        });

    }, [player]);

    if (!player) return null;

    return (
        <div className="min-h-screen bg-white text-black" ref={containerRef}>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
                    <button
                        onClick={() => navigate('/carousel')}
                        className="text-white flex items-center gap-1 sm:gap-2 hover:scale-110 transition-transform duration-300"
                    >
                        <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    </button>
                </div>
            </nav>

            {/* Main Content Container */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
                {/* Hero Section */}
                <section className="pt-20 sm:pt-24 md:pt-32">
                    <div
                        ref={videoRef}
                        className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-8 sm:mb-12 md:mb-16"
                    >
                        <LazyMedia
                            type="video"
                            src={player.highlightVideo}
                            videoProps={{
                                autoPlay: true,
                                loop: true,
                                muted: true,
                                playsInline: true
                            }}
                            className="w-full h-full object-cover transform-gpu"
                        />
                    </div>

                    <div ref={titleRef} className="mb-16 sm:mb-24 md:mb-32">
                        <h1 className="text-4xl sm:text-6xl md:text-[80px] lg:text-[100px] font-bold text-black leading-none tracking-tight mb-3 sm:mb-4 md:mb-6">
                            {player.title}
                        </h1>
                        <p className="text-xl sm:text-2xl md:text-3xl text-black/60 font-light tracking-wide">
                            {player.year}
                        </p>
                    </div>
                </section>

                {/* Stats Grid */}
                <section ref={statsRef} className="pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-24 md:pb-32">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 sm:gap-x-16 md:gap-x-24 gap-y-8 sm:gap-y-12 md:gap-y-16">
                        {player.stats.map((stat, index) => (
                            <div
                                key={index}
                                ref={el => statsItemsRef.current[index] = el}
                                className="flex flex-col items-start"
                            >
                                <span className="text-base sm:text-lg text-black/40 mb-2 sm:mb-3 md:mb-4 font-medium">
                                    {stat.title}
                                </span>
                                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-3 leading-none">
                                    {stat.value}
                                </span>
                                <span className="text-lg sm:text-xl text-black/60 font-light">
                                    {stat.highlight}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Divider */}
                <div className="w-full h-px bg-black/10"></div>

                {/* Accolades Section */}
                <section className="py-16 sm:py-24 md:py-32 flex flex-col items-center text-center">
                    <div ref={accoladesRef}>
                        <h2 className="text-xl sm:text-2xl font-bold mb-8 sm:mb-12 md:mb-16 tracking-tight">
                            CAREER HIGHLIGHTS & ACHIEVEMENTS
                        </h2>

                        <div className="max-w-[800px] px-4 sm:px-6 md:px-8">
                            <p className="text-2xl sm:text-3xl md:text-[32px] leading-tight tracking-tight font-light mb-12 sm:mb-16 md:mb-20">
                                {player.accolades.split('•')[0].trim()}
                            </p>
                        </div>
                    </div>

                    <div className="max-w-[800px] w-full px-4 sm:px-6 md:px-8">
                        <div ref={achievementsRef} className="grid grid-cols-1 gap-y-8 sm:gap-y-10 md:gap-y-12 text-left">
                            {player.accolades.split('•').slice(1).map((text, index) => (
                                <div
                                    key={index}
                                    className="group flex items-start gap-4 sm:gap-5 md:gap-6 hover:bg-black/[0.02] transition-colors p-3 sm:p-4 -mx-3 sm:-mx-4 rounded-lg"
                                >
                                    <span className="text-lg sm:text-xl font-bold mt-1">0{index + 1}</span>
                                    <p className="text-lg sm:text-xl leading-relaxed tracking-wide">
                                        {text.trim()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Logo */}
                    <div ref={teamLogoRef} className="mt-16 sm:mt-24 md:mt-32 flex flex-col items-center gap-6 sm:gap-7 md:gap-8">
                        <div className="w-32 sm:w-36 md:w-40 h-16 sm:h-18 md:h-20 overflow-hidden">
                            <LazyMedia
                                type="video"
                                src={player.teamLogoVideo}
                                videoProps={{
                                    autoPlay: true,
                                    loop: true,
                                    muted: true,
                                    playsInline: true
                                }}
                                className="w-full h-full object-cover transform-gpu"
                            />
                        </div>
                        <span className="text-xs sm:text-sm font-medium tracking-wider text-black/40 uppercase">
                            Current Team
                        </span>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PlayerPage;