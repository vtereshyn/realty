import { Button } from '@chakra-ui/react';
import { FunctionComponent, ReactNode } from 'react';

type Props = {
  isLoading?: boolean;
  children: ReactNode;
  hasNext: boolean;
  next: () => void;
};

const PaginatedContainer: FunctionComponent<Props> = ({
  next,
  hasNext,
  isLoading,
  children
}) => (
  <>
    {children}
    {hasNext && (
      <Button
        display="flex"
        margin="20px auto 0"
        type="button"
        isLoading={isLoading}
        onClick={next}
      >
        Load More
      </Button>
    )}
  </>
);

export default PaginatedContainer;
