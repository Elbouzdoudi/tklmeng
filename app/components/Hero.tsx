"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "../i18n/useTranslation";
import { useLanguage } from "../i18n/LanguageContext";

export default function Hero() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const isRTL = dir === "rtl";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50/50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? "direction-rtl" : ""}`}>
          {/* Content */}
          <div className={`text-center ${isRTL ? "lg:text-right lg:order-2" : "lg:text-left"}`}>
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-8 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {t("hero.badge")}
            </div>

            {/* Main Headline */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 ${
                isVisible ? "animate-fade-in-up delay-100" : "opacity-0"
              }`}
            >
              {t("hero.headline")}{" "}
              <span className="text-green-600">{t("hero.headlineHighlight")}</span>
              <br />
              <span className="text-gray-500 text-3xl sm:text-4xl lg:text-5xl">{t("hero.subheadline")}</span>
            </h1>

            {/* Subheadline */}
            <p
              className={`text-lg sm:text-xl text-gray-600 max-w-xl mx-auto ${isRTL ? "lg:mr-0 lg:ml-auto" : "lg:mx-0"} mb-10 leading-relaxed ${
                isVisible ? "animate-fade-in-up delay-200" : "opacity-0"
              }`}
            >
              {t("hero.description")}
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? "lg:justify-end" : "lg:justify-start"} ${
                isVisible ? "animate-fade-in-up delay-300" : "opacity-0"
              }`}
            >
              <a
                href="#pricing"
                className="btn-primary bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t("hero.ctaPricing")}
              </a>
              <a
                href="#contact"
                className="btn-secondary border-2 border-green-600 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {t("hero.ctaRegister")}
              </a>
            </div>

            {/* Trust Indicators */}
            <div
              className={`mt-12 flex flex-wrap justify-center ${isRTL ? "lg:justify-end" : "lg:justify-start"} gap-6 text-gray-500 text-sm ${
                isVisible ? "animate-fade-in-up delay-400" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t("hero.trust1")}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t("hero.trust2")}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t("hero.trust3")}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className={`relative ${isRTL ? "lg:order-1" : ""} ${
              isVisible ? "animate-fade-in-up delay-200" : "opacity-0"
            }`}
          >
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative background elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-green-300 rounded-full opacity-20 blur-3xl"></div>
              
              {/* Image frame */}
              <div className="relative bg-gradient-to-br from-green-100 to-green-50 rounded-3xl p-3 shadow-2xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white">
                  <Image
                    src="/hero-image.png"
                    alt="Student in a 1-on-1 online English lesson with Takalam"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Floating badges */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t("hero.badge1Title")}</p>
                    <p className="text-xs text-gray-500">{t("hero.badge1Subtitle")}</p>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t("hero.badge2Title")}</p>
                    <p className="text-xs text-gray-500">{t("hero.badge2Subtitle")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
