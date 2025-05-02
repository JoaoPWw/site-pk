
'use client'
import { Facebook, Instagram, Phone, MapPin, Mail, Clock, Menu, X, /* Add Whatsapp icon */ Smartphone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link for internal navigation
import React, { useState, useRef } from 'react'; // Import React hooks

// --- Reusable Components (Optional but good practice) ---

// Interface for Social Links
interface SocialLinks {
  facebook: string;
  instagram: string;
  whatsapp?: string; // Optional WhatsApp link
  whatsappOffers?: string; //
  whatsappMessageLink?: string; // Specific link for receiving offers
  whatsappBannerLink?: string; // Specific link for the banner
}

// --- Main Page Component ---
export default function Home() {
  // --- State and Refs ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null); // Ref for scrolling to location section
  const contactRef = useRef<HTMLDivElement>(null); // Ref for scrolling to contact section

  // --- Data ---
  const fixedBanner = {
    imageUrl: '/banner-principal.jpg', // Actual banner image path
    alt: 'Nossas ofertas em seu Whats! Clique aqui e confira'
  };

  const socialLinks: SocialLinks = {
    facebook: 'https://www.facebook.com/PekaSupermercados/',
    instagram: 'https://www.instagram.com/supermercado.peka',
    whatsapp: '554733280707', // Raw number for tel: link
    whatsappOffers: '554796101266', // Raw number for wa.me link (offers)
    whatsappMessageLink: 'https://wa.me/554796101266?text=Quero+receber+ofertas!+%F0%9F%98%8D%E2%98%BA%EF%B8%8F',
    whatsappBannerLink: 'https://wa.link/xpqohb'
  };

  const contactInfo = {
    phone: '(47) 3328-0707',
    whatsappBusinessDisplay: '47 9610-1266', // For display
    address: 'Rua Guilherme Poerner, 736 - Passo Manso, Blumenau - SC',
    googleMapsLink: 'https://maps.app.goo.gl/eVvzaDifdsWqmC2o8',
    hours: 'Segunda a Sábado: 7:30h às 22:00h | Domingos: 8:00h às 14:00h',
    email: 'contato.pekasupermercados@gmail.com' // Updated email
  };

  // --- Event Handlers ---
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToLocation = scrollToSection(locationRef);
  const scrollToContact = scrollToSection(contactRef);

  // --- Render ---
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#4863AC] text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo-peka-branco.png" alt="Peka Supermercados Logo" width={180} height={40} priority />
          </Link>

          {/* Desktop Navigation - Added Localização and Contato */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#" className="hover:text-gray-300">Início</Link>
            <Link href="#localizacao" onClick={scrollToLocation} className="hover:text-gray-300">Localização</Link>
            <Link href="#contato" onClick={scrollToContact} className="hover:text-gray-300">Contato</Link>
            {/* Social Links */}
            <div className="flex space-x-4 items-center">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gray-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gray-300">
                <Instagram className="h-6 w-6" />
              </a>
              {socialLinks.whatsappMessageLink && (
                <a href={socialLinks.whatsappMessageLink} target="_blank" rel="noopener noreferrer" aria-label="Receber ofertas no WhatsApp" className="flex items-center space-x-1 hover:text-gray-300 bg-green-500 px-2 py-1 rounded-md text-sm">
                  <Smartphone className="h-5 w-5" />
                  <span>Ofertas</span>
                </a>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Added Localização and Contato */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#4863AC] shadow-lg py-4">
            <nav className="container mx-auto flex flex-col space-y-4 px-4">
              <Link href="#" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300">Início</Link>
              <Link href="#localizacao" onClick={scrollToLocation} className="hover:text-gray-300">Localização</Link>
              <Link href="#contato" onClick={scrollToContact} className="hover:text-gray-300">Contato</Link>
              {/* Social Links in Mobile Menu */}
              <div className="flex space-x-4 pt-4 border-t border-gray-500">
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gray-300">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gray-300">
                  <Instagram className="h-6 w-6" />
                </a>
                {socialLinks.whatsappMessageLink && (
                  <a href={socialLinks.whatsappMessageLink} target="_blank" rel="noopener noreferrer" aria-label="Receber ofertas no WhatsApp" className="flex items-center space-x-1 hover:text-gray-300 bg-green-500 px-2 py-1 rounded-md text-sm">
                    <Smartphone className="h-5 w-5" />
                    <span>Ofertas</span>
                  </a>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* --- Main Content Area --- */}
      <main className="flex-grow">
        {/* Fixed Banner Section - Clickable, objectFit='contain' */}
        <section className="w-full mb-12 bg-gray-200"> {/* Added background color for contain */} 
          <a href={socialLinks.whatsappBannerLink} target="_blank" rel="noopener noreferrer" aria-label={fixedBanner.alt}>
            {/* Adjusted height and objectFit */}
            <div className="relative w-full h-48 md:h-64"> 
              <Image 
                src={fixedBanner.imageUrl} 
                alt={fixedBanner.alt}
                layout="fill"
                objectFit="contain" 
                priority 
              />
            </div>
          </a>
        </section>

        {/* WhatsApp Signup Section */}
        <section className="container mx-auto text-center mb-12 px-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Receba nossas ofertas direto em seu celular</h2>
          {socialLinks.whatsappMessageLink && (
            <a href={socialLinks.whatsappMessageLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              <Smartphone className="h-5 w-5 mr-2" />
              Clique aqui e cadastre-se no Whats!
            </a>
          )}
        </section>

        {/* --- About Us Section --- */}
        <section id="quem-somos" className="bg-white py-12 px-4 mb-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Quem Somos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Somos uma empresa familiar que atua dentro de uma comunidade que merece nossa atenção e respeito, com isso, buscamos satisfazer as expectativas e necessidades de nossos clientes com excelência no atendimento e qualidade em nosso produtos e serviços, buscando melhorar continuamente.
            </p>
          </div>
        </section>

        {/* --- Location Section --- */}
        <section id="localizacao" ref={locationRef} className="container mx-auto p-4 sm:p-8 mb-12 scroll-mt-20"> 
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Localização e Horários</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
            <div className="space-y-5"> 
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Nosso Endereço</h3>
              {/* Address - Made clickable via Google Maps button below */}
              <div className="flex items-start text-gray-600"> 
                <MapPin className="h-5 w-5 mr-3 text-[#4863AC] flex-shrink-0 mt-1" /> 
                <span>{contactInfo.address}</span>
              </div>
              {/* Google Maps Button using the provided link */}
              <div className="pt-2"> 
                <a
                  href={contactInfo.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#4863AC] hover:bg-blue-800"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Ver no Google Maps
                </a>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3 pt-4">Horário de Funcionamento</h3>
              <div className="flex items-start text-gray-600"> 
                <Clock className="h-5 w-5 mr-3 text-[#4863AC] flex-shrink-0 mt-1" /> 
                <span>{contactInfo.hours}</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- Contact Section (New) --- */}
        <section id="contato" ref={contactRef} className="bg-white py-12 px-4 mb-12 scroll-mt-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Fale Conosco</h2>
            <div className="max-w-md mx-auto space-y-5">
              {/* Interactive Phone Link */}
              <a href={`tel:+${socialLinks.whatsapp?.replace(/\D/g, '')}`} className="flex items-center justify-center text-gray-600 hover:text-[#4863AC] group">
                <Phone className="h-6 w-6 mr-3 text-[#4863AC] flex-shrink-0" />
                <span className="text-lg group-hover:underline">{contactInfo.phone} (Ligar)</span>
              </a>
              {/* Interactive WhatsApp Link (Offers) */}
              <a href={socialLinks.whatsappMessageLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-600 hover:text-green-600 group">
                <Smartphone className="h-6 w-6 mr-3 text-green-600 flex-shrink-0" />
                <span className="text-lg group-hover:underline">WhatsApp: {contactInfo.whatsappBusinessDisplay} (Ofertas)</span>
              </a>
              {/* Interactive Email Link */}
              <a href={`mailto:${contactInfo.email}`} className="flex items-center justify-center text-gray-600 hover:text-red-600 group">
                <Mail className="h-6 w-6 mr-3 text-red-600 flex-shrink-0" />
                <span className="text-lg group-hover:underline break-all">{contactInfo.email}</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-8 mt-12"> 
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1: Logo & About */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image src="/logo-peka-branco.png" alt="Peka Supermercados Logo" width={150} height={33} />
            </Link>
            <p className="text-sm text-gray-400">
              Seu supermercado de confiança em Blumenau.
            </p>
          </div>

          {/* Column 2: Quick Links - Updated */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-gray-300">Início</Link></li>
              <li><Link href="#localizacao" onClick={scrollToLocation} className="hover:text-gray-300">Localização</Link></li>
              <li><Link href="#contato" onClick={scrollToContact} className="hover:text-gray-300">Contato</Link></li>
            </ul>
          </div>

          {/* Column 3: Social & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Siga-nos</h4>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gray-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gray-300">
                <Instagram className="h-6 w-6" />
              </a>
              {socialLinks.whatsappMessageLink && (
                <a href={socialLinks.whatsappMessageLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Ofertas" className="hover:text-gray-300">
                  <Smartphone className="h-6 w-6" />
                </a>
              )}
            </div>
            {/* Interactive Footer Links */}
            <a href={`tel:+${socialLinks.whatsapp?.replace(/\D/g, '')}`} className="block text-sm text-gray-400 hover:text-white">{contactInfo.phone}</a>
            <a href={contactInfo.googleMapsLink} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-white">{contactInfo.address}</a>
            {/* Added Email to Footer */}
            <a href={`mailto:${contactInfo.email}`} className="block text-sm text-gray-400 hover:text-white break-all">{contactInfo.email}</a>
          </div>
        </div>
        <div className="container mx-auto text-center text-xs text-gray-500 pt-6 mt-8 border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} Peka Supermercados. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

