import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateWordCount,
  calculateReadTime,
  formatCategoryName,
  filterBlogs,
  getDriveEmbedUrl,
  getDriveViewUrl,
  getFirstLine,
  canUserManageBlog,
  BlogItem
} from './blogUtils.ts';

test('calculateWordCount calculates words accurately and strips HTML', () => {
  assert.equal(calculateWordCount(''), 0);
  assert.equal(calculateWordCount('Hello world!'), 2);
  assert.equal(calculateWordCount('<p>Mindfulness is <strong>key</strong> to resilience.</p>'), 5);
  assert.equal(calculateWordCount('   lots   of   spaces   here   '), 4);
});

test('calculateReadTime computes approx 200 WPM ceiling', () => {
  assert.equal(calculateReadTime(0), 0);
  assert.equal(calculateReadTime(50), 1);
  assert.equal(calculateReadTime(200), 1);
  assert.equal(calculateReadTime(201), 2);
  assert.equal(calculateReadTime(600), 3);
});

test('canUserManageBlog enforces author-only deletion and editing permissions', () => {
  const authorBlog: BlogItem = {
    id: 'b-101',
    userId: 'user_alex_123',
    title: 'Testing Blog Ownership',
    content: 'Only Alex should be able to edit or delete this blog.',
    category: 'wellness',
    timestamp: Date.now()
  };

  // Author itself can manage
  assert.equal(canUserManageBlog(authorBlog, 'user_alex_123'), true);

  // Different user cannot manage
  assert.equal(canUserManageBlog(authorBlog, 'user_other_456'), false);

  // Unauthenticated user cannot manage
  assert.equal(canUserManageBlog(authorBlog, null), false);
  assert.equal(canUserManageBlog(authorBlog, undefined), false);
  assert.equal(canUserManageBlog(authorBlog, ''), false);
});

test('formatCategoryName normalizes and formats categories', () => {
  assert.equal(formatCategoryName('mental-health'), 'Mental Health Awareness');
  assert.equal(formatCategoryName('stress'), 'Stress Management');
  assert.equal(formatCategoryName('society'), 'Societal Burden');
  assert.equal(formatCategoryName('wellness'), 'Wellness & Self-Care');
  assert.equal(formatCategoryName('all'), 'All Categories');
  assert.equal(formatCategoryName('custom-topic'), 'Custom Topic');
});

test('filterBlogs correctly filters by category and search keyword', () => {
  const mockBlogs: BlogItem[] = [
    {
      id: '1',
      title: 'Mindfulness as a key to overcome stress!',
      content: 'For any teen feeling overwhelmed by the daily grind...',
      category: 'stress',
      timestamp: 1740000000000
    },
    {
      id: '2',
      title: 'Seeking help is a sign of strength',
      content: 'You are deserving of happiness, understanding, and support.',
      category: 'mental-health',
      timestamp: 1740100000000
    },
    {
      id: '3',
      title: 'Dont limit yourself because of expectations',
      content: 'Societal burden and perfectionism can weigh heavily.',
      category: 'society',
      timestamp: 1740200000000
    }
  ];

  // All blogs
  assert.equal(filterBlogs(mockBlogs, 'all', '').length, 3);

  // Category filter
  const stressOnly = filterBlogs(mockBlogs, 'stress', '');
  assert.equal(stressOnly.length, 1);
  assert.equal(stressOnly[0].id, '1');

  // Search filter
  const searchResult = filterBlogs(mockBlogs, 'all', 'strength');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, '2');

  // Search + category mismatch
  const noMatch = filterBlogs(mockBlogs, 'society', 'strength');
  assert.equal(noMatch.length, 0);
});

test('Google Drive URLs resolve proper embed and view formats', () => {
  const driveId = '1oA7GyVgVc2ygywNvno5NKXkY1aVWAmVr';
  assert.equal(
    getDriveEmbedUrl(driveId),
    'https://drive.google.com/file/d/1oA7GyVgVc2ygywNvno5NKXkY1aVWAmVr/preview'
  );
  assert.equal(
    getDriveViewUrl(driveId),
    'https://drive.google.com/file/d/1oA7GyVgVc2ygywNvno5NKXkY1aVWAmVr/view?usp=sharing'
  );
});

test('getFirstLine extracts clean first sentence', () => {
  const content = 'This is the first sentence. And this is second.';
  assert.equal(getFirstLine(content), 'This is the first sentence.');
});

test('INITIAL_BLOGS has varied distribution across categories and deep content', async () => {
  const { INITIAL_BLOGS } = await import('../data/mockData.ts');
  const mentalHealth = INITIAL_BLOGS.filter(b => b.category === 'mental-health');
  const stress = INITIAL_BLOGS.filter(b => b.category === 'stress');
  const society = INITIAL_BLOGS.filter(b => b.category === 'society');
  const wellness = INITIAL_BLOGS.filter(b => b.category === 'wellness');

  // Verify varied distribution as requested: 5 in mental-health, 4 in stress, 3 in society, 4 in wellness
  assert.equal(mentalHealth.length, 5);
  assert.equal(stress.length, 4);
  assert.equal(society.length, 3);
  assert.equal(wellness.length, 4);

  // Verify all articles have substantive, detailed paragraphs (>300 characters each)
  for (const blog of INITIAL_BLOGS) {
    assert.ok(blog.content.length > 300, `Blog ${blog.id} should have substantive content`);
    assert.ok(blog.title.length > 5, `Blog ${blog.id} should have a valid title`);
    assert.ok(blog.authorName, `Blog ${blog.id} should have an author`);
  }
});
