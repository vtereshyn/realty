import { Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import GoogleMapReact from 'google-map-react';

/**
 * Components
 */
import Pin, { PinProps } from './Pin';

/**
 * Constants
 */
import { KYIV_CENTER_COORDINATES } from '../../lib/constants';

/**
 * Types
 */
import { Apartment, Coordinates, RentStatus } from '../../generated/graphql';

type Props = {
  pins: Array<{
    status: RentStatus;
    apartmentId: Apartment['id'];
    coordinates: Coordinates;
  }>;
  defaultCenter?: Omit<PinProps, 'status' | 'onClick'>;
  onPinClick?: (apartmentId: Apartment['id']) => void;
};

const Map: FunctionComponent<Props> = ({
  pins,
  defaultCenter = KYIV_CENTER_COORDINATES,
  onPinClick
}) => (
  <Box height="100%" width="100%">
    <GoogleMapReact
      onChildClick={onPinClick}
      defaultZoom={12}
      defaultCenter={defaultCenter}
      bootstrapURLKeys={{
        key: process.env.REACT_APP_GOOGLE_MAP_API_KEY || ''
      }}
    >
      {pins.map(({ status, apartmentId, coordinates }) => (
        <Pin key={apartmentId} status={status} {...coordinates} />
      ))}
    </GoogleMapReact>
  </Box>
);

export default Map;
