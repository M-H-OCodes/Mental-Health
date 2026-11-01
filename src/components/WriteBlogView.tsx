import React, { useState } from 'react';
import { BlogItem, calculateWordCount, calculateReadTime, getFirstLine, formatCategoryName, canUserManageBlog } from '../utils/blogUtils.ts';
import { PenSquare, CheckCircle, Trash2, Edit3, X, Save, Sparkles, User, Info, LogIn, Lock, BookOpen } from 'lucide-react';

interface WriteBlogViewProps {
  currentUser: { email: string; name?: string; uid: string } | null;
  blogs: BlogItem[];
  onPublish: (blog: Omit<BlogItem, 'id' | 'timestamp'>) => void;
  onUpdate: (id: string, updated: Partial<BlogItem>) => void;
  onDelete: (id: string) => void;
  onOpenAuth: () => void;
  onNavigate: (view: string, blogId?: string) => void;
}

const PRESET_COVERS = [
  { label: 'Mindfulness', url: 'images/mindfulnessshutterstock_1416917957.webp' },
  { label: 'Expectations & Stress', url: 'images/1.jpg' },
  { label: 'Therapy & Strength', url: 'images/psychologist-therapy-counseling-illustration-psychology-psychiatry_33099-658.avif' },
  { label: 'Self-Care & Calm', url: 'images/teenager-sitting-next-window-home-footage-241432759_iconl.webp' },
  { label: 'Mental Health Journey', url: 'images/mental1.jpg' },
  { label: 'Student Support', url: 'images/NEWS_2024.03.02_Student-led-mental-health-group_Feature_SeventyFour-shutterstock_2195058933.jpg' }
];

export const WriteBlogView: React.FC<WriteBlogViewProps> = ({
  currentUser,
  blogs,
  onPublish,
  onUpdate,
  onDelete,
  onOpenAuth,
  onNavigate,
}) => {
  const [category, setCategory] = useState('mental-health');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>(PRESET_COVERS[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // Edit states for "Your Blogs"
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [pendingDeleteBlog, setPendingDeleteBlog] = useState<{ id: string; title: string } | null>(null);

  const wordCount = calculateWordCount(content);
  const readTime = calculateReadTime(wordCount);

  // CRITICAL REQUIREMENT: Strictly filter "Your Blogs" so users only see and manage their own uploaded blogs!
  const userBlogs = currentUser
    ? blogs.filter((b) => b.userId && b.userId.trim() === currentUser.uid.trim())
    : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    if (!title.trim() || !content.trim()) {
      setNotification('Please fill in both the title and content for your blog.');
      return;
    }

    const finalImage = customImageUrl.trim() || selectedImage || 'images/1.jpg';

    onPublish({
      title: title.trim(),
      content: content.trim(),
      category,
      imageUrl: finalImage,
      wordCount,
      readTime,
      authorName: currentUser.name || currentUser.email.split('@')[0],
      userId: currentUser.uid,
    });

    // Reset form
    setTitle('');
    setContent('');
    setCustomImageUrl('');
    setNotification('Your blog has been published successfully!');
    setTimeout(() => setNotification(null), 4000);
  };

  const startEdit = (blog: BlogItem) => {
    // Enforce ownership check before starting edit
    if (!canUserManageBlog(blog, currentUser?.uid)) {
      setNotification('Permission denied: You can only edit blogs you authored.');
      return;
    }
    setEditingId(blog.id);
    setEditTitle(blog.title);
    setEditContent(blog.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  };

  const saveEdit = (blogId: string) => {
    const blog = blogs.find((b) => b.id === blogId);
    if (!blog || !canUserManageBlog(blog, currentUser?.uid)) {
      setNotification('Permission denied: You can only edit blogs you authored.');
      setEditingId(null);
      return;
    }

    if (!editTitle.trim() || !editContent.trim()) {
      setNotification('Title and content cannot be empty.');
      return;
    }
    const newWordCount = calculateWordCount(editContent);
    const newReadTime = calculateReadTime(newWordCount);

    onUpdate(blogId, {
      title: editTitle.trim(),
      content: editContent.trim(),
      wordCount: newWordCount,
      readTime: newReadTime,
    });

    setEditingId(null);
    setNotification('Blog updated successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  const requestDelete = (blog: BlogItem) => {
    // Enforce ownership check before showing delete confirmation
    if (!canUserManageBlog(blog, currentUser?.uid)) {
      setNotification('Permission denied: Only the author who uploaded this blog can delete it.');
      return;
    }
    setPendingDeleteBlog({ id: blog.id, title: blog.title });
  };

  const confirmDelete = () => {
    if (pendingDeleteBlog) {
      const targetBlog = blogs.find((b) => b.id === pendingDeleteBlog.id);
      if (!targetBlog || !canUserManageBlog(targetBlog, currentUser?.uid)) {
        setNotification('Permission denied: You can only delete blogs you uploaded.');
        setPendingDeleteBlog(null);
        return;
      }

      onDelete(pendingDeleteBlog.id);
      setPendingDeleteBlog(null);
      setNotification('Your blog has been deleted.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#86d3bf] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Guest Banner if not signed in */}
        {!currentUser ? (
          <div className="bg-[#d7fff2] border border-[#5AA59E] p-5 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-[#1e4d4a]">
              <div className="w-10 h-10 rounded-xl bg-[#5AA59E] text-white flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Sign In Required to Author & Manage Blogs</h4>
                <p className="text-xs text-[#555555]">
                  To protect content ownership, each blog can only be edited or deleted by the specific user who uploaded it.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenAuth}
              className="bg-[#5AA59E] hover:bg-[#488b85] text-white px-5 py-2.5 rounded-full font-bold text-xs cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Quick Demo</span>
            </button>
          </div>
        ) : (
          <div className="bg-[#d7fff2] border border-[#5AA59E]/60 p-4 rounded-2xl shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1e4d4a]">
              <User className="w-4 h-4 text-[#5AA59E]" />
              <span>
                Authenticated as: <strong>{currentUser.name || currentUser.email}</strong>
              </span>
            </div>
            <span className="text-xs bg-[#A4D7C9] text-[#1e4d4a] px-3 py-1 rounded-full font-bold">
              {userBlogs.length} {userBlogs.length === 1 ? 'Personal Blog' : 'Personal Blogs'}
            </span>
          </div>
        )}

        {notification && (
          <div className="bg-white border-l-4 border-[#5AA59E] text-[#1e4d4a] p-4 rounded-r-xl shadow-md flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <CheckCircle className="w-5 h-5 text-[#5AA59E]" />
              <span>{notification}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Blog Creation Form */}
        <div className="bg-[#c5f8f0] p-6 sm:p-10 rounded-2xl shadow-xl border border-[#adefde]">
          <h1 className="text-3xl font-extrabold text-[#1e4d4a] mb-2 flex items-center gap-2">
            <PenSquare className="w-8 h-8 text-[#2a6252]" />
            <span>Write Your Blog</span>
          </h1>
          <p className="text-sm text-[#444444] mb-8">
            Share your authentic voice, strategies, or coping stories to empower fellow adolescents.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Select */}
            <div>
              <label htmlFor="blog-category" className="block text-xs uppercase font-bold tracking-wider text-[#1e4d4a] mb-1.5">
                Category
              </label>
              <select
                id="blog-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full bg-white border border-[#adefde] rounded-xl px-4 py-3 text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#5AA59E]"
              >
                <option value="mental-health">Mental Health Awareness</option>
                <option value="stress">Stress Management</option>
                <option value="society">Societal Burden</option>
                <option value="wellness">Wellness & Self-Care</option>
              </select>
            </div>

            {/* Cover Image Selection */}
            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-[#1e4d4a] mb-2">
                Choose Cover Image
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                {PRESET_COVERS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedImage(preset.url);
                      setCustomImageUrl('');
                    }}
                    className={`h-16 rounded-lg overflow-hidden border-2 transition-all relative group cursor-pointer ${
                      selectedImage === preset.url && !customImageUrl
                        ? 'border-[#1e4d4a] ring-2 ring-[#5AA59E]'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    <span className="absolute inset-0 bg-black/40 text-[10px] text-white flex items-center justify-center p-1 text-center font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Upload or Custom URL fallback */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="file"
                  id="blog-image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="bg-white border border-[#adefde] rounded-xl px-3 py-2 text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#d2f8eb] file:text-[#1e4d4a] hover:file:bg-[#b8ebd9] cursor-pointer flex-1"
                />
                <input
                  type="url"
                  placeholder="Or enter image URL (optional)"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  className="bg-white border border-[#adefde] rounded-xl px-4 py-2 text-xs text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#5AA59E] sm:w-64"
                />
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label htmlFor="blog-title" className="block text-xs uppercase font-bold tracking-wider text-[#1e4d4a] mb-1.5">
                Blog Title
              </label>
              <input
                type="text"
                id="blog-title"
                placeholder="Give your article an engaging, meaningful title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-white border border-[#adefde] rounded-xl px-4 py-3 text-base text-[#333333] font-medium focus:outline-none focus:ring-2 focus:ring-[#5AA59E]"
              />
            </div>

            {/* Content Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="blog-content" className="block text-xs uppercase font-bold tracking-wider text-[#1e4d4a]">
                  Blog Content
                </label>
                <span className="text-xs font-semibold text-[#1e4d4a] bg-white px-3 py-1 rounded-full border border-[#adefde]">
                  Word Count: <span id="word-count" className="font-bold">{wordCount}</span> &bull; Estimated Read Time: <span id="read-time" className="font-bold">{readTime}</span> min
                </span>
              </div>
              <textarea
                id="blog-content"
                rows={10}
                placeholder="Write your blog article here. Provide rich paragraphs, real situations, and practical coping advice..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full bg-white border border-[#adefde] rounded-xl p-4 text-sm text-[#333333] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#5AA59E]"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-[#488b85] hover:bg-[#3d7a74] text-white px-10 py-3.5 rounded-xl font-bold text-base transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Publish Blog</span>
            </button>
          </form>
        </div>

        {/* "Your Blogs" Section - STRICT AUTHOR-ONLY PRIVILEGES */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#1e4d4a]">Your Uploaded Blogs</h2>
              <p className="text-xs text-[#333333]">
                Only blogs authored and uploaded by your account appear here with Edit & Delete access.
              </p>
            </div>
            <span className="text-xs font-medium text-[#1e4d4a] bg-[#d7fff2] px-3.5 py-1.5 rounded-full border border-[#5AA59E]/40 font-bold">
              {userBlogs.length} Uploaded by You
            </span>
          </div>

          <div id="user-blogs" className="space-y-4">
            {!currentUser ? (
              <div className="bg-[#c5f8f0]/80 border-2 border-dashed border-[#5AA59E] rounded-2xl p-8 text-center text-[#1e4d4a]">
                <Lock className="w-10 h-10 text-[#5AA59E] mx-auto mb-2" />
                <h3 className="font-bold text-base mb-1">Sign In to View Your Uploaded Blogs</h3>
                <p className="text-xs text-[#555555] max-w-md mx-auto mb-4">
                  Existing community and expert blogs are protected and cannot be deleted by other users. Sign in or use the quick demo account to manage your own articles.
                </p>
                <button
                  onClick={onOpenAuth}
                  className="bg-[#5AA59E] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#488b85] cursor-pointer"
                >
                  Sign In to Your Account
                </button>
              </div>
            ) : userBlogs.length === 0 ? (
              <div className="bg-[#c5f8f0]/80 border-2 border-dashed border-[#5AA59E] rounded-2xl p-8 text-center text-[#1e4d4a]">
                <BookOpen className="w-10 h-10 text-[#5AA59E] mx-auto mb-2" />
                <h3 className="font-bold text-base mb-1">No personal blogs published yet</h3>
                <p className="text-xs text-[#555555] max-w-md mx-auto">
                  You haven't uploaded any articles under this account yet. Fill out the form above to share your story and it will appear here with full edit and delete controls!
                </p>
              </div>
            ) : (
              userBlogs.map((blog) => {
                const isEditing = editingId === blog.id;

                return (
                  <div
                    key={blog.id}
                    id={`blog-${blog.id}`}
                    className="bg-[#82f0d3] border-2 border-[#adefde] rounded-xl p-5 shadow-xs hover:shadow-md transition-all text-black flex flex-col sm:flex-row gap-5 items-start justify-between"
                  >
                    {/* Image Thumbnail */}
                    <div className="w-full sm:w-36 h-28 shrink-0 bg-white rounded-lg overflow-hidden border border-[#5AA59E]/30">
                      <img
                        src={blog.imageUrl || 'images/1.jpg'}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'images/1.jpg';
                        }}
                      />
                    </div>

                    {/* Blog Details / Inline Edit Area */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-white text-[#6C63FF] text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                          {formatCategoryName(blog.category)}
                        </span>
                        <span className="text-xs text-gray-700 font-medium">
                          {blog.wordCount || 300} words &bull; {blog.readTime || 2} min read &bull; {new Date(blog.timestamp).toLocaleDateString()}
                        </span>
                      </div>

                      {isEditing ? (
                        <div className="space-y-3 pt-2">
                          <div>
                            <label className="text-xs font-bold text-[#1e4d4a]">Edit Title:</label>
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full bg-white border border-[#4CAF50] rounded-lg p-2 text-sm font-bold text-black focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-[#1e4d4a]">Edit Content:</label>
                            <textarea
                              rows={4}
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full bg-white border border-[#4CAF50] rounded-lg p-2 text-xs text-black focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => saveEdit(blog.id)}
                              className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save Changes</span>
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3
                            onClick={() => onNavigate('blog-detail', blog.id)}
                            className="font-bold text-lg text-[#1e4d4a] hover:underline cursor-pointer"
                          >
                            {blog.title}
                          </h3>
                          <p className="text-xs text-gray-800 line-clamp-2 leading-relaxed">
                            {getFirstLine(blog.content, 140)}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Actions - ONLY rendered for the author */}
                    {!isEditing && (
                      <div className="flex sm:flex-col gap-2 shrink-0 self-end sm:self-start">
                        <button
                          onClick={() => startEdit(blog)}
                          className="bg-[#63e0ff] hover:bg-[#52b4cc] text-[#222222] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                          title="Edit title & content"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => requestDelete(blog)}
                          className="bg-[#14a3dc] hover:bg-[#62b9db] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                          title="Delete blog"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Delete Confirmation In-UI Modal */}
        {pendingDeleteBlog && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 animate-in fade-in duration-150"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-red-200 text-center animate-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Blog?</h3>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                Are you sure you want to remove <strong className="text-gray-900">"{pendingDeleteBlog.title}"</strong>? This will remove your article permanently.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setPendingDeleteBlog(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
