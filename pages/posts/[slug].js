import { getPosts, getSinglePost } from "../../lib/post";

const PostPage = (props) => {
    return <div>
        <img src={props.post.feature_image} />
        <h1>{props.post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: props.post.html }} />
    </div>
}

export async function getStaticPaths() {
    const posts = await getPosts();
  
    // Get the paths we want to create based on posts
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));
  
    // "fallback: false" gives us a 404 if post not found
    return { paths, fallback: false };
  }
  
  export async function getStaticProps(context) {
    const post = await getSinglePost(context.params.slug);
  
    if (!post) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: { post },
      revalidate: 1,
    };
  }

  export default PostPage;