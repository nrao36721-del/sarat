import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SarathiLogo from "../components/SarathiLogo";
import { isRegistered } from "../lib/registration";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1300);
    const navTimer = setTimeout(() => {
      isRegistered().then((registered) => {
        navigate(registered ? "/login" : "/welcome", { replace: true });
      });
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`flex h-full flex-col items-center justify-center bg-saffron-500 px-6 text-center transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="animate-rise-in">
        <SarathiLogo size={140} />
      </div>
      <h1 className="mt-8 animate-rise-in font-sans text-5xl font-bold tracking-tight text-white drop-shadow-sm">
        Sarathi
      </h1>
      <div
        className="mt-3 animate-rise-in text-2xl font-medium text-saffron-50"
        style={{ animationDelay: "150ms" }}
      >
        <span className="font-devanagari">सारथी</span>
        <span className="mx-3 text-saffron-200">·</span>
        <span className="font-telugu">సారథి</span>
      </div>
    </div>
  );
}
