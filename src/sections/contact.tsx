"use client";
import React from "react";
import { IconMailFilled } from "@tabler/icons-react";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { GlobeDemo } from "@/components/ui/GlobeDemo";
import { toast } from "sonner"; 



export default function ContactFormGridWithDetails() {
  return (
    <div className="mx-auto mt-16 grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-10 md:px-6 md:py-20 lg:grid-cols-2">
      <div className="relative flex flex-col items-center overflow-hidden lg:items-start">
        <div className="flex items-start justify-start">
          <FeatureIconContainer className="flex items-center justify-center overflow-hidden">
            <IconMailFilled className="h-6 w-6 text-orange-500" />
          </FeatureIconContainer>
        </div>
        <h2 className="mt-9 bg-gradient-to-b from-neutral-800 to-neutral-900 bg-clip-text text-left text-xl font-bold text-transparent md:text-3xl lg:text-5xl dark:from-neutral-200 dark:to-neutral-300">
          Contactez HROps Consulting Inc.
        </h2>
        <p className="mt-8 max-w-lg text-center text-base text-neutral-600 md:text-left dark:text-neutral-400">
          Pour toute question ou demande de renseignements, n’hésitez pas à nous contacter. Nous vous répondrons dans les plus brefs délais.
        </p>

        <div className="mt-10 flex flex-col gap-3 text-sm text-neutral-500 dark:text-neutral-400">
          <p>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">Email :</span>{" "}
            <a href="mailto:contact@hrops-consulting.com" className="underline hover:text-orange-500 transition">
              contact@hrops-consulting.com
            </a>
          </p>
          <p>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">Téléphone :</span>{" "}
            <a href="tel:+14383214864" className="underline hover:text-orange-500 transition">
              +1 (438) 321-4864
            </a>
          </p>
          <p>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">Adresse :</span>{" "}
            <a
              
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-orange-500 transition"
            >
               Montreal, Quebec
            </a>
          </p>
        </div>

        {/* 🌐 Globe replacing the old world.svg */}
        <div className="relative mt-16 w-full h-[400px] sm:h-[500px] lg:h-[600px]">
          <GlobeDemo />
        </div>
      </div>

      {/* Contact Form Section */}

<form
  onSubmit={async (e) => {
    e.preventDefault(); // ✅ prevent redirect
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Add Web3Forms access key
    formData.append("access_key", "fd521eb3-5eb4-46c7-adb8-a1e770826526");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Votre message a été envoyé !");
        form.reset(); // ✅ Clear form after success
      } else {
        toast.error("Erreur lors de l’envoi du message.");
      }
    } catch (err) {
      toast.error("Erreur de connexion.");
    }
  }}
  className="relative mx-auto flex w-full max-w-2xl flex-col items-start gap-4 overflow-hidden rounded-3xl bg-gradient-to-b from-gray-100 to-gray-200 p-4 sm:p-10 dark:from-neutral-900 dark:to-neutral-950"
>
  {/* Inputs stay the same */}
  <Grid size={20} />

  <input type="hidden" name="access_key" value="fd521eb3-5eb4-46c7-adb8-a1e770826526" />
  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

  {/* Full Name */}
  <div className="relative z-20 mb-4 w-full">
    <label htmlFor="name" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-2 inline-block">Nom complet</label>
    <input
      id="name"
      name="name"
      type="text"
      placeholder="Votre nom complet"
      required
      className="shadow-input h-10 w-full rounded-md border border-transparent bg-white pl-4 text-sm text-neutral-700 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
    />
  </div>

  {/* Email */}
  <div className="relative z-20 mb-4 w-full">
    <label htmlFor="email" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-2 inline-block">Adresse Email</label>
    <input
      id="email"
      name="email"
      type="email"
      placeholder="votre@email.com"
      required
      className="shadow-input h-10 w-full rounded-md border border-transparent bg-white pl-4 text-sm text-neutral-700 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
    />
  </div>

  {/* Entreprise */}
  <div className="relative z-20 mb-4 w-full">
    <label htmlFor="company" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-2 inline-block">Entreprise</label>
    <input
      id="company"
      name="company"
      type="text"
      placeholder="Nom de votre entreprise"
      className="shadow-input h-10 w-full rounded-md border border-transparent bg-white pl-4 text-sm text-neutral-700 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
    />
  </div>

  {/* Message */}
  <div className="relative z-20 mb-4 w-full">
    <label htmlFor="message" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-2 inline-block">Message</label>
    <textarea
      id="message"
      name="message"
      rows={5}
      placeholder="Saisissez votre message ici"
      required
      className="shadow-input w-full rounded-md border border-transparent bg-white pt-4 pl-4 text-sm text-neutral-700 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800 dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
    />
  </div>

  <p className="relative z-20 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
    En transmettant ce formulaire, vous acceptez que HROps Consulting Inc. utilise les
    renseignements fournis afin de traiter votre demande et de communiquer avec vous à ce
    sujet. Pour en savoir plus, consultez notre{" "}
    <a href="/privacy" className="underline">
      Politique de confidentialité
    </a>
    .
  </p>

  <button
    type="submit"
    className="relative z-10 flex items-center justify-center rounded-md border border-transparent bg-neutral-800 px-4 py-2 text-sm font-medium text-white shadow-[0px_1px_0px_0px_#FFFFFF20_inset] transition duration-200 hover:bg-neutral-900"
  >
    Envoyer
  </button>
</form>


    </div>
  );
}



  

export const FeatureIconContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative h-14 w-14 rounded-md bg-gradient-to-b from-gray-50 to-neutral-200 p-[4px] dark:from-neutral-800 dark:to-neutral-950",
        className,
      )}
    >
      <div
        className={cn(
          "relative z-20 h-full w-full rounded-[5px] bg-gray-50 dark:bg-neutral-800",
          className,
        )}
      >
        {children}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-30 mx-auto h-4 w-full rounded-full bg-neutral-600 opacity-50 blur-lg"></div>
      <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-[60%] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-[60%] bg-gradient-to-r from-transparent via-orange-600 to-transparent dark:h-[8px] dark:blur-sm"></div>
    </div>
  );
};

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
    const defaultPattern = [
        [8, 2],
        [9, 4],
        [10, 1],
        [11, 3],
        [12, 2],
      ];
      const p = pattern ?? defaultPattern;
  return (
    <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/30 to-zinc-900/30 opacity-10 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 dark:to-zinc-900/30">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full fill-black/100 stroke-black/100 mix-blend-overlay dark:fill-white/100 dark:stroke-white/100"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any, idx: number) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}-${idx}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
