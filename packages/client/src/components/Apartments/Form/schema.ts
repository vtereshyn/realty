import * as yup from 'yup';
import { RoomsCount } from '../../../generated/graphql';

export const schema = yup.object({
  name: yup.string().required('Please provide name'),
  realtorId: yup.string().required('Please choose realtor'),
  size: yup.number().required('Please provide size').min(10),
  price: yup.number().required('Please provide price').min(100),
  roomsCount: yup.mixed<RoomsCount>().required('Please provide rooms count'),
  description: yup.string().required('Please provide description'),
  address: yup.string().required('Please provide address'),
  coordinates: yup.object({
    lat: yup.number().required('Please provide lat'),
    lng: yup.number().required('Please provide lng')
  })
});

export type ApartmentFormType = yup.InferType<typeof schema>;
