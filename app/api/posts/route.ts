import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

const postsDirectory = path.join(process.cwd(), "blogposts");

// export default function handler(req: any, res: any) {
//     const posts = getSortedPostsData();
//     res.status(200).json(posts);
// }

// get
export async function GET() {
    const res = await getSortedPostsData()
    return NextResponse.json(res)
}

function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
            id,
            title: data.title,
            date: data.date,
        };
    });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}