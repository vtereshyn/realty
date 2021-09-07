import { RoomsCount } from '../../generated/graphql';

export const ROOMS_ENUM_TO_VALUES: { [key in RoomsCount]: number | string } = {
  [RoomsCount.Room_1]: 1,
  [RoomsCount.Rooms_2]: 2,
  [RoomsCount.Rooms_3]: 3,
  [RoomsCount.Rooms_4]: 4,
  [RoomsCount.Rooms_5Plus]: '5+'
};

export const KYIV_CENTER_COORDINATES = {
  lat: 50.4345764,
  lng: 30.5342747
};

export const GOOGLE_MAP_SCRIPT_BASE_URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;
