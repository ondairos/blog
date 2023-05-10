import React from "react";
import Link from "next/link";

type Props = {
  post: BlogPost;
};

export default function ListItem({ post }: Props) {
  // destructure the id,title,date from the post prop
  const { id, title, date } = post;
  return (
    <div>
      <table></table>
    </div>
  );
}
