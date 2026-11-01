import React, { useState, useMemo } from 'react';
import { BlogItem, filterBlogs, formatCategoryName } from '../utils/blogUtils.ts';
import { Search, Filter, BookOpen, Clock, Calendar, ArrowRight, PenSquare } from 'lucide-react';

interface BlogsViewProps {
  blogs: BlogItem[];
  onNavigate: (view: string, blogId?: string) => void;
}

export const BlogsView: React.FC<BlogsViewProps> = ({ blogs, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = useMemo(() => {
    return filterBlogs(blogs, selectedCategory, searchQuery);
  }, [blogs, selectedCategory, searchQuery]);

  // Group blogs by category
  const groupedByCategory = useMemo(() => {
    const groups: Record<string, BlogItem[]> = {};
    for (const blog of filtered) {
      const cat = blog.category || 'Uncategorized';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(blog);
    }
    return groups;
  }, [filtered]);

  const categories = Object.keys(groupedByCategory);

  return (
    <div className="min-h-screen bg-[#F3F9F7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#A4D7C9]">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1e4d4a] flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-[#5AA59E]" />
              <span>All Blogs</span>
            </h1>
            <p className="text-sm text-[#555555] mt-1">
              Explore insightful articles, self-care routines, and adolescent mental wellness discussions.
            </p>
          </div>

          <button
            onClick={() => onNavigate('write-blog')}
            className="bg-[#5AA59E] hover:bg-[#488b85] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer shrink-0"
          >
            <PenSquare className="w-4 h-4" />
            <span>Write New Blog</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#A4D7C9] mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-[#5AA59E]" />
            <select
              id="category-dropdown"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#F3F9F7] border border-[#A4D7C9] rounded-xl px-4 py-2.5 text-sm font-medium text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#5AA59E] cursor-pointer w-full md:w-64"
            >
              <option value="all">All Categories</option>
              <option value="mental-health">Mental Health Awareness</option>
              <option value="stress">Stress Management</option>
              <option value="society">Societal Burden</option>
              <option value="wellness">Wellness & Self-Care</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="search-input"
              type="text"
              placeholder="Search for blogs by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F3F9F7] border border-[#A4D7C9] rounded-xl pl-10 pr-4 py-2 text-sm text-[#333333] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5AA59E]"
            />
          </div>
        </div>

        {/* Results */}
        {categories.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#A4D7C9] max-w-lg mx-auto shadow-xs">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#333333] mb-1">No blogs match your criteria</h3>
            <p className="text-sm text-[#666666] mb-6">
              Try adjusting your search terms or select another category from the dropdown above.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="bg-[#5AA59E] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#488b85] cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((catKey) => {
              const catBlogs = groupedByCategory[catKey];
              return (
                <section key={catKey} className="space-y-4">
                  <h2 className="text-xl font-bold text-[#1e4d4a] border-b-2 border-[#5AA59E] pb-2 capitalize flex items-center justify-between">
                    <span>{formatCategoryName(catKey)}</span>
                    <span className="text-xs font-normal text-[#666666]">
                      {catBlogs.length} {catBlogs.length === 1 ? 'article' : 'articles'}
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catBlogs.map((blog) => (
                      <div
                        key={blog.id}
                        onClick={() => onNavigate('blog-detail', blog.id)}
                        className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-[#A4D7C9]/40 flex flex-col justify-between group"
                      >
                        <div>
                          <div className="h-48 overflow-hidden bg-gray-100">
                            <img
                              src={blog.imageUrl || '/images/1.jpg'}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/1.jpg';
                              }}
                            />
                          </div>

                          <div className="p-5">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-[#5AA59E] bg-[#d2f8eb] px-2.5 py-0.5 rounded-md">
                                {formatCategoryName(blog.category)}
                              </span>
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {blog.readTime || 2} min read
                              </span>
                            </div>

                            <h3 className="font-bold text-base text-[#333333] group-hover:text-[#1e4d4a] transition-colors line-clamp-2 mb-2 leading-snug">
                              {blog.title}
                            </h3>

                            <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed mb-4">
                              {blog.content.replace(/<[^>]*>/g, ' ')}
                            </p>
                          </div>
                        </div>

                        <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {new Date(blog.timestamp).toLocaleDateString()}
                          </span>
                          <span className="text-[#5AA59E] font-bold group-hover:underline flex items-center gap-0.5">
                            Read Blog <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
