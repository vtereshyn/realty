import {
  Box,
  Radio,
  Input,
  Stack,
  HStack,
  VStack,
  Textarea,
  Container,
  RadioGroup,
  FormLabel,
  FormControl,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper
} from '@chakra-ui/react';
import { getIn } from 'formik';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';

/**
 * Components
 */
import Realtors from './Realtors';
import PermissionRender from '../../PermissionRender';
import GoogleAutocomplete from '../../GoogleAutocomplete';

/**
 * Types
 */
import { ApartmentFormType } from './schema';
import { FormProps } from '../../../lib/types';
import { RoomsCount, UserRole } from '../../../generated/graphql';

/**
 * Constants
 */
import { ROOMS_ENUM_TO_VALUES } from '../../../lib/constants';

/**
 * Utils
 */
import { geocodeLatLng, loadGoogleMapScript } from '../../../lib/utils';

type Props = FormProps<ApartmentFormType>;

const Form: FunctionComponent<Props> = ({
  values,
  errors,
  touched,
  children,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue
}) => {
  const [isGoogleMapScriptLoaded, setGoogleMapScriptLoaded] = useState(false);
  useEffect(() => {
    async function load() {
      await loadGoogleMapScript();
      setGoogleMapScriptLoaded(true);
    }
    load();
  }, []);

  const getFieldError = useCallback(
    (name: keyof ApartmentFormType) =>
      getIn(errors, name) && getIn(touched, name) ? getIn(errors, name) : '',
    [errors, touched]
  );

  function setAddressByCoordinates() {
    if (!!values.coordinates.lat && !!values.coordinates.lng) {
      return geocodeLatLng(values.coordinates).then(address =>
        setFieldValue('address', address)
      );
    }
    return null;
  }

  return (
    <>
      <Container display="flex" margin="0" padding="0" flexDirection="column">
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isInvalid={getFieldError('name')}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                size="lg"
                id="name"
                name="name"
                type="text"
                value={values.name}
                placeholder="Ex: Great apartment on Poznyaki"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <FormErrorMessage>{getFieldError('name')}</FormErrorMessage>
            </FormControl>

            <FormControl id="address" isInvalid={getFieldError('address')}>
              <FormLabel htmlFor="address">Address</FormLabel>
              <GoogleAutocomplete
                isScriptLoaded={isGoogleMapScriptLoaded}
                initialValue={values.address}
                onBlur={handleBlur}
                onSelect={val => {
                  setFieldValue('address', val.name);
                  setFieldValue('coordinates', val.coordinates);
                }}
              />
              <FormErrorMessage>{getFieldError('address')}</FormErrorMessage>
            </FormControl>

            <Box as="p">or</Box>

            <HStack width="100%" justifyContent="space-between">
              <FormControl
                id="latitude"
                isInvalid={getFieldError('coordinates')}
              >
                <FormLabel htmlFor="latitude">Latitude</FormLabel>
                <NumberInput
                  precision={10}
                  name="coordinates.lat"
                  min={0}
                  step={0.1}
                  value={values.coordinates.lat}
                  onBlur={setAddressByCoordinates}
                  onChange={(_, val) => setFieldValue('coordinates.lat', val)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {getFieldError('coordinates')}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                id="longtitude"
                isInvalid={getFieldError('coordinates')}
              >
                <FormLabel htmlFor="longtitude">Longtitude</FormLabel>
                <NumberInput
                  precision={10}
                  name="coordinates.lng"
                  min={0}
                  step={0.1}
                  value={values.coordinates.lng}
                  onBlur={setAddressByCoordinates}
                  onChange={(_, val) => setFieldValue('coordinates.lng', val)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>

            <FormControl id="price">
              <FormLabel htmlFor="price">Price ($)</FormLabel>
              <NumberInput
                name="price"
                step={10}
                min={100}
                value={values.price}
                onChange={(_, val) => setFieldValue('price', val)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl id="size">
              <FormLabel htmlFor="size">Size (м²)</FormLabel>
              <NumberInput
                name="size"
                step={10}
                min={10}
                value={values.size}
                onChange={(_, val) => setFieldValue('size', val)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl id="roomsCount">
              <FormLabel htmlFor="roomsCount">Rooms count</FormLabel>
              <RadioGroup
                value={values.roomsCount}
                onChange={val => setFieldValue('roomsCount', val)}
              >
                <Stack direction="row">
                  {Object.values(RoomsCount).map(rc => (
                    <Radio key={rc} value={rc}>
                      {`${ROOMS_ENUM_TO_VALUES[rc]} rooms`}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl
              id="description"
              isInvalid={getFieldError('description')}
            >
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                size="lg"
                id="description"
                name="description"
                type="text"
                value={values.description}
                placeholder="Ex: Great living condition. Fridge..."
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <FormErrorMessage>{getFieldError('name')}</FormErrorMessage>
            </FormControl>

            <PermissionRender allowed={[UserRole.Admin]}>
              <FormControl id="realtor" isInvalid={getFieldError('realtorId')}>
                <FormLabel htmlFor="realtor">Realtor</FormLabel>
                <Realtors
                  activeId={values.realtorId}
                  onRealtorClick={id => setFieldValue('realtorId', id)}
                />
                <FormErrorMessage>
                  {getFieldError('realtorId')}
                </FormErrorMessage>
              </FormControl>
            </PermissionRender>

            {children}
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default Form;
