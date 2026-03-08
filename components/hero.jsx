"use client";

import Link from "next/link";
import { useRef, useEffect } from 'react';
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {

    const imageRef= useRef();
    useEffect(() =>{
        const imageElement= imageRef.current;

        const handleScroll=()=>{
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if( scrollPosition>scrollThreshold){
                imageElement.classList.add("scrolled");
            }else{
                imageElement.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll",handleScroll);

        return()=>window.removeEventListener("scroll",handleScroll);
    },[]);

  return (
    <div className="pb-20 px-4">
        <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-8xl lg:text-[70px] pb-6 gradient-title">
                Track smart, Spend smarter,<br/> Thrive on campus
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Spend Wise Campus is your smart budgeting companion, crafted especially for student life. 
                Whether it’s tracking pocket money, mess fees, or academic expenses, this app helps 
                you stay on top of your finances with intuitive tools and AI-powered insights. Designed 
                to simplify spending decisions and boost financial confidence, it’s more than just an app
                —it’s your everyday ally for thriving on campus.
            </p>
            <div className="flex justify-center space-x-4 ">
                <Link href="/dashboard">
                  <Button size="lg" className="px-8">
                     Get Started
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="px-8">
                     Try now
                  </Button>
                </Link>
            </div>
            <div className="hero-image-wrapper">
					<div ref={imageRef} className="hero-image">
						<Image src="/banner.png" 
                        width={1000} 
                        height={720} 
                        alt="Dashbosrd Preview"
                        className="rouded-lj shadow-2xl border mx-auto"
                        priority
                        />
					</div>
                    </div>
        </div>
        </div>
        )
  }

export default HeroSection;