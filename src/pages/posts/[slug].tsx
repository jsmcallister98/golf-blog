import { trpc } from "@utils/trpc";
import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { useMemo } from "react";
import { IPostData } from "types";
import { getAllPostSlugs, getPostData } from "../../utils/posts";

interface IBlogPost {
  code: string;
  frontmatter: IPostData;
}

interface IUrlParams extends ParsedUrlQuery {
  slug: string;
}

const BlogPost: NextPage<IBlogPost> = ({ code, frontmatter }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const { data } = trpc.useQuery([
    "comments.byPost",
    {
      postId: 1,
    },
  ]);

  return (
    <>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.slug}</p>
      <p>{frontmatter.date}</p>
      <article>
        <Component />
      </article>
      <div>
        {data?.map(({ comment }, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IUrlParams;
  const postData = await getPostData(slug);
  return {
    props: {
      ...postData,
    },
  };
};

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export default BlogPost;
