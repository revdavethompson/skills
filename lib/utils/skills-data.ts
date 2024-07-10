'use server'

import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { readingTime } from 'reading-time-estimator'

// fetch single post with id using API
export async function fetchPostById(id: string) {
  try {
    const res = await fetch(`${process.env.SITE_URL}/api/blog/posts/${id}`)
    const post = res.json()

    return post
  } catch (error) {
    console.error('Error with getPostById:', error)
  }

}

// Fetch and return only a certain number of most recent posts
export async function fetchRecentPosts(total: number) {
  try {
    const res = await fetch(`${process.env.SITE_URL}/api/blog/posts`);
    let posts = await res.json();

    // Sort posts by date in descending order
    posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Return only the four most recent posts
    return posts.slice(0, total);
  } catch (error) {
    console.error('Error with fetchRecentPosts:', error);
    throw error;
  }
}

// fetch posts using API
export async function fetchSortedPosts() {
  try {
    const res = await fetch(`${process.env.SITE_URL}/api/blog/posts`)
    const posts = res.json()

    return posts
  } catch (error) {
    console.error('Error with getSortedPosts:', error)
  }
}

// FOR API: fetch post data using params id
export async function fetchAPIPostById(id) {
  const fullPath = `.${process.env.POSTS_DIRECTORY}/${id}.mdx`;

  try {
    const fileContents = await fs.readFile(fullPath, 'utf-8');

    // Use gray-matter to parse the markdown front matter
    const { data, content } = matter(fileContents);
    const timeRes = await estimateReadTime(content)
    const time = timeRes.text
    return { id, time, ...data, content };  // Combine metadata with content

  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return null;
  }
}

// FOR API: Fetch all posts and sort them by a specific criterion
export async function fetchAPISortedPosts(sortBy = 'date') {
  const postsDirectory = path.join(process.cwd(), 'data/posts');
  try {
    const filenames = await fs.readdir(postsDirectory);
    const posts = await Promise.all(filenames.map(async filename => {
      const filePath = path.join(postsDirectory, filename);
      const id = filename.replace(/\.mdx$/, '');
      const fileContents = await fs.readFile(filePath, 'utf-8');
      const { data, content } = matter(fileContents);
      return { id, ...data, content };  // Combine metadata with content
    }));

    // Sort the posts based on the specified criterion
    if (sortBy === 'date') {
      posts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date
    } else if (sortBy === 'title') {
      posts.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title
    }

    return posts;
  } catch (error) {
    console.error('Error fetching and sorting posts:', error);
    throw error;  // Re-throw to be caught by the route handler
  }
}

export async function estimateReadTime(content: string) {
  try {
    const text = await content
    const readTime = await readingTime(text, 200)
    console.log('Your reaTime is: ', readTime)

    return readTime

  } catch (error) {
    console.log('Error using estimateReadimgTime: ', error)
  }

}