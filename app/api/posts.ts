import fs from "fs";
import path from "path";
import matter, { GrayMatterFile } from "gray-matter";

interface BlogPost {
    id: string;
    title: string;
    date: string;
}

const postsDirectory = path.join(process.cwd(), "blogposts");

export default function handler(req: any, res: any) {
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult: GrayMatterFile<string> = matter(fileContents);

        const blogPost: BlogPost = {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
        };

        return blogPost;
    });

    const sortedPostsData = allPostsData.sort((a, b) =>
        a.date < b.date ? 1 : -1
    );
    console.log(sortedPostsData);
    res.status(200).json(sortedPostsData);
}
