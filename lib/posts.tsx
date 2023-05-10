import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
