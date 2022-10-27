import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import relativeTime from 'dayjs/plugin/relativeTime'; // 相対日時のプラグインを有効化
import { Check, Favorite, ThumbUp, Twitter } from '@mui/icons-material';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { ImpressionFragment } from '../../graphql/generated.graphql';

dayjs.extend(relativeTime);
dayjs.locale('ja');

type Props = {
  impressions: ImpressionFragment[];
};

export function StickerIcon({
  sticker,
  fontSize,
}: {
  sticker?: string;
  fontSize: string;
}): React.ReactElement {
  if (sticker === 'Good') {
    return <ThumbUp sx={{ fontSize }} />;
  } else if (sticker === 'Thanks') {
    return <Check sx={{ fontSize }} />;
  } else {
    return <Favorite sx={{ fontSize }} />;
  }
}

export function impressionComment(impression: ImpressionFragment): string {
  if (impression.comment) return impression.comment;
  if (impression.sticker === 'Good') {
    return 'Good!!';
  } else if (impression.sticker === 'Thanks') {
    return 'Thanks!!';
  } else {
    return 'Like';
  }
}

export function ImpressionView(props: Props): React.ReactElement {
  return (
    <List dense disablePadding>
      {props.impressions.map((impression, index) => (
        <div key={impression.id}>
          <ListItem alignItems="flex-start" disableGutters>
            <ListItemText
              primary={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <StickerIcon sticker={impression.sticker} fontSize="1rem" />
                  <Typography
                    variant={'body2'}
                    color="primary"
                    whiteSpace="pre-wrap"
                    sx={{ wordBreak: 'break-word' }}
                  >
                    {impressionComment(impression)}
                  </Typography>
                </Stack>
              }
              secondaryTypographyProps={{
                variant: 'caption',
                color: grey[600],
              }}
              secondary={
                <Stack direction="row" justifyContent="space-between">
                  <Box>{dayjs(impression.createdAt).fromNow()}</Box>
                  {impression.twitterId ? (
                    <Stack direction="row" alignItems="center">
                      <Twitter sx={{ fontSize: 15 }} />
                      <Box>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://twitter.com/${impression.twitterId}`}
                        >
                          {impression.twitterId}
                        </a>
                      </Box>
                    </Stack>
                  ) : (
                    <></>
                  )}
                </Stack>
              }
            />
          </ListItem>
          <Divider variant="fullWidth" component="li" />
        </div>
      ))}
    </List>
  );
}
