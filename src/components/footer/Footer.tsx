'use client'
import Image from 'next/image';
import React, { memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WorldMap = () => {
  const LOCATION = { lat: 17.3850, lng: 78.4867, city: 'Hyderabad' };

  return (
    <div className="relative w-full h-[280px] rounded-xl overflow-hidden">
      <MapContainer
        center={[LOCATION.lat, LOCATION.lng]}
        zoom={5}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[LOCATION.lat, LOCATION.lng]}>
          <Popup>
            <div className="text-sm">
              <strong className="text-primary">{LOCATION.city}</strong>
              <br />
              info@harvinntechnologies.in
              <br />
              +91 9849541178
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-border bg-gradient-to-t from-[#11101d] to-[#2c125c]">
      <div className="max-w-screen-xl mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Section: Company Info + Contact */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
              <p className="text-xl font-semibold text-white/90 tracking-tight">
                Harvinn technologies is a premier AI-based platform dedicated to helping students develop the skills they need to succeed in their careers.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-white text-lg">Contact Us</span>
                <div className="space-y-2">
                  <p className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@harvinntechnologies.in
                  </p>
                  <p className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +91 9849541178
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section: Categories */}
          <div className="md:col-span-4">
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 h-full">
              <h3 className="text-lg font-semibold text-white mb-4">Top Category</h3>
              <ul className="space-y-3">
                {FOOTERDATA[0].desc.map((item, index) => (
                  <li
                    key={index}
                    className="text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <a href="#" className="text-sm hover:underline">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section: Map */}
          <div className="md:col-span-4">
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Address</h3>
              <WorldMap />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="p-[2px] bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-full">
              <div className="relative size-12 bg-background/90 rounded-full overflow-hidden shadow-xl">
                <Image
                  className="p-2"
                  fill
                  src="/harvinlogo.jpg"
                  alt="Harvin"
                />
              </div>
              
            </div>
            <nav className="flex gap-6 text-sm text-white/70">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Contact us</a>
            </nav>
            <p className="text-sm text-white/60">@Copyrights 2024 harvinn technologies.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const FOOTERDATA = [
  {
    title: 'Top Category',
    desc: [
      'Computer science course',
      'Electronic and communication',
      'Artificial Intelligence',
      'Pharmacy course',
      'Management course',
      'Bio technology course',
    ],
  },
];