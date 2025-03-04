import { useState } from 'react';
import { Button } from './ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { Loader2, Search } from 'lucide-react';
import { useLocationSearch } from '@/hooks/use-weather';
import { CommandSeparator } from 'cmdk';
import { useNavigate } from 'react-router-dom';

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearch(query);

  const handlSelectLocation = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split(' | ');

    // Add the city to the recent searches

    setOpen(false);
    navigate(`/city?name=${name}&country=${country}&lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        variant={'neumorphism'}
        className="relative w-full justify-start text-sm text-gray-900 dark:text-gray-100 sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search Cities
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search Cities"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No cities found.</CommandEmpty>
          )}
          <CommandGroup heading="Favorites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Recent Searches">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              )}
              {locations.map((location) => {
                return (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                    onSelect={handlSelectLocation}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      , {location.country}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
