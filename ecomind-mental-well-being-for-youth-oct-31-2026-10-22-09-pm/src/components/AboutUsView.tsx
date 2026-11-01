import React from 'react';
import { BookOpen, Video, Home, PenSquare, LogIn, LogOut, Heart } from 'lucide-react';

interface AboutUsViewProps {
  onNavigate: (view: string) => void;
  currentUser: { email: string; name?: string } | null;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({
  onNavigate,
  currentUser,
  onLogout,
  onOpenAuth,
}) => {
  return (
    <div className="min-h-screen bg-[#F3F9F7] flex flex-col">
      {/* Header */}
      <header className="bg-[#5AA59E] text-white py-8 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider">ABOUT US</h1>
        <p className="text-xs sm:text-sm text-[#d2f8eb] mt-1">Empowering Youth Mental Health & Resilience</p>
      </header>

      {/* Signature Zigzag Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Section 1: Image */}
          <div className="bg-[#5AA59E] p-2 rounded-2xl flex items-center justify-center overflow-hidden min-h-[360px] shadow-sm">
            <img
              src="/images/NEWS_2024.03.02_Student-led-mental-health-group_Feature_SeventyFour-shutterstock_2195058933.jpg"
              alt="Teenagers discussing mental well-being"
              className="w-full h-full object-cover rounded-xl hover:scale-103 transition-transform duration-300"
            />
          </div>

          {/* Section 1: Text */}
          <div className="bg-[#5AA59E] text-white p-8 rounded-2xl flex flex-col justify-center min-h-[360px] shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-center">About this Website</h3>
            <p className="text-base sm:text-lg leading-relaxed text-justify opacity-95">
              Mindful Youth is a dedicated online platform focused on mental well‐being for teenagers. Here, you’ll find a range of blogs, videos, and interactive resources based upon information collected from several authentic sources inclusive of professionally guided websites, references and articles. Our aim is to provide clear, evidence-based information and relatable insights that empower young people to better understand and manage their mental health.
            </p>
          </div>

          {/* Section 2: Text */}
          <div className="bg-[#A4D7C9] text-[#1E4D4A] p-8 rounded-2xl flex flex-col justify-center min-h-[360px] shadow-sm order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4 text-center">Reason behind Building this Website</h3>
            <p className="text-base sm:text-lg leading-relaxed text-justify">
              The website was built in response to the growing mental health challenges among teenagers—exacerbated by the isolation during the COVID-19 pandemic, academic pressures, and increasing cyberbullying. Recognizing that young minds are particularly vulnerable, our platform seeks to bridge the gap by providing a safe, inclusive space where teenagers can access support, share experiences, and gain awareness about their mental health.
            </p>
          </div>

          {/* Section 2: Image */}
          <div className="bg-[#A4D7C9] p-2 rounded-2xl flex items-center justify-center overflow-hidden min-h-[360px] shadow-sm order-1 md:order-2">
            <img
              src="/images/teenager-sitting-next-window-home-footage-241432759_iconl.webp"
              alt="Teenager reading near window"
              className="w-full h-full object-cover rounded-xl hover:scale-103 transition-transform duration-300"
            />
          </div>

          {/* Section 3: Image */}
          <div className="bg-[#5AA59E] p-2 rounded-2xl flex items-center justify-center overflow-hidden min-h-[360px] shadow-sm">
            <img
              src="/images/shutterstock_1464234134-1024x684-1.jpg"
              alt="Group of mental health experts"
              className="w-full h-full object-cover rounded-xl hover:scale-103 transition-transform duration-300"
            />
          </div>

          {/* Section 3: Text */}
          <div className="bg-[#5AA59E] text-white p-8 rounded-2xl flex flex-col justify-center min-h-[360px] shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-center">About the Topic</h3>
            <p className="text-base sm:text-lg leading-relaxed text-justify opacity-95">
              Research indicates that nearly one in three teenagers experience anxiety at some point in their lives, with studies highlighting issues such as academic burnout, social isolation, and cyberbullying as key contributors. By presenting these facts alongside expert insights and real-life stories, we aim to foster a better understanding of the prevalence and impact of mental health issues on young individuals.
            </p>
          </div>

          {/* Section 4: Text */}
          <div className="bg-[#A4D7C9] text-[#1E4D4A] p-8 rounded-2xl flex flex-col justify-center min-h-[360px] shadow-sm order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4 text-center">Goal behind Building this Website</h3>
            <p className="text-base sm:text-lg leading-relaxed text-justify">
              Our goal is to create an empathetic, supportive community where teenagers can feel heard and understood. We are committed to spreading awareness, providing reliable resources, and encouraging dialogue about mental well-being. Ultimately, Mindful Youth is here to empower young people to navigate life’s challenges with resilience and confidence.
            </p>
          </div>

          {/* Section 4: Image */}
          <div className="bg-[#A4D7C9] p-2 rounded-2xl flex items-center justify-center overflow-hidden min-h-[360px] shadow-sm order-1 md:order-2">
            <img
              src="/images/mental1.jpg"
              alt="Roadmap for mental health awareness"
              className="w-full h-full object-cover rounded-xl hover:scale-103 transition-transform duration-300"
            />
          </div>
        </div>
      </main>

      {/* Signature Sticky Bottom Navigation from Original HTML */}
      <div className="sticky bottom-0 z-40 bg-white border-t-2 border-[#A4D7C9] shadow-lg py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-around text-center text-[#5AA59E] text-sm sm:text-base font-bold">
          <button
            onClick={() => onNavigate('blogs')}
            className="hover:scale-110 hover:text-[#e06d6d] transition-all cursor-pointer p-1"
          >
            <p>📖 All Blogs</p>
          </button>
          <button
            onClick={() => onNavigate('videos')}
            className="hover:scale-110 hover:text-[#e06d6d] transition-all cursor-pointer p-1"
          >
            <p>🎥 Videos</p>
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="hover:scale-110 hover:text-[#e06d6d] transition-all cursor-pointer p-1"
          >
            <p>🏠 Home</p>
          </button>
          <button
            onClick={() => onNavigate('write-blog')}
            className="hover:scale-110 hover:text-[#e06d6d] transition-all cursor-pointer p-1"
          >
            <p>✍️ Write a Blog</p>
          </button>
          {currentUser ? (
            <button
              onClick={onLogout}
              className="hover:scale-110 hover:text-[#e06d6d] transition-all cursor-pointer p-1"
            >
              <p>👤 Logout</p>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="hover:scale-110 hover:text-[#e06d6d] transition-all cursor-pointer p-1"
            >
              <p>👤 Sign In</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
