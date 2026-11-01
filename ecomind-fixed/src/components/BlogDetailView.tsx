import React from 'react';
import { BlogItem, formatCategoryName, calculateWordCount, calculateReadTime } from '../utils/blogUtils.ts';
import { ArrowLeft, Clock, Calendar, FileText, User, Share2 } from 'lucide-react';

interface BlogDetailViewProps {
  blogId: string | null;
  blogs: BlogItem[];
  onBack: () => void;
  onNavigate: (view: string, blogId?: string) => void;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  blogId,
  blogs,
  onBack,
  onNavigate,
}) => {
  const blog = blogs.find((b) => b.id === blogId) || blogs[0];

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#86d3bf] py-16 px-4 flex items-center justify-center">
        <div className="bg-[#d7fff2] max-w-md w-full p-8 rounded-2xl shadow-lg text-center border border-[#A4D7C9]">
          <h2 className="text-2xl font-bold text-[#1e4d4a] mb-2">Blog Not Found</h2>
          <p className="text-sm text-[#555555] mb-6">
            The blog article you are looking for may have been removed or does not exist.
          </p>
          <button
            onClick={onBack}
            className="bg-[#6C63FF] hover:bg-[#5650d8] text-white px-6 py-2.5 rounded-full font-bold text-sm transition-colors cursor-pointer"
          >
            &larr; Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  const wordCount = blog.wordCount || calculateWordCount(blog.content);
  const readTime = blog.readTime || calculateReadTime(Number(wordCount));

  return (
    <div className="min-h-screen bg-[#86d3bf] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-[#d7fff2] rounded-2xl shadow-xl overflow-hidden border border-[#A4D7C9]">
        {/* Back Button Top Bar */}
        <div className="p-4 sm:p-6 bg-[#A4D7C9]/40 border-b border-[#A4D7C9] flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-[#6C63FF] hover:bg-[#5650d8] text-white px-5 py-2 rounded-full font-medium text-sm transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </button>

          <span className="text-xs uppercase font-bold tracking-wider text-[#1e4d4a] bg-white px-3 py-1 rounded-full border border-[#A4D7C9]">
            {formatCategoryName(blog.category)}
          </span>
        </div>

        {/* Hero Image */}
        <div className="w-full max-h-[460px] overflow-hidden bg-black/5">
          <img
            src={blog.imageUrl || 'images/1.jpg'}
            alt={blog.title}
            className="w-full h-full object-cover max-h-[460px]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'images/1.jpg';
            }}
          />
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#222222] mb-4 leading-tight">
            {blog.title}
          </h1>

          {/* Metadata pill badge strip */}
          <div className="bg-white/80 p-4 rounded-xl border border-[#A4D7C9] mb-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#555555]">
            <div className="flex items-center gap-1.5 font-medium text-[#1e4d4a]">
              <User className="w-4 h-4 text-[#5AA59E]" />
              <span>{blog.authorName || 'EcoMind Contributor'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#5AA59E]" />
              <span>{new Date(blog.timestamp).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#5AA59E]" />
              <span>{readTime} min read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#5AA59E]" />
              <span>{wordCount} words</span>
            </div>
          </div>

          {/* Formatted Content */}
          <div className="prose prose-teal max-w-none text-[#333333] text-base sm:text-lg leading-relaxed space-y-4 whitespace-pre-line">
            {blog.content}
          </div>

          {/* Footer of the article */}
          <div className="mt-12 pt-6 border-t border-[#A4D7C9] flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 bg-[#6C63FF] hover:bg-[#5650d8] text-white px-6 py-2.5 rounded-full font-bold text-sm transition-colors cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>&larr; Back to Blogs</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: blog.title,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Blog link copied to clipboard!');
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-[#1e4d4a] hover:underline bg-white px-4 py-2 rounded-full border border-[#A4D7C9]"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Article</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
