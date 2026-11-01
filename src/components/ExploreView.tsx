import React, { useState } from 'react';
import { BlogItem, VideoItem, GOOGLE_DRIVE_FOLDER_URL, getDriveEmbedUrl, getDriveViewUrl } from '../utils/blogUtils.ts';
import { BlogsView } from './BlogsView.tsx';
import { BookOpen, Video as VideoIcon, ExternalLink, Sparkles, FolderOpen, Play, Maximize2, Search, Filter } from 'lucide-react';

interface ExploreViewProps {
  initialSubpage?: 'blogs' | 'videos';
  blogs: BlogItem[];
  videos: VideoItem[];
  onNavigate: (view: string, blogId?: string) => void;
  onPlayVideoModal: (video: VideoItem) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  initialSubpage = 'blogs',
  blogs,
  videos,
  onNavigate,
  onPlayVideoModal,
}) => {
  const [activeSubpage, setActiveSubpage] = useState<'blogs' | 'videos'>(initialSubpage);
  const [videoSearchQuery, setVideoSearchQuery] = useState('');
  const [videoCategory, setVideoCategory] = useState<string>('All');

  // Filtered videos for the Explore -> Videos sub-page
  const filteredVideos = videos.filter((vid) => {
    const matchesCategory = videoCategory === 'All' || vid.category === videoCategory;
    const q = videoSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      vid.title.toLowerCase().includes(q) ||
      vid.description.toLowerCase().includes(q) ||
      (vid.referenceTitle && vid.referenceTitle.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F3F9F7]">
      {/* Subpage Navigation Bar */}
      <section className="bg-[#A4D7C9] py-8 px-4 sm:px-6 lg:px-8 border-b border-[#8ecdbd]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#d2f8eb] text-[#1e4d4a] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#5AA59E]" />
                Explore EcoMind
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1e4d4a]">
              {activeSubpage === 'blogs' ? 'Explore Community Blogs' : 'Explore Videos'}
            </h1>
            <p className="text-sm text-[#444444] mt-1 max-w-xl">
              {activeSubpage === 'blogs'
                ? 'Discover substantive, adolescent-focused mental health articles written by peers and psychological educators.'
                : 'Watch educational videos streamed on-demand directly via Google Drive cloud storage without bloating website code size.'}
            </p>
          </div>

          {/* Subpage Switcher Tabs */}
          <div className="bg-white/80 p-1.5 rounded-2xl shadow-xs border border-[#8ecdbd] flex items-center gap-1">
            <button
              onClick={() => setActiveSubpage('blogs')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeSubpage === 'blogs'
                  ? 'bg-[#5AA59E] text-white shadow-xs'
                  : 'text-[#333333] hover:text-[#1e4d4a] hover:bg-[#A4D7C9]/40'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>All Blogs</span>
            </button>
            <button
              onClick={() => setActiveSubpage('videos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeSubpage === 'videos'
                  ? 'bg-[#5AA59E] text-white shadow-xs'
                  : 'text-[#333333] hover:text-[#1e4d4a] hover:bg-[#A4D7C9]/40'
              }`}
            >
              <VideoIcon className="w-4 h-4" />
              <span>Videos</span>
            </button>
          </div>
        </div>
      </section>

      {/* SUB-PAGE 1: BLOGS */}
      {activeSubpage === 'blogs' && (
        <BlogsView blogs={blogs} onNavigate={onNavigate} />
      )}

      {/* SUB-PAGE 2: VIDEOS EMBEDDED DIRECTLY FROM GOOGLE DRIVE */}
      {activeSubpage === 'videos' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Controls: Search, Category Filters, and Google Drive Folder Link */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#A4D7C9] flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {['All', 'Awareness', 'Societal Burden & Understanding', 'Self-Care & Solutions'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setVideoCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    videoCategory === cat
                      ? 'bg-[#5AA59E] text-white shadow-xs'
                      : 'bg-[#F3F9F7] text-[#333333] hover:bg-[#A4D7C9] border border-[#A4D7C9]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input and Drive Folder */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={videoSearchQuery}
                  onChange={(e) => setVideoSearchQuery(e.target.value)}
                  className="w-full bg-[#F3F9F7] border border-[#A4D7C9] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#333333] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5AA59E]"
                />
              </div>

              <a
                href={GOOGLE_DRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#5AA59E] hover:bg-[#488b85] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Drive Folder</span>
              </a>
            </div>
          </div>

          {/* Videos Grid with Direct Google Drive Embed Player */}
          {filteredVideos.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#A4D7C9] max-w-md mx-auto">
              <VideoIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-bold text-[#333333] mb-1">No videos found</h3>
              <p className="text-xs text-[#666666] mb-4">Try clearing your search query or selecting a different category.</p>
              <button
                onClick={() => {
                  setVideoSearchQuery('');
                  setVideoCategory('All');
                }}
                className="bg-[#5AA59E] text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#488b85] cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all border border-[#A4D7C9]/60 flex flex-col justify-between"
                >
                  {/* Direct Google Drive Embed Video Player */}
                  <div className="relative aspect-video bg-black w-full overflow-hidden">
                    <iframe
                      src={getDriveEmbedUrl(video.driveId)}
                      title={video.title}
                      className="w-full h-full border-0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>

                  {/* Video Metadata & Controls */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] uppercase font-bold text-[#5AA59E] bg-[#d2f8eb] px-2.5 py-0.5 rounded-md">
                          {video.category}
                        </span>
                        {video.duration && (
                          <span className="text-xs text-[#666666] font-medium">
                            Duration: {video.duration}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-lg text-[#1e4d4a] leading-snug mb-2">
                        {video.title}
                      </h3>
                      <p className="text-xs text-[#555555] leading-relaxed">
                        {video.description}
                      </p>
                    </div>

                    {/* Citations & Action links */}
                    <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      {video.referenceTitle ? (
                        <span className="text-[#666666]">
                          <strong>Reference:</strong>{' '}
                          {video.referenceUrl ? (
                            <a
                              href={video.referenceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#5AA59E] underline hover:text-[#1e4d4a] font-semibold"
                            >
                              {video.referenceTitle}
                            </a>
                          ) : (
                            video.referenceTitle
                          )}
                        </span>
                      ) : (
                        <span className="text-gray-400">Educational resource</span>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onPlayVideoModal(video)}
                          className="bg-[#d2f8eb] hover:bg-[#b8ebd9] text-[#1e4d4a] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Open in expanded theater mode"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Expand</span>
                        </button>

                        <a
                          href={getDriveViewUrl(video.driveId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#5AA59E] hover:underline flex items-center gap-1 text-xs font-semibold"
                        >
                          <span>Drive Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
