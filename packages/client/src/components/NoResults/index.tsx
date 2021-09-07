import { Box, Heading } from '@chakra-ui/layout';
import { FunctionComponent, memo, ReactNode } from 'react';

type Props = {
  title?: string;
  description?: string;
  children?: ReactNode;
};

const NoResults: FunctionComponent<Props> = memo(
  ({
    children,
    title = 'No Results',
    description = 'Please, try to adjust the search criteria'
  }) => (
    <Box
      textAlign="center"
      padding="30px 15px"
      maxWidth={250}
      margin="auto"
      borderRadius={10}
      boxShadow="base"
    >
      <Heading as="h4" size="s">
        {title}
      </Heading>
      <Heading as="p" size="xs" fontWeight="400">
        {description}
      </Heading>
      {children}
    </Box>
  )
);

export default NoResults;
