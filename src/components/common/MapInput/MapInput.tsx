import React from 'react';
import GoogleMapReact from 'google-map-react';
import getConfig from 'next/config';

import { SearchBox } from './components/SearchBox';
import MapInputLayout from './MapInputLayout';

const { publicRuntimeConfig } = getConfig();

const GOOGLE_MAPS_API_KEY = publicRuntimeConfig?.GOOGLE_MAPS_API_KEY;

interface ILocation {
  lat: number;
  lng: number;
}

interface IGoogleApi {
  map: google.maps.Map;
  maps: typeof google.maps;
}

interface IMapInputProps {
  label: string;
  placeholder: string;
  defaultCenter: ILocation;
  value?: ILocation;
  onChange(location: ILocation): void;
}

const MapInput = ({ value, label, defaultCenter, placeholder, onChange }: IMapInputProps) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();
  const [googleApi, setMaps] = React.useState<IGoogleApi | undefined>();
  const [geocoder, setGeocoder] = React.useState<google.maps.Geocoder>();
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (googleApi) {
      setGeocoder(new googleApi.maps.Geocoder());
    }
  }, [googleApi]);

  const initializeMaps = async ({ map, maps }: IGoogleApi) => {
    setMarker(new maps.Marker({ position: value, map }));
    setMaps({ map, maps });

    try {
      const result = await new maps.Geocoder()?.geocode({ location: value });
      setQuery(result?.results[0].formatted_address || '');
    } catch (err) {}
  };

  const handleChangePosition = (position: ILocation) => {
    marker?.setPosition(position);

    onChange(position);
  };

  const handlePlaceMarker = async ({ lat, lng }: ILocation) => {
    const position = { lat, lng };

    try {
      const result = await geocoder?.geocode({ location: position });
      setQuery(result?.results[0].formatted_address || '');
    } catch (err) {}

    handleChangePosition(position);
  };

  return (
    <MapInputLayout
      searchBox={
        googleApi && (
          <SearchBox
            placeholder={placeholder}
            label={label}
            query={query}
            onQueryChange={setQuery}
            map={googleApi.map}
            mapApi={googleApi.maps}
            onPlaceChange={handleChangePosition}
          />
        )
      }
      map={
        <GoogleMapReact
          bootstrapURLKeys={{
            key: GOOGLE_MAPS_API_KEY as string,
            libraries: ['places'],
          }}
          defaultCenter={defaultCenter}
          center={value}
          defaultZoom={13}
          onClick={handlePlaceMarker}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={initializeMaps}
        />
      }
    />
  );
};

export default MapInput;
