"use client";

import Link from "next/link";
import AnimationContainer from "@/components/ui/animation-container";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const Footer = () => {
  return (
    <div className="w-full bg-background dark:bg-neutral-950 text-foreground transition-colors">
      <footer className="flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 md:pb-0 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32">
        {/* Separator pill */}
        <div className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-muted rounded-full"></div>

        {/* Main grid */}
        <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
          <AnimationContainer delay={0.1}>
            <div className="flex flex-col items-start justify-start md:max-w-[200px]">
              <div className="flex items-start">
                <img
                  src="/images/logo-2.png"
                  alt="logo"
                  width={40}
                  height={40}
                />
              </div>
              <p className="text-muted-foreground mt-4 text-sm text-start">
                HROps Consulting Inc.
                <span className="mt-2 block">
                  Conseil en transformation RH & SIRH. Québec, Canada.
                </span>
              </p>

              <span className="mt-4 text-muted-foreground text-sm flex items-center">
                Made by{" "}
                <Link
                  href="https://adaptifystudio.com"
                  className="font-semibold ml-1 underline underline-offset-4 hover:text-primary"
                >
                  Adaptify Studio
                </Link>
              </span>
            </div>
          </AnimationContainer>

          {/* Navigation links */}
          <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <AnimationContainer delay={0.2}>
                <div>
                  <h3 className="text-base font-medium text-foreground">
                    Services
                  </h3>
                  <ul className="mt-4 text-sm text-muted-foreground space-y-2">
                    <li>
                      <Link
                        href="/#expertise"
                        className="hover:text-primary transition-all"
                      >
                        Nos expertises
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/#secteurs"
                        className="hover:text-primary transition-all"
                      >
                        Secteurs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="hover:text-primary transition-all"
                      >
                        Discuter de votre projet
                      </Link>
                    </li>
                  </ul>
                </div>
              </AnimationContainer>

              <AnimationContainer delay={0.3}>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-base font-medium text-foreground">
                    Connectez-vous avec nous
                  </h3>
                  <ul className="mt-4 text-sm text-muted-foreground space-y-2">
                    <li>
                      <Link
                        href="https://www.linkedin.com/company/hrops-consulting/"
                        className="hover:text-primary transition-all"
                      >
                        LinkedIn
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="mailto:contact@hrops-consulting.com"
                        className="hover:text-primary transition-all"
                      >
                        Envoyez-nous un courriel
                      </Link>
                    </li>
                  </ul>
                </div>
              </AnimationContainer>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              <AnimationContainer delay={0.4}>
                <div>
                  <h3 className="text-base font-medium text-foreground">
                    Ressources
                  </h3>
                  <ul className="mt-4 text-sm text-muted-foreground space-y-2">
                    <li>
                      <Link
                        href="/blog"
                        className="hover:text-primary transition-all"
                      >
                        Blog et informations
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="hover:text-primary transition-all"
                      >
                        Centre d'aide
                      </Link>
                    </li>
                  </ul>
                </div>
              </AnimationContainer>

              <AnimationContainer delay={0.5}>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-base font-medium text-foreground">
                    Company
                  </h3>
                  <ul className="mt-4 text-sm text-muted-foreground space-y-2">
                    <li>
                      <Link
                        href="/privacy"
                        className="hover:text-primary transition-all"
                      >
                        Politique de confidentialité
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => window.dispatchEvent(new Event("open-cookie-preferences"))}
                        className="hover:text-primary transition-all"
                      >
                        Gérer mes témoins
                      </button>
                    </li>
                    <li>
                      <Link
                        href="/terms"
                        className="hover:text-primary transition-all"
                      >
                        Conditions d&apos;utilisation
                      </Link>
                    </li>
                  </ul>
                </div>
              </AnimationContainer>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between w-full">
          <AnimationContainer delay={0.6}>
            <p className="text-sm text-muted-foreground mt-8 md:mt-0">
              &copy; {new Date().getFullYear()} HROps Consulting Inc. Tous droits réservés. Québec, Canada.
            </p>
          </AnimationContainer>
        </div>

        {/* Branding text */}
        <div className="h-[20rem] w-full flex items-center justify-center">
          <TextHoverEffect text="HROPS" />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
