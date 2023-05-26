import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "blogposts");

export function getSortedPostsData() {
  const fileNames = getPostFileNames();

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = getFileContents(fullPath);
    const matterResult = matter(fileContents);

    const blogPost = {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
    };

    return blogPost;
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = getFileContents(fullPath);
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const blogPostWithHTML = {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHtml,
  };

  return blogPostWithHTML;
}

// Helper functions to handle server-side and client-side logic

function getPostFileNames() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames;
}

function getFileContents(filePath) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  return fileContents;
}
