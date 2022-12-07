import { Input } from '@components/common/Input';
import React from 'react';

interface IPosition {
  lat: number;
  lng: number;
}

interface ISearchBoxProps {
  label: string;
  placeholder: string;
  query: string;
  map: google.maps.Map;
  mapApi: typeof google.maps;
  onQueryChange(query: string): void;
  onPlaceChange(position: IPosition): void;
}

const SearchBox = ({ query, label, placeholder, onQueryChange, map, mapApi, onPlaceChange }: ISearchBoxProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const searchBoxRef = React.useRef<google.maps.places.SearchBox>();

  const handlePlaceChange = React.useCallback(() => {
    if (!searchBoxRef?.current) {
      return;
    }

    const selected = searchBoxRef.current.getPlaces() || [];
    const { 0: place } = selected;

    if (!place.geometry?.location) return;

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    onPlaceChange({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });

    onQueryChange(place.formatted_address || '');

    inputRef?.current?.blur();
  }, [onPlaceChange, searchBoxRef, map]);

  React.useEffect(() => {
    if (!searchBoxRef.current && inputRef.current && mapApi) {
      searchBoxRef.current = new mapApi.places.SearchBox(inputRef.current);
      searchBoxRef?.current.addListener('places_changed', handlePlaceChange);
      searchBoxRef?.current.bindTo('bounds', map);
    }

    return () => {
      if (mapApi) {
        mapApi.event.clearInstanceListeners(searchBoxRef);
      }
    };
  }, [mapApi, handlePlaceChange]);

  return (
    <Input
      label={label}
      placeholder={placeholder}
      ref={inputRef}
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      type="text"
    />
  );
};

export default SearchBox;
