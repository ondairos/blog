import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// get current working directory path for blogposts folder
const postsDirectory = path.join(process.cwd(), "blogposts");

export function getSortedPostsData() {
  // get file name under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    // remove .md from file name to get the id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as a string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // use gray matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const blogPost: BlogPost = {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
    };

    // combine the data with the id
    return blogPost;
  });
  //   sort by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// get singlePost logic with remark package
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  const blogPostWithHTML: BlogPost & { contentHtml: string } = {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHtml,
  };

  // Combine the data with the id
  return blogPostWithHTML;
}
