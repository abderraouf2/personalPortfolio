import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Blogs.module.scss";
import PageLoader from "@/components/loader/PageLoader";

export default function BlogPage({ blog }) {
  if (!blog) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <main>
      <Head>
        <title>Abderraouf - Mimoune || {blog.title}</title>
        <meta name="description" content={blog.description} />

        {/* ✅ Open Graph Meta */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:image" content={blog.bannerImg} />
        <meta
          property="og:url"
          content={`https://abderraouf.dev/blogs/${blog.id}`}
        />
        <meta property="og:type" content="article" />

        {/* ✅ Twitter Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.description} />
        <meta name="twitter:image" content={blog.bannerImg} />
      </Head>

      <div className="mb-40">
        <div className="fixed top-10 left-0 w-full px-[2%] flex gap-8 justify-end items-center">
          <Link href="/blogs">
            <button className="text-[20px] font-[600] hover:text-[#ffce08] duration-300">
              .Blogs
            </button>
          </Link>
          <Link href="/">
            <button className="text-[20px] font-[600] hover:text-[#ffce08] duration-300">
              .Home
            </button>
          </Link>
        </div>

        <div className="mt-[20%] w-full px-[2%] xs:px-[5%] md:px-[10%] l:mt-[10%] l:px-[20%]">
          <h1 className="m-auto text-[28px] font-[600] md:text-[36px] l:text-[42px] text-center">
            {blog.title}
          </h1>

          <p className="text-[14px] font-[450] md:text-[16px] l:text-[16px] my-4">
            {blog.description}
          </p>

          <div className="flex flex-wrap gap-2 my-[3%] items-center">
            {blog.categories.map((category, index) => (
              <span
                key={index}
                className="py-1 px-4 rounded-xl bg-[#043873] font-[500] bg-opacity-10"
              >
                {category}
              </span>
            ))}
            <p>{blog.timeToRead} read</p>
          </div>

          <Image
            src={blog.bannerImg}
            alt={blog.title}
            width={1080}
            height={720}
            className="w-full h-auto m-auto"
          />

          <div className="my-6 rounded">
            <div
              className={styles.blogContent}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`${process.env.SERVER}/api/getBlog?id=${id}`);
    const data = await res.json();

    if (!data.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blog: data.data,
      },
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      props: {
        blog: null,
      },
    };
  }
}
