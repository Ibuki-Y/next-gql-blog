import type { GetServerSideProps, NextPage } from 'next';
import { Box, Container, Stack, Typography } from '@mui/material';
import { PostListView } from '../src/components/post/PostListView';
import { ProfileView } from '../src/components/profile/ProfileView';
import { urqlClient } from '../src/libs/gql-requests';
import {
  PostFragment,
  PostIndexPageDocument,
  ProfileFragment,
} from '../src/graphql/generated.graphql';

type Props = {
  articles: PostFragment[];
  diaries: PostFragment[];
  profile: ProfileFragment;
};

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        sx={{
          minHeight: '100vh',
        }}
      >
        <Container fixed sx={{ mt: 8, ml: 8 }}>
          <Typography variant="h4">Articles</Typography>
          <PostListView posts={props.articles} />
          <Typography variant="h4">Diaries</Typography>
          <PostListView posts={props.diaries} />
        </Container>
        <Box
          sx={{
            p: 4,
            width: '400px',
            backgroundColor: (theme) => theme.palette.primary.light,
          }}
        >
          <ProfileView {...props.profile} />
        </Box>
      </Stack>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.primary.dark,
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.primary.dark),
          py: 3,
          textAlign: 'center',
          // marginTop: "auto",
        }}
      >
        <footer>
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Vercel
          </a>
        </footer>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const client = await urqlClient();

    const result = await client.query(PostIndexPageDocument, {}).toPromise();

    return {
      props: {
        articles: result.data.articles,
        diaries: result.data.diaries,
        profile: result.data.profile,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};

export default Home;
