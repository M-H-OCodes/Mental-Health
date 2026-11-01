import React from 'react';
import { BlogItem, VideoItem, getFirstLine } from '../utils/blogUtils.ts';
import { Play, ArrowRight, BookOpen, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface HomeViewProps {
  blogs: BlogItem[];
  videos: VideoItem[];
  onNavigate: (view: string, blogId?: string) => void;
  onPlayVideo: (video: VideoItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  blogs,
  videos,
  onNavigate,
  onPlayVideo,
}) => {
  // Select awareness videos for hero section
  const awarenessVideos = videos.slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#A4D7C9] py-16 px-4 sm:px-6 lg:px-8 text-center text-[#333333] border-b border-[#8ecdbd]">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-[#d2f8eb] text-[#1e4d4a] text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full mb-4">
            Mental Health Awareness for Adolescents
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-[#1e4d4a]">
            Welcome to EcoMind
          </h1>
          <p className="text-lg sm:text-xl text-[#333333] max-w-2xl mx-auto leading-relaxed mb-8">
            Empowering teenagers through insightful stories, mindful articles, and a supportive community to promote mental well-being.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('blogs')}
              className="bg-[#5AA59E] hover:bg-[#488b85] text-white px-6 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Explore Blogs</span>
            </button>
            <button
              onClick={() => onNavigate('videos')}
              className="bg-white hover:bg-[#d2f8eb] text-[#1e4d4a] border border-[#5AA59E] px-6 py-3 rounded-full font-bold shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Watch Videos</span>
            </button>
          </div>
        </div>
      </section>

      {/* Insights into Mental Well-Being */}
      <section className="bg-[#d2f8eb] py-14 px-4 sm:px-6 lg:px-8 text-center text-[#333333]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-[#1e4d4a]">Insight into Mental Well-Being</h2>
          <p className="text-[#555555] max-w-2xl mx-auto mb-10 text-sm sm:text-base">
            Click on any insight card to explore our comprehensive scientific and psychological guide.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Insight 1 */}
            <div
              onClick={() => onNavigate('guide')}
              className="bg-[#A4D7C9] hover:bg-[#98cbb1] p-6 rounded-xl shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs font-semibold text-[#1e4d4a] bg-[#d2f8eb] px-2.5 py-1 rounded-md inline-block mb-3">
                  15/2/25 &bull; Core Definition
                </span>
                <h3 className="font-bold text-xl mb-2 text-[#1e4d4a] group-hover:underline">
                  What is Mental Well-being?
                </h3>
                <p className="text-sm text-[#333333] leading-relaxed line-clamp-4">
                  Mental well-being is a multifaceted state of emotional, psychological, and social harmony that enables individuals to cope with life's challenges, form meaningful relationships, and pursue personal growth.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#8ecdbd] flex items-center gap-1.5 text-xs font-bold text-[#1e4d4a]">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Insight 2 */}
            <div
              onClick={() => onNavigate('guide')}
              className="bg-[#A4D7C9] hover:bg-[#98cbb1] p-6 rounded-xl shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs font-semibold text-[#1e4d4a] bg-[#d2f8eb] px-2.5 py-1 rounded-md inline-block mb-3">
                  18/2/2025 &bull; Research & Data
                </span>
                <h3 className="font-bold text-xl mb-2 text-[#1e4d4a] group-hover:underline">
                  Issues Surrounding Mental Well-being
                </h3>
                <p className="text-sm text-[#333333] leading-relaxed line-clamp-4">
                  Research reveals that <strong>1 in 3 adolescents</strong> experiences anxiety or depression during their formative years, a crisis exacerbated by the isolation of COVID-19 and academic burnout (Springer, 2020).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#8ecdbd] flex items-center gap-1.5 text-xs font-bold text-[#1e4d4a]">
                <span>Read Evidence</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Insight 3 */}
            <div
              onClick={() => onNavigate('guide')}
              className="bg-[#A4D7C9] hover:bg-[#98cbb1] p-6 rounded-xl shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs font-semibold text-[#1e4d4a] bg-[#d2f8eb] px-2.5 py-1 rounded-md inline-block mb-3">
                  23/2/2025 &bull; Daily Resilience
                </span>
                <h3 className="font-bold text-xl mb-2 text-[#1e4d4a] group-hover:underline">
                  Practices to Promote Mental Well-being
                </h3>
                <p className="text-sm text-[#333333] leading-relaxed line-clamp-4">
                  Cognitive-behavioral strategies, including journaling and reframing negative thought patterns, are effective tools for building resilience and emotional balance.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#8ecdbd] flex items-center gap-1.5 text-xs font-bold text-[#1e4d4a]">
                <span>Discover Practices</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="bg-[#5AA59E] py-14 px-4 sm:px-6 lg:px-8 text-[#F3F9F7]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-[#73c1ac]">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Featured Blogs</h2>
              <p className="text-xs sm:text-sm text-[#d2f8eb]">Real experiences, relatable stories, and expert coping strategies</p>
            </div>
            <button
              onClick={() => onNavigate('blogs')}
              className="mt-4 sm:mt-0 text-sm font-bold bg-[#A4D7C9] text-[#1e4d4a] hover:bg-white px-5 py-2 rounded-full transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>View All Blogs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((blog) => (
              <div
                key={blog.id}
                onClick={() => onNavigate('blog-detail', blog.id)}
                className="bg-[#d2f8eb] text-[#333333] rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="h-48 overflow-hidden bg-[#b8ebd9]">
                    <img
                      src={blog.imageUrl || '/images/1.jpg'}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs uppercase font-bold tracking-wider text-[#5AA59E] bg-white px-2.5 py-0.5 rounded-md inline-block mb-2">
                      {blog.category.replace('-', ' ')}
                    </span>
                    <h3 className="font-bold text-lg mb-2 text-[#1e4d4a] group-hover:underline line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-[#666666] mb-3">
                      {new Date(blog.timestamp).toLocaleDateString()} &bull; {blog.readTime || 2} min read
                    </p>
                    <p className="text-sm text-[#444444] line-clamp-3 leading-relaxed">
                      {getFirstLine(blog.content, 120)}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2 border-t border-[#b8ebd9] flex items-center justify-between text-xs font-bold text-[#5AA59E]">
                  <span>Read Full Post</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awareness Videos Section (Drive Streamed) */}
      <section className="bg-[#A4D7C9] py-14 px-4 sm:px-6 lg:px-8 text-[#333333]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#1e4d4a] mb-2">Mental Health Awareness Videos</h2>
            <p className="text-sm text-[#444444] max-w-xl mx-auto">
              Engaging short-form videos to help normalize mental health conversations and inspire resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {awarenessVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="relative aspect-video bg-black/80 overflow-hidden cursor-pointer" onClick={() => onPlayVideo(video)}>
                  <img
                    src={video.poster}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-[#5AA59E] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  </div>
                  {video.duration && (
                    <span className="absolute bottom-3 right-3 bg-black/75 text-white text-xs font-mono px-2 py-0.5 rounded">
                      {video.duration}
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-bold text-lg text-[#1e4d4a] mb-1">{video.title}</h3>
                    <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed mb-3">
                      {video.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <button
                      onClick={() => onPlayVideo(video)}
                      className="text-xs font-bold text-[#5AA59E] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch in Modal</span>
                    </button>
                    <button
                      onClick={() => onNavigate('videos')}
                      className="text-xs text-[#666666] hover:text-[#1e4d4a]"
                    >
                      All 10 Videos &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('videos')}
              className="bg-[#5AA59E] hover:bg-[#488b85] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore All 10 Video Sessions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section Summary */}
      <section className="bg-[#d2f8eb] py-14 px-4 sm:px-6 lg:px-8 text-center text-[#333333]">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-[#1e4d4a]">About Us</h2>
          <p className="text-base text-[#444444] leading-relaxed">
            Mindful Youth / EcoMind is dedicated to providing a safe and supportive environment for teenagers to improve their mental well-being.
          </p>
          <p className="text-sm text-[#555555] leading-relaxed">
            We offer resources, blogs, and awareness content to help individuals navigate their mental health journey. Join us in spreading awareness and fostering a healthier mind for youth.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('about')}
              className="bg-[#5AA59E] hover:bg-[#488b85] text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Learn More About Our Mission
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
