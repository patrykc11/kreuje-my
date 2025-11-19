"use client";

import Hero from "@/components/Hero";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

const serviceOptions = [
  "konsultacja",
  "wizualizacja",
  "układ funkcjonalny",
  "zestawienie materiałów i lista zakupów",
  "schemat elektryczny",
  "wytyczne wod.-kan.",
  "meble na wymiar",
  "nadzór autorski"
];

export default function Kontakt() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState("");
  const [deadline, setDeadline] = useState("");
  const [email, setEmail] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleService = (option: string) => {
    setSelectedServices((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setAttachments(files ? Array.from(files) : []);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          services: selectedServices,
          area,
          rooms,
          deadline,
          email,
          attachments: attachments.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Błąd przy wysyłaniu formularza.");
      }

      setSelectedServices([]);
      setArea("");
      setRooms("");
      setDeadline("");
      setEmail("");
      setAttachments([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFeedback({
        type: "success",
        message: "Dziękuję! Wkrótce się z Tobą skontaktuję."
      });
    } catch {
      setFeedback({
        type: "error",
        message: "Ups! Coś poszło nie tak. Spróbuj ponownie później."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled = isSubmitting

  return (
    <div className="h-full w-full">
      <Hero
        backgroundImageUrl="/images/kontakt-glowne.jpg"
        leftElement={
          <div className="bg-white absolute top-[-164px] left-[-250px] rounded-r-full px-16 w-xl text-right">
            <p className="text-black text-6xl">KONTAKT</p>
          </div>}
        rightElement={<></>}
        gradientOverlay="linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 10%, rgba(255,255,255,0) 20%)"
      />

      {/* Icons section */}
      <div className="bg-amber-800 relative top-[-82px] mx-auto z-40" style={{ borderRadius: "82px" }} >
        <div className="py-14">
          <div className="grid grid-cols-3 items-center justify-center w-6/7 mx-auto gap-8 relative">
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-white shadow-2xl mx-auto">
              <Image src="/icons/mail.png" alt="Mail" width={150} height={150} />
            </div>

            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-white shadow-2xl mx-auto">
              <Image src="/icons/komorka.png" alt="Komorka" width={120} height={120} />
            </div>


            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-white shadow-2xl mx-auto">
              <Image src="/icons/lokalizacja.png" alt="Mapa" width={90} height={90} />
            </div>
          </div>
        </div >
      </div >

      <section className="z-10 mt-[-64px] mb-12">
        <div className="mx-auto flex w-6/7 max-w-[1200px] flex-col lg:flex-row relative">

          {/* Form */}
          <div className="z-10 w-full">
            <div className="rounded-[110px] border-2 border-black bg-white py-8 w-full">
              <form id="contact-form" onSubmit={handleSubmit} className="text-lg leading-relaxed text-black">
                <ol className="px-8">
                  <li className="mb-4">
                    <p className="font-semibold">1. Jakim zakresem usług jesteś zainteresowany/a?</p>
                    <div className="mt-3 pl-4">
                      {serviceOptions.map((item) => (
                        <label key={item} className="flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(item)}
                            onChange={() => toggleService(item)}
                            className="sr-only"
                          />
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded-full border border-black text-sm ${selectedServices.includes(item) ? "bg-black text-white" : "bg-transparent text-black"}`}
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </li>
                  <li className="mb-4">
                    <p className="font-semibold">2. Jaki metraż wchodzi w zakres projektu?</p>
                    <input
                      type="text"
                      value={area}
                      onChange={(event) => setArea(event.target.value)}
                      className="w-full border-b border-dashed border-gray-400 pb-1 text-base tracking-[0.15em] text-gray-700 focus:border-black focus:outline-none"
                      placeholder="np. 65 m²"
                      required
                    />
                  </li>
                  <li className="mb-4">
                    <p className="font-semibold">3. Ile pomieszczeń wchodzi w zakres projektu?</p>
                    <input
                      type="text"
                      value={rooms}
                      onChange={(event) => setRooms(event.target.value)}
                      className="w-full border-b border-dashed border-gray-400 pb-1 text-base tracking-[0.15em] text-gray-700 focus:border-black focus:outline-none"
                      placeholder="np. 3"
                      required
                    />
                  </li>
                  <li className="mb-4">
                    <p className="font-semibold">4. Jaki jest termin na wykonanie projektu?</p>
                    <input
                      type="text"
                      value={deadline}
                      onChange={(event) => setDeadline(event.target.value)}
                      className="w-full border-b border-dashed border-gray-400 pb-1 text-base tracking-[0.15em] text-gray-700 focus:border-black focus:outline-none"
                      placeholder="np. III kwartał 2024"
                    />
                  </li>
                  <li className="mb-4">
                    <p className="font-semibold">5. Twój adres mailowy.</p>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full border-b border-dashed border-gray-400 pb-1 text-base tracking-[0.15em] text-gray-700 focus:border-black focus:outline-none"
                      placeholder="np. kontakt@twojadomena.pl"
                      required
                    />
                  </li>
                  <li>
                    <p className="font-semibold">6. Rzut / rysunek z wymiarami.</p>
                  </li>
                </ol>
                <div className="mt-3 border-t-3 border-black pt-3 text-center text-sm tracking-[0.4em] uppercase w-full">
                  <label htmlFor="attachments" className="flex cursor-pointer items-center justify-center gap-2">
                    <input
                      id="attachments"
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    /><span>ZAŁĄCZNIKI</span>
                  </label>
                </div>
                <div className="mt-4 text-center">
                  {attachments.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                      {attachments.map((file) => (
                        <li key={file.name} className="truncate">
                          • {file.name} ({Math.round(file.size / 1024)} KB)
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </form>
            </div>
            <div className="mt-6 flex flex-col items-center gap-4 w-full relative z-20">
              <button
                form="contact-form"
                type="submit"
                disabled={isSubmitDisabled}
                className={`w-full max-w-[320px] rounded-full px-12 py-3 text-xl uppercase tracking-[0.3em] text-white transition ${isSubmitDisabled ? "opacity-60 cursor-not-allowed" : "hover:brightness-90"}`}
                style={{ backgroundColor: "#92400e" }}
              >
                {isSubmitting ? "WYSYŁANIE..." : "WYŚLIJ"}
              </button>
              {feedback && (
                <p
                  className={`text-base ${feedback.type === "success" ? "text-green-600" : "text-red-600"
                    }`}
                  aria-live="polite"
                >
                  {feedback.message}
                </p>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="w-md relative">
            <div className="hidden h-[778px] absolute -top-[100px] right-0 rounded-b-[110px] border-2 border-black bg-cover bg-center lg:flex lg:flex-col lg:justify-center w-md" style={{ backgroundImage: "url('/images/kontakt-glowne.jpg')" }}>
              <div className="flex h-full w-full items-center justify-center bg-white/50 rounded-b-[110px] border-2">
                <div className="flex h-full w-2/3 items-center justify-end">
                  <p className="text-2xl tracking-[0.2em]" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
                    WYCEN SWÓJ PROJEKT
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 bg-white px-10 py-12 relative h-[450px]">
            <h3 className="text-3xl font-semibold uppercase tracking-widest text-black">POROZMAWIAJMY O TWOICH POTRZEBACH</h3>
            <p className="mt-6">
              Dziękuję za zainteresowanie moimi usługami architektonicznymi. Po wysłaniu formularza skontaktuję się z Tobą, aby omówić Twoje potrzeby oraz oczekiwania. A następnie zaproponuję indywidualne rozwiązania, które będą najlepiej odpowiadać Twoim wymaganiom. Wierzę, że nasza współpraca pozwoli Ci zrealizować Twoje marzenia o idealnym projekcie architektonicznym.
            </p>
            <div className="absolute -bottom-30 left-2/6 -translate-x-1/2 translate-y-1/2 -z-20 mt-10 rounded-r-[80px] bg-amber-800 px-10 py-8 text-black w-xl mx-auto pl-52">
              <p className="text-2xl font-semibold tracking-[0.4em]">ZOBACZ</p>
              <div className="mt-6 space-y-4 text-sm tracking-[0.4em]">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <Image src="/icons/insta.png" alt="Instagram" width={24} height={24} />
                  </div>
                  <span>INSTAGRAM</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <Image src="/icons/fb.png" alt="Facebook" width={24} height={24} />
                  </div>
                  <span>FACEBOOK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div >
  );
}

