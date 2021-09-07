import { Circle } from '@chakra-ui/react';
import { FunctionComponent, memo } from 'react';
import { Coordinates, RentStatus } from '../../../generated/graphql';

export type PinProps = Coordinates & {
  status: RentStatus;
};

const STATUS_TO_COLOR: { [key in RentStatus]: string } = {
  [RentStatus.Rented]: '#b1afaa',
  [RentStatus.Available]: '#ff9800'
};

const Pin: FunctionComponent<PinProps> = memo(({ status }) => (
  <Circle
    width="10px"
    height="10px"
    cursor="pointer"
    bg={STATUS_TO_COLOR[status]}
    border="1px solid #fff"
    transition="transform .2s ease-in"
    _hover={{ transform: 'scale(1.5)' }}
  />
));

export default Pin;
