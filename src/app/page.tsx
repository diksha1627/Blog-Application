import { Stack, Typography, Container, Card, CardContent, Grid, Button } from "@mui/material";
import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default async function HomePage() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    // Fetch data on the server
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      next: { revalidate: 10 }, // Optional: Revalidate every 10 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    posts = await res.json();
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

  return (
    <Container sx={{ mt: 4 }}>
      <Stack spacing={2} direction="column">
        <Typography variant="h4" component="h1" sx={{ fontWeight: "900", textAlign: "center" }} gutterBottom>
          Blog App
        </Typography>
        <Grid container spacing={1}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', height: '100%', margin: "1rem" }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {post.body}
                  </Typography>
                </CardContent>
                <Stack direction="row" spacing={1} sx={{ p: 2 }}>
                  <Button 
                    component={Link} 
                    href={`/post/${post.id}`} 
                    variant="contained" 
                    sx={{ borderRadius: 1, backgroundColor: "purple" }}
                  >
                    View Post
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
