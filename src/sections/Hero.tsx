"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/container";
import Icons from "@/components/global/icons";
import { Button } from "@/components/ui/button-2";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import AnimationContainer from "@/components/ui/animation-container";
import dynamic from "next/dynamic";
const ClientOnlyVideo = dynamic(
  () => import("../components/ui/ClientOnlyVideo"),
  { ssr: false }
);

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full py-20 mt-20">
      {/* Mobile background glow */}
      <div
        className="absolute flex lg:hidden size-40 rounded-full 
        bg-orange-300 dark:bg-orange-500 blur-[10rem] top-0 left-1/2 
        -translate-x-1/2 -z-10"
      ></div>

      <div className="flex flex-col items-center justify-center gap-y-8 relative">
        {/* Orbiting Circles Animation - Desktop only */}
        <Container className="hidden lg:flex absolute inset-0 top-0 mb-auto flex-col items-center justify-center w-full min-h-screen -z-10">
          <OrbitingCircles speed={0.5} radius={300}>
            <Icons.circle1 />
            <Icons.circle2 />
          </OrbitingCircles>
          <OrbitingCircles speed={0.25} radius={400}>
            <Icons.circle2 />
            <Icons.circle1 />
            <Icons.circle2 />
          </OrbitingCircles>
          <OrbitingCircles speed={0.1} radius={500}>
            <Icons.circle2 />
            <Icons.circle2 />
            <Icons.circle1 />
            <Icons.circle2 />
          </OrbitingCircles>
        </Container>

        {/* Announcement Banner */}
        <div className="flex flex-col items-center justify-center text-center gap-y-4 bg-background/0">
          <Container className="relative hidden lg:block overflow-hidden">
            <button className="group relative grid overflow-hidden rounded-full px-2 py-1 shadow-[0_1000px_0_0_hsl(0_0%_90%)_inset] dark:shadow-[0_1000px_0_0_hsl(0_0%_15%)_inset] transition-colors duration-200 mx-auto">
              <span>
                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
              </span>
              <span className="backdrop absolute inset-[1px] rounded-full bg-background transition-colors duration-200 " />

              <span className="z-10 py-0.5 text-sm text-neutral-800 dark:text-neutral-100 flex items-center">
                <span className="px-2 py-[0.5px] h-[18px] tracking-wide flex items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-[9px] font-medium mr-2 text-white">
                  ACTUALITÉ
                </span>
                Conseil indépendant en transformation RH & SIRH
              </span>
            </button>
          </Container>

          {/* Main Title */}
          <AnimationContainer delay={0.3}>
            <Container delay={0.15}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center !leading-tight max-w-5xl mx-auto text-neutral-900 dark:text-white">
                Votre partenaire indépendant en{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">
                  transformation RH & SIRH
                </span>
              </h1>
            </Container>
          </AnimationContainer>

          {/* Subtext */}
          <Container delay={0.2}>
            <p className="max-w-xl mx-auto mt-2 text-base lg:text-lg text-center text-muted-foreground text-neutral-600 dark:text-muted-foreground">
              Nous accompagnons les organisations dans l&apos;analyse, la sélection,
              l&apos;implantation et l&apos;optimisation de leurs solutions RH, de la
              définition des besoins jusqu&apos;au déploiement et à l&apos;amélioration
              continue.
            </p>
          </Container>

          {/* CTA */}
          <Container delay={0.25} className="z-20">
            <div className="flex items-center justify-center mt-6 gap-x-4">
              <Link href="/contact" className="flex items-center gap-2 group">
                <Button size="lg">
                  Discuter de votre projet
                  <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-all duration-300" />
                </Button>
              </Link>
              <Link href="/#expertise" className="text-sm font-medium underline underline-offset-4">
                Découvrir nos expertises
              </Link>
            </div>
          </Container>

          {/* Video Showcase with Glow */}
          <Container delay={0.3} className="relative">
            <div className="relative rounded-xl lg:rounded-[32px] border border-border p-2 backdrop-blur-lg mt-10 max-w-6xl mx-auto">
              {/* Glows only in dark mode */}
              <div
                className="hidden dark:block absolute top-1/8 left-1/2 -z-10 
      bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 
      w-1/2 lg:w-3/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 
      blur-[4rem] lg:blur-[10rem] animate-image-glow"
              ></div>

              <div
                className="hidden lg:dark:block absolute -top-1/8 left-1/2 -z-20 
      bg-orange-500 w-1/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 
      blur-[10rem] animate-image-glow"
              ></div>

              {/* Video Display */}
              <ClientOnlyVideo />
            </div>

            {/* Bottom Gradient Fade */}
            <div className="bg-gradient-to-t from-white to-transparent dark:from-background absolute bottom-0 inset-x-0 w-full h-1/2"></div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Hero;
