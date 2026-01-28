"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "../i18n/useTranslation";

// All countries list
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const packagesData = [
  { id: 'single', name: 'Single Session', price: '200 DHS' },
  { id: 'weekly', name: 'Weekly Package', price: '550 DHS' },
  { id: 'monthly', name: 'Monthly Package', price: '2200 DHS' },
  { id: 'trimester', name: 'Trimester Package', price: '6500 DHS' },
];

export default function Contact() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showQRModal, setShowQRModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    familyName: '',
    phone: '',
    email: '',
    age: '',
    sex: '',
    country: 'Morocco',
    city: '',
    package: '',
    message: ''
  });


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Google Apps Script URL - Deploy your script and paste the URL here
      // Follow instructions in GOOGLE_SHEETS_SETUP.md
      const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
      
      const selectedPackage = packagesData.find(p => p.id === formData.package);
      
      const dataToSend = {
        firstName: formData.firstName,
        familyName: formData.familyName,
        phone: formData.phone,
        email: formData.email,
        age: formData.age,
        sex: formData.sex,
        country: formData.country,
        city: formData.city,
        package: `${selectedPackage?.name || 'Not specified'} - ${selectedPackage?.price || ''}`,
        message: formData.message || '',
        paymentStatus: 'Awaiting screenshot via WhatsApp'
      };

      // Check if Google Script URL is configured
      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
        // Fallback to Web3Forms if Google Script not configured
        const WEB3FORMS_KEY = '856ea9c9-fd68-42e0-b493-76c3d6d51713';
        
        const formDataToSend = new FormData();
        formDataToSend.append('access_key', WEB3FORMS_KEY);
        formDataToSend.append('subject', `New Registration: ${formData.firstName} ${formData.familyName} - ${selectedPackage?.name || 'Package'}`);
        formDataToSend.append('from_name', 'Takalam Website');
        formDataToSend.append('First Name', formData.firstName);
        formDataToSend.append('Family Name', formData.familyName);
        formDataToSend.append('Phone', formData.phone);
        formDataToSend.append('Email', formData.email);
        formDataToSend.append('Age', formData.age);
        formDataToSend.append('Sex', formData.sex);
        formDataToSend.append('Country', formData.country);
        formDataToSend.append('City', formData.city);
        formDataToSend.append('Package Selected', dataToSend.package);
        formDataToSend.append('Message', formData.message || 'No additional message');
        formDataToSend.append('Submitted At', new Date().toLocaleString());
        formDataToSend.append('Payment Status', 'Awaiting screenshot via WhatsApp');

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formDataToSend
        });

        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'Form submission failed');
        }
      } else {
        // Send to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend)
        });
        
        // With no-cors mode, we can't read the response, so we assume success
        // The Google Script handles errors internally
      }

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        familyName: '',
        phone: '',
        email: '',
        age: '',
        sex: '',
        country: 'Morocco',
        city: '',
        package: '',
        message: ''
      });
      
      // Scroll to success message with WhatsApp button
      setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t("contact.title")} <span className="text-green-600">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Step Progress Bar */}
        <div
          className={`mb-10 ${isVisible ? "animate-fade-in-up delay-100" : "opacity-0"}`}
        >
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Book</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-green-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Pay</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-green-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Register</span>
            </div>
          </div>
        </div>

        {/* STEP 1: Book Your Session */}
        <div
          className={`mb-10 ${isVisible ? "animate-fade-in-up delay-100" : "opacity-0"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">1</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">Book Your Session</h3>
              <p className="text-sm text-gray-600">Select a date and time that works for you</p>
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src="https://cal.com/takalam-english-center-azwhqs/50mins?embed=true&theme=light&layout=month_view"
              style={{ width: '100%', height: '550px', border: 'none' }}
              frameBorder="0"
              title="Book a Session"
              allow="payment"
            />
          </div>
        </div>

        {/* STEP 2: Make Payment */}
        <div
          className={`mb-10 ${isVisible ? "animate-fade-in-up delay-150" : "opacity-0"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">2</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">Make Payment</h3>
              <p className="text-sm text-gray-600">Transfer the amount for your selected package</p>
            </div>
          </div>
          
          {/* Package Prices */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Package Prices</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {packagesData.map((pkg) => (
                <div key={pkg.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 text-sm">{pkg.name}</span>
                  <span className="font-bold text-green-600">{pkg.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Options */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Bank Transfer */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{t("contact.bankingTitle")}</h3>
                  <p className="text-green-100 text-sm">{t("contact.bankingSubtitle")}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="bg-white/10 rounded-lg p-2.5">
                  <p className="text-green-200 text-xs uppercase tracking-wide mb-0.5">{t("contact.accountHolder")}</p>
                  <p className="font-semibold text-sm">MONSIEUR MOHAMMED SAID EL BOUZDOUDI</p>
                </div>
                <div className="bg-white/10 rounded-lg p-2.5">
                  <p className="text-green-200 text-xs uppercase tracking-wide mb-0.5">RIB</p>
                  <p className="font-mono font-bold text-sm tracking-wide">230 727 2633040211016600 70</p>
                </div>
                <div className="bg-white/10 rounded-lg p-2.5">
                  <p className="text-green-200 text-xs uppercase tracking-wide mb-0.5">IBAN</p>
                  <p className="font-mono font-bold text-sm tracking-wide">MA64 2307 2726 3304 0211 0166 0070</p>
                </div>
                <div className="bg-white/10 rounded-lg p-2.5">
                  <p className="text-green-200 text-xs uppercase tracking-wide mb-0.5">Code SWIFT</p>
                  <p className="font-mono font-bold">CIHMMAMC</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-green-100 text-sm mb-3 text-center font-medium">
                  {t("contact.scanToPay")}
                </p>
                <button
                  onClick={() => setShowQRModal(true)}
                  className="bg-white rounded-2xl p-3 mx-auto w-fit block cursor-pointer hover:scale-105 transition-transform"
                >
                  <Image
                    src="/bank-qr.png"
                    alt="Scan for bank details - Click to enlarge"
                    width={280}
                    height={400}
                    className="w-full max-w-[180px] h-auto rounded-xl"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">Click to enlarge</p>
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-green-100 text-sm">
                  {t("contact.transferNote")}
                </p>
              </div>
            </div>

            {/* PayPal */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19c-1.717 0-3.146 1.27-3.403 2.955l-1.12 7.106c-.083.518.32.99.846.99h4.606c.524 0 .967-.382 1.05-.9l.896-5.678c.082-.518.525-.9 1.05-.9h.677c4.298 0 7.664-1.746 8.647-6.796.403-2.067.135-3.666-1.853-4.572z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">PayPal</h3>
                  <p className="text-blue-100 text-sm">Fast & secure international payments</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 mb-4">
                <p className="text-blue-200 text-xs uppercase tracking-wide mb-2">Send payment to:</p>
                <p className="font-mono font-bold text-lg break-all">mohammedsaidelbouzdoudi99@gmail.com</p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-blue-200 text-sm mb-2">How to pay with PayPal:</p>
                  <ol className="text-sm space-y-1.5 text-blue-50">
                    <li className="flex items-start gap-2">
                      <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                      <span>Log in to your PayPal account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                      <span>Click &quot;Send&quot; and enter the email above</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                      <span>Enter the amount for your package</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">4</span>
                      <span>Add your full name in the note</span>
                    </li>
                  </ol>
                </div>
              </div>

              <p className="text-blue-200 text-xs mt-4 text-center">
                Ideal for international students
              </p>
            </div>
          </div>
        </div>

        {/* STEP 3: Register & Send Proof */}
        <div
          className={`mb-6 ${isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">3</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">Register & Send Payment Proof</h3>
              <p className="text-sm text-gray-600">Fill out the form, then send your payment screenshot via WhatsApp</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {t("contact.formTitle")}
            </h3>

              {submitStatus === 'success' && (
                <div ref={successRef} className="mb-6 p-5 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-2 text-green-700 mb-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-lg">Registration Received!</span>
                  </div>
                  <p className="text-green-700 mb-4">Your registration has been submitted. Now send your payment screenshot via WhatsApp to complete enrollment:</p>
                  <a
                    href="https://wa.me/212722774753?text=Hi%2C%20I%20just%20submitted%20my%20registration%20form.%20Here%20is%20my%20payment%20screenshot%3A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 hover:scale-105 animate-elegant-glow"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send Payment Screenshot via WhatsApp
                  </a>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{t("contact.errorTitle")}</span>
                  </div>
                  <p className="text-sm mt-1">{t("contact.errorText")}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.firstName")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="familyName" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.familyName")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <input
                      type="text"
                      id="familyName"
                      name="familyName"
                      required
                      value={formData.familyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.phone")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                      placeholder="+212 600 000 000"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.email")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.age")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      required
                      min="10"
                      max="100"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.sex")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <select
                      id="sex"
                      name="sex"
                      required
                      value={formData.sex}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none bg-white"
                    >
                      <option value="">...</option>
                      <option value="Male">{t("contact.male")}</option>
                      <option value="Female">{t("contact.female")}</option>
                      <option value="Prefer not to say">{t("contact.preferNotToSay")}</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.country")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none bg-white"
                    >
                      <option value="">{t("contact.selectCountry")}</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contact.city")} <span className="text-red-500">{t("contact.required")}</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.packageSelected")} <span className="text-red-500">{t("contact.required")}</span>
                  </label>
                  <select
                    id="package"
                    name="package"
                    required
                    value={formData.package}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none bg-white"
                  >
                    <option value="">{t("contact.selectPackage")}</option>
                    {packagesData.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} - {pkg.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* WhatsApp Reminder */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <p className="text-sm text-green-700">After submitting, click the WhatsApp button to send your payment screenshot</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("contact.additionalMessage")} <span className="text-gray-400">({t("contact.optional")})</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none resize-none"
                    placeholder={t("contact.messagePlaceholder")}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t("contact.submitting")}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t("contact.submitButton")}
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowQRModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-4 max-w-md w-full relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-3 right-3 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">Scan QR Code to Pay</h3>
            <Image
              src="/bank-qr.png"
              alt="Bank QR Code"
              width={400}
              height={600}
              className="w-full h-auto rounded-xl"
            />
            <p className="text-sm text-gray-500 mt-3 text-center">Scan with your banking app to get payment details</p>
          </div>
        </div>
      )}
    </section>
  );
}
