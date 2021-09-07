import { FunctionComponent, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';

/**
 * Components
 */
import ApartmentItem from '../Item';
import { Apartment, Realtor } from '../../../generated/graphql';

type Props = {
  apartments: Array<
    Pick<
      Apartment,
      | 'id'
      | 'name'
      | 'price'
      | 'roomsCount'
      | 'status'
      | 'pictures'
      | 'location'
    > & {
      realtor?: Pick<Realtor, 'id' | 'firstName' | 'lastName' | 'email'>;
      description?: Apartment['description'];
    }
  >;
  children?: ReactNode;
};

const ApartmentList: FunctionComponent<Props> = ({ children, apartments }) => {
  const history = useHistory();

  function handleApartment(id: Apartment['id']) {
    history.push(`apartments/view/${id}`);
  }

  return (
    <Grid
      as="ul"
      gap={4}
      width="100%"
      listStyleType="none"
      templateColumns="repeat(auto-fill, minmax(275px, 1fr))"
    >
      {children}
      {apartments.map(apartment => (
        <GridItem as="li" key={apartment.id}>
          <ApartmentItem apartment={apartment} onClick={handleApartment} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default ApartmentList;
