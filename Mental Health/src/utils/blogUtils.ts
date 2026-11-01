export interface BlogItem {
  id: string;
  userId?: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string | null;
  wordCount?: number | string;
  readTime?: number | string;
  timestamp: number;
  authorName?: string;
}

export interface VideoItem {
  id: string;
  driveId: string;
  title: string;
  description: string;
  poster: string;
  category: 'Awareness' | 'Societal Burden & Understanding' | 'Self-Care & Solutions';
  referenceTitle?: string;
  referenceUrl?: string;
  duration?: string;
}

/**
 * Checks whether the current user is authorized to edit or delete a blog.
 * Only the user who uploaded the blog (matching userId) is permitted to manage it.
 */
export function canUserManageBlog(blog: BlogItem, currentUserId?: string | null): boolean {
  if (!currentUserId || !blog || !blog.userId) return false;
  return blog.userId.trim() === currentUserId.trim();
}

/**
 * Calculates word count from raw text or HTML string.
 */
export function calculateWordCount(text: string): number {
  if (!text) return 0;
  // Strip HTML tags if any
  const clean = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!clean) return 0;
  return clean.split(/\s+/).length;
}

/**
 * Calculates estimated read time in minutes (approx 200 words per minute).
 */
export function calculateReadTime(wordCount: number): number {
  if (!wordCount || wordCount <= 0) return 0;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Formats hyphenated or lowercase category keys into title case.
 */
export function formatCategoryName(category: string): string {
  if (!category) return 'Uncategorized';
  const mapping: Record<string, string> = {
    'all': 'All Categories',
    'mental-health': 'Mental Health Awareness',
    'stress': 'Stress Management',
    'society': 'Societal Burden',
    'wellness': 'Wellness & Self-Care'
  };
  if (mapping[category]) return mapping[category];
  return category
    .split(/[-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Filters a list of blogs by category and search keyword.
 */
export function filterBlogs(
  blogs: BlogItem[],
  selectedCategory: string,
  searchQuery: string
): BlogItem[] {
  const query = (searchQuery || '').trim().toLowerCase();
  return blogs.filter(blog => {
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === 'all' ||
      blog.category === selectedCategory ||
      formatCategoryName(blog.category).toLowerCase() === formatCategoryName(selectedCategory).toLowerCase();

    const matchesSearch =
      !query ||
      blog.title.toLowerCase().includes(query) ||
      blog.content.toLowerCase().includes(query) ||
      (blog.category && blog.category.toLowerCase().includes(query)) ||
      (blog.authorName && blog.authorName.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });
}

/**
 * Google Drive Embed and View Link Helpers
 */
export const GOOGLE_DRIVE_FOLDER_URL =
  'https://drive.google.com/drive/folders/1Xwinfq7LEbznQnoYSupxtPRO33dGFxHt?usp=sharing';

export function getDriveEmbedUrl(driveId: string): string {
  if (!driveId) return '';
  return `https://drive.google.com/file/d/${driveId}/preview`;
}

export function getDriveViewUrl(driveId: string): string {
  if (!driveId) return GOOGLE_DRIVE_FOLDER_URL;
  return `https://drive.google.com/file/d/${driveId}/view?usp=sharing`;
}

/**
 * Returns snippet / first line of text.
 */
export function getFirstLine(content: string, maxLength = 120): string {
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const firstSentence = text.split(/[.\n]/)[0] || text;
  if (firstSentence.length > maxLength) {
    return firstSentence.slice(0, maxLength) + '...';
  }
  return firstSentence + '.';
}
