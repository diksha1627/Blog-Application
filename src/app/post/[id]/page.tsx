import { Container, Typography, Card, CardContent, Stack, Button, CircularProgress } from "@mui/material";
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Post = {
  id: number;
  title: string;
  body: string;
};

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export default async function PostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id);

  let post: Post | null = null;
  let comments: Comment[] = [];
  let error: string | null = null;

  try {
    // Fetch post data
    const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    if (!postRes.ok) {
      throw new Error(`Failed to fetch post data: ${postRes.statusText}`);
    }
    post = await postRes.json();

    if (!post.id) {
      notFound(); // Handle post not found
    }

    // Fetch comments for the post
    const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    if (!commentsRes.ok) {
      throw new Error(`Failed to fetch comments: ${commentsRes.statusText}`);
    }
    comments = await commentsRes.json();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  if (error) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Post not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      {/* Go Back Button */}
      <Button
        component={Link}
        href="/"
        variant="outlined"
        sx={{ mb: 4, borderRadius: 1, borderColor: "purple", color: "purple", '&:hover': { borderColor: "darkpurple", color: "darkpurple" } }}
      >
        Go Back
      </Button>

      {/* Post Details */}
      <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Post - {post.id}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body1" component="p">
            {post.body}
          </Typography>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
        Comments
      </Typography>

      <Stack spacing={2}>
        {comments.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No comments available.
          </Typography>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} sx={{ boxShadow: 2, borderRadius: 2, backgroundColor: "#e9e2ff" }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {comment.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {comment.email}
                </Typography>
                <Typography variant="body1" component="p">
                  {comment.body}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
    </Container>
  );
}
