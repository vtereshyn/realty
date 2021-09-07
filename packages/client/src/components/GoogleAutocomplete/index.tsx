// TODO: split this component into Autocomplete and Google autocomplete

import Downshift from 'downshift';
import { Box, Input } from '@chakra-ui/react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { ChangeEvent, FunctionComponent, FocusEvent, useEffect } from 'react';

function geocodeByPlaceId(
  placeId: string
): Promise<google.maps.GeocoderResult[]> {
  const geocoder = new window.google.maps.Geocoder();
  const { OK } = window.google.maps.GeocoderStatus;

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { placeId },
      (
        results: google.maps.GeocoderResult[] | null,
        status: google.maps.GeocoderStatus | null
      ) => {
        if (status !== OK) {
          return reject(status);
        }

        if (results) {
          return resolve(results);
        }
      }
    );
  });
}

function getLatLngFromLocation(location: google.maps.LatLng) {
  return {
    lat: location.lat(),
    lng: location.lng()
  };
}

type Props = {
  isScriptLoaded: boolean;
  initialValue?: string;
  onBlur: (e: FocusEvent) => void;
  onSelect: (val: any) => void;
};

const GoogleAutocomplete: FunctionComponent<Props> = ({
  initialValue,
  isScriptLoaded,
  onSelect,
  onBlur
}) => {
  const {
    suggestions: { data },
    init,
    value,
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    defaultValue: initialValue,
    debounce: 300,
    cache: 24 * 60 * 60,
    requestOptions: {
      componentRestrictions: {
        country: 'ua'
      }
    }
  });

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (isScriptLoaded) {
      init();
    }
  }, [isScriptLoaded, init]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  async function handleSelect(val: any) {
    const [
      {
        formatted_address,
        geometry: { location }
      }
    ] = await geocodeByPlaceId(val.place_id);
    onSelect({
      id: val.place_id,
      name: formatted_address,
      coordinates: getLatLngFromLocation(location)
    });
    clearSuggestions();
  }

  return (
    <Downshift
      inputValue={value}
      initialInputValue={value}
      itemToString={item => item?.description || ''}
      onSelect={handleSelect}
    >
      {({
        isOpen,
        inputValue,
        highlightedIndex,
        getRootProps,
        getInputProps,
        getItemProps,
        getMenuProps
      }) => (
        <Box {...getRootProps()} as="div" position="relative">
          <Input
            {...getInputProps({
              id: 'address',
              size: 'lg',
              name: 'address',
              type: 'text',
              value: inputValue?.toString(),
              placeholder: 'Ex: Khreschatyk Street, 5, Kyiv, Ukraine',
              onBlur,
              onChange: handleChange
            })}
          />
          {isOpen ? (
            <Box
              {...getMenuProps()}
              zIndex={1}
              background="#fff"
              borderRadius="var(--chakra-radii-md)"
              transform="translateY(100%)"
              as="ul"
              position="absolute"
              bottom="0"
              left="0"
              width="100%"
              listStyleType="none"
              border="1px solid #e2e8f0"
              borderTop="none"
            >
              {data.map((s, index) => (
                <Box
                  {...getItemProps({ index, item: s })}
                  cursor="pointer"
                  key={s.place_id}
                  _notLast={{ borderBottom: '1px solid #e2e8f0' }}
                  as="li"
                  padding="10px 20px"
                  background={highlightedIndex === index ? '#f5f5f5' : '#fff'}
                  transition="background .2s ease"
                  _hover={{ backgroundColor: '#f5f5f5' }}
                >
                  {s.description}
                </Box>
              ))}
            </Box>
          ) : null}
        </Box>
      )}
    </Downshift>
  );
};

export default GoogleAutocomplete;
