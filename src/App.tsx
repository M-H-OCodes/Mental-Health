import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomeView } from './components/HomeView.tsx';
import { ExploreView } from './components/ExploreView.tsx';
import { BlogsView } from './components/BlogsView.tsx';
import { BlogDetailView } from './components/BlogDetailView.tsx';
import { VideosView } from './components/VideosView.tsx';
import { WriteBlogView } from './components/WriteBlogView.tsx';
import { AboutUsView } from './components/AboutUsView.tsx';
import { GuideView } from './components/GuideView.tsx';
import { VideoPlayerModal } from './components/VideoPlayerModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { INITIAL_BLOGS, INITIAL_VIDEOS } from './data/mockData.ts';
import { BlogItem, VideoItem } from './utils/blogUtils.ts';

const STORAGE_KEY = 'ecomind_community_blogs_v4';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [exploreSubpage, setExploreSubpage] = useState<'blogs' | 'videos'>('blogs');
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // User authentication state
  const [currentUser, setCurrentUser] = useState<{ email: string; name?: string; uid: string } | null>(() => {
    try {
      const logged = sessionStorage.getItem('loggedIn');
      const email = sessionStorage.getItem('userEmail');
      const name = sessionStorage.getItem('userName');
      const uid = sessionStorage.getItem('userId');
      if (logged === 'true' && email && uid) {
        return { email, name: name || undefined, uid };
      }
    } catch (_) {}
    return null;
  });

  // Blogs state: Merge any user created blogs with full INITIAL_BLOGS (12 rich blogs)
  const [blogs, setBlogs] = useState<BlogItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const userCreated = parsed.filter(
            (p) => !INITIAL_BLOGS.some((i) => i.id === p.id)
          );
          return [...userCreated, ...INITIAL_BLOGS];
        }
      }
    } catch (_) {}
    return INITIAL_BLOGS;
  });

  const [videos] = useState<VideoItem[]>(INITIAL_VIDEOS);

  // Persist blogs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    } catch (_) {}
  }, [blogs]);

  // Handle URL query parameters or hash
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('id');
    const viewParam = params.get('view');
    const subpageParam = params.get('subpage');

    if (blogId) {
      setSelectedBlogId(blogId);
      setCurrentView('blog-detail');
    } else if (viewParam) {
      setCurrentView(viewParam);
      if (subpageParam === 'videos' || subpageParam === 'blogs') {
        setExploreSubpage(subpageParam);
      }
    }
  }, []);

  const handleNavigate = (view: string, blogId?: string) => {
    if (view === 'videos') {
      setCurrentView('explore');
      setExploreSubpage('videos');
    } else if (view === 'blogs') {
      setCurrentView('explore');
      setExploreSubpage('blogs');
    } else {
      setCurrentView(view);
    }

    if (blogId) {
      setSelectedBlogId(blogId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublish = (newBlogData: Omit<BlogItem, 'id' | 'timestamp'>) => {
    const newBlog: BlogItem = {
      ...newBlogData,
      id: 'blog_' + Date.now().toString(36),
      timestamp: Date.now(),
      userId: currentUser?.uid || 'user_guest_' + Date.now().toString(36),
    };
    setBlogs((prev) => [newBlog, ...prev]);
  };

  const handleUpdate = (id: string, updated: Partial<BlogItem>) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updated } : b))
    );
  };

  const handleDelete = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F9F7] text-[#333333]">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            blogs={blogs}
            videos={videos}
            onNavigate={handleNavigate}
            onPlayVideo={(v) => setActiveVideo(v)}
          />
        )}

        {currentView === 'explore' && (
          <ExploreView
            initialSubpage={exploreSubpage}
            blogs={blogs}
            videos={videos}
            onNavigate={handleNavigate}
            onPlayVideoModal={(v) => setActiveVideo(v)}
          />
        )}

        {currentView === 'blog-detail' && (
          <BlogDetailView
            blogId={selectedBlogId}
            blogs={blogs}
            onBack={() => handleNavigate('blogs')}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'write-blog' && (
          <WriteBlogView
            currentUser={currentUser}
            blogs={blogs}
            onPublish={handlePublish}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onOpenAuth={() => setIsAuthOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'about' && (
          <AboutUsView
            onNavigate={handleNavigate}
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {currentView === 'guide' && (
          <GuideView
            onBack={() => handleNavigate('home')}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      {currentView !== 'about' && <Footer onNavigate={handleNavigate} />}

      {/* Interactive Google Drive Video Modal */}
      <VideoPlayerModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(u) => setCurrentUser(u)}
      />
    </div>
  );
}
