import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { Box, Stack, Typography } from '@mui/material';
// import markdownToHtml from 'zenn-markdown-html';
// import 'zenn-content-css';
import { ImpressionContainer } from '../../src/components/impression/ImpressionContainer';
import {
  PostFragment,
  PostDetailPageDocument,
} from '../../src/graphql/generated.graphql';
import { urqlClient } from '../../src/libs/gql-requests';
// import { contentPath } from '../../src/libs/site';
import { isoStringToJstDate } from '../../src/libs/date';
import { getGraphqlEndpoint } from '../../src/libs/site';

type Props = {
  post: PostFragment;
  // bodyHtml: string;
};

const Page: NextPage<Props> = ({ post }) => {
  return (
    <Box sx={{ p: 4 }}>
      <article>
        <Stack>
          <Typography display="block" variant="caption" color={'textSecondary'}>
            {isoStringToJstDate(post.publishDate)}
          </Typography>
          <Typography
            display="block"
            variant="h4"
            color="textPrimary"
            sx={{
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              pb: 1,
              borderBottom: 'solid 5px #DEB887',
              position: 'relative',
              '&::after': {
                position: 'absolute',
                content: '""',
                display: 'block',
                borderBottom: 'solid 5px #B89061',
                bottom: '-5px',
                width: '20%',
              },
            }}
          >
            {post.title}
          </Typography>
          {/* <Box mt={4}>
            <div
              className="znc"
              dangerouslySetInnerHTML={{
                __html: bodyHtml,
              }}
            ></div>
          </Box> */}
          <ImpressionContainer postId={post.id} />
        </Stack>
      </article>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  try {
    // const resolvedSlug = ['posts'].concat(params!.slug as string[]);
    // const client = await urqlClient();
    // const result = await client
    //   .query(PostDetailPageDocument, {
    //     contentPath: contentPath(resolvedSlug.join("/")),
    //   })
    //   .toPromise();

    // const post = result.data.post;
    // const bodyHtml = markdownToHtml(post.bodyMarkdown); // サーバー側で実行する必要あり
    // console.log(post, bodyHtml);
    if (params === undefined || params.slug === undefined) {
      return { notFound: true };
    }
    const resolvedSlug = params.slug[0];
    const client = await urqlClient();
    const result = await client
      .query(PostDetailPageDocument, {
        id: resolvedSlug,
      })
      .toPromise();

    return {
      props: {
        post: result.data.post,
        // bodyHtml,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};

export default withUrqlClient(
  (_ssrExchange, ctx) => ({
    url: getGraphqlEndpoint(),
  }),
  { ssr: false },
)(Page);
