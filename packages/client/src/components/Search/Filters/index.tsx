import {
  Box,
  Checkbox,
  CheckboxGroup,
  FormLabel,
  HStack,
  Select
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';

/**
 * Types & Constants
 */
import { ROOMS_ENUM_TO_VALUES } from '../../../lib/constants';
import { ApartmentQueryInput, RoomsCount } from '../../../generated/graphql';

type Props = {
  filters: ApartmentQueryInput;
  onFilterChange: (
    key: 'roomsCount' | 'price' | 'size',
    value: number | RoomsCount
  ) => void;
};

const SearchFilters: FunctionComponent<Props> = ({
  filters,
  onFilterChange
}) => (
  <Box
    as="section"
    alignItems="flex-end"
    display="flex"
    padding="25px 0"
    marginBottom="20px"
    position="sticky"
    top="0"
    background="#fff"
    zIndex={1}
  >
    <Box>
      <FormLabel>Rooms count:</FormLabel>
      <CheckboxGroup
        colorScheme="green"
        onChange={val =>
          onFilterChange('roomsCount', val as unknown as RoomsCount)
        }
      >
        <HStack>
          {Object.values(RoomsCount).map(rc => (
            <Checkbox key={rc} value={rc}>
              {ROOMS_ENUM_TO_VALUES[rc]}
            </Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>
    </Box>

    <Select
      value={filters.price || undefined}
      marginLeft="25px"
      variant="outline"
      placeholder="Price"
      onChange={e => onFilterChange('price', Number(e.target.value))}
    >
      <option value="">any price</option>
      <option value="1000">less than 1000$</option>
      <option value="3000">less than 3000$</option>
      <option value="5000">less than 5000$</option>
      <option value="10000">less than 10000$</option>
    </Select>

    <Select
      value={filters.size || undefined}
      marginLeft="15px"
      variant="outline"
      placeholder="Size"
      onChange={e => onFilterChange('size', Number(e.target.value))}
    >
      <option value="">any size</option>
      <option value="25">more than 25m²</option>
      <option value="45">more than 45m²</option>
      <option value="65">more than 65m²</option>
      <option value="100">more than 100m²</option>
    </Select>
  </Box>
);

export default SearchFilters;
