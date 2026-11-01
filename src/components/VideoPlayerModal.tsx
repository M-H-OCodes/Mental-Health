import React from 'react';
import { X, ExternalLink, Play, FolderOpen } from 'lucide-react';
import { VideoItem, getDriveEmbedUrl, getDriveViewUrl, GOOGLE_DRIVE_FOLDER_URL } from '../utils/blogUtils.ts';

interface VideoPlayerModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  const embedUrl = getDriveEmbedUrl(video.driveId);
  const viewUrl = getDriveViewUrl(video.driveId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className="bg-[#F3F9F7] rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl border border-[#A4D7C9] flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#5AA59E] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-[#d2f8eb] fill-current" />
            <h3 id="video-modal-title" className="font-bold text-lg line-clamp-1">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/20 text-white transition-colors cursor-pointer"
            aria-label="Close video player"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <iframe
            src={embedUrl}
            title={video.title}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>

        {/* Details & Controls */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#A4D7C9] text-[#1e4d4a] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {video.category}
              </span>
              {video.duration && (
                <span className="text-xs text-[#666666] font-medium">Duration: {video.duration}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#5AA59E] hover:bg-[#488b85] text-white text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Google Drive</span>
              </a>
              <a
                href={GOOGLE_DRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#d2f8eb] text-[#1e4d4a] border border-[#A4D7C9] text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>All Drive Videos</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg text-[#333333] mb-1">{video.title}</h4>
            <p className="text-sm text-[#555555] leading-relaxed">{video.description}</p>
          </div>

          {video.referenceTitle && (
            <div className="bg-[#d2f8eb] p-3 rounded-xl border border-[#A4D7C9] text-xs flex items-center justify-between">
              <span className="text-[#1e4d4a]">
                <strong>Reference:</strong>{' '}
                {video.referenceUrl ? (
                  <a
                    href={video.referenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2a6252] underline font-semibold hover:text-[#5AA59E]"
                  >
                    {video.referenceTitle}
                  </a>
                ) : (
                  video.referenceTitle
                )}
              </span>
              <span className="text-[#555555] italic">Educational citation</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
