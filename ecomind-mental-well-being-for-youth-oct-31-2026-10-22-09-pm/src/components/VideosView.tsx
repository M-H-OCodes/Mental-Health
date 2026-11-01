import React, { useState, useMemo } from 'react';
import { VideoItem, GOOGLE_DRIVE_FOLDER_URL, getDriveViewUrl } from '../utils/blogUtils.ts';
import { Play, Search, ExternalLink, FolderOpen, Video as VideoIcon, CheckCircle2, Cloud } from 'lucide-react';

interface VideosViewProps {
  videos: VideoItem[];
  onPlayVideo: (video: VideoItem) => void;
}

export const VideosView: React.FC<VideosViewProps> = ({ videos, onPlayVideo }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredVideos = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return videos.filter((vid) => {
      const matchesCategory =
        activeCategory === 'All' || vid.category === activeCategory;
      const matchesSearch =
        !q ||
        vid.title.toLowerCase().includes(q) ||
        vid.description.toLowerCase().includes(q) ||
        (vid.referenceTitle && vid.referenceTitle.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [videos, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#F3F9F7]">
      {/* Header Bar */}
      <section className="bg-[#A4D7C9] py-10 px-4 sm:px-6 lg:px-8 border-b border-[#8ecdbd]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#d2f8eb] text-[#1e4d4a] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Cloud className="w-3.5 h-3.5 text-[#5AA59E]" />
                Google Drive Streaming
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1e4d4a]">
              Mental Well-Being Video Library
            </h1>
            <p className="text-sm text-[#444444] mt-1 max-w-xl">
              High-quality adolescent mental health videos streamed directly from Google Drive cloud storage.
            </p>
          </div>

          {/* Search Box & Drive link */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search for videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-[#5AA59E] rounded-xl pl-10 pr-4 py-2 text-sm text-[#333333] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5AA59E]"
              />
            </div>

            <a
              href={GOOGLE_DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#5AA59E] hover:bg-[#488b85] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs shrink-0"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Drive Folder</span>
            </a>
          </div>
        </div>
      </section>

      {/* GitHub Repository Optimization Notice */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="bg-[#d2f8eb] border border-[#A4D7C9] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5AA59E] text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1e4d4a]">Optimized for GitHub Publishing & Hosting</h4>
              <p className="text-xs text-[#555555]">
                By streaming all 10 videos via Google Drive instead of bundling heavy MP4 binaries, your website is lightweight (&lt;5 MB total) and complies with GitHub's strict 100MB file limit!
              </p>
            </div>
          </div>
          <a
            href={GOOGLE_DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#1e4d4a] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Drive Files</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Awareness', 'Societal Burden & Understanding', 'Self-Care & Solutions'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#5AA59E] text-white shadow-xs'
                  : 'bg-white text-[#333333] hover:bg-[#A4D7C9] border border-[#A4D7C9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filteredVideos.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#A4D7C9] max-w-md mx-auto">
            <VideoIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-[#333333] mb-1">No videos found</h3>
            <p className="text-xs text-[#666666] mb-4">Try searching with a different term.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="bg-[#5AA59E] text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#488b85] cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="video-card bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all border border-[#A4D7C9]/40 flex flex-col justify-between group"
              >
                <div>
                  {/* Video Thumbnail with Play Badge */}
                  <div
                    onClick={() => onPlayVideo(video)}
                    className="relative aspect-video bg-black/90 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={video.poster}
                      alt={video.title}
                      className="video-thumbnail w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/mental-health.jpg';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-[#5AA59E] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                    {video.duration && (
                      <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[11px] font-mono px-2 py-0.5 rounded">
                        {video.duration}
                      </span>
                    )}
                  </div>

                  {/* Content Info */}
                  <div className="video-content p-5">
                    <span className="text-[11px] uppercase font-bold text-[#5AA59E] bg-[#d2f8eb] px-2.5 py-0.5 rounded-md inline-block mb-2">
                      {video.category}
                    </span>
                    <h3 className="video-title font-bold text-base text-[#1e4d4a] group-hover:underline line-clamp-2 mb-2 leading-snug">
                      {video.title}
                    </h3>
                    <p className="video-description text-xs text-[#555555] line-clamp-3 leading-relaxed mb-3">
                      {video.description}
                    </p>

                    {video.referenceTitle && (
                      <div className="text-[11px] text-[#666666] pt-2 border-t border-gray-100 flex items-center gap-1">
                        <span className="font-bold text-[#1e4d4a]">Reference:</span>{' '}
                        {video.referenceUrl ? (
                          <a
                            href={video.referenceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#5AA59E] underline hover:text-[#1e4d4a]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {video.referenceTitle}
                          </a>
                        ) : (
                          <span>{video.referenceTitle}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Card Actions */}
                <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => onPlayVideo(video)}
                    className="text-xs font-bold text-[#5AA59E] hover:text-[#1e4d4a] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Video</span>
                  </button>

                  <a
                    href={getDriveViewUrl(video.driveId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#666666] hover:text-[#1e4d4a] flex items-center gap-1 hover:underline"
                    title="Open directly in Google Drive"
                  >
                    <span>Drive Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
