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
import { Clock, Loader2, Search, Star, XCircle } from 'lucide-react';
import { useLocationSearch } from '@/hooks/use-weather';
import { CommandSeparator } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { useSearchHistory } from '@/hooks/use-search-history';
import { format } from 'date-fns';
import { useFavorite } from '@/hooks/use-favorite';

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearch(query);
  const { history, addToHistory, clearHistory } = useSearchHistory();

  const handlSelectLocation = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split(' | ');

    // Add the city to the recent searches
    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  const { favorites } = useFavorite();

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

          {favorites.length > 0 && (
            <CommandGroup heading="Favorites">
              {favorites.map((location) => {
                return (
                  <CommandItem
                    key={location.id}
                    value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                    onSelect={handlSelectLocation}
                  >
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
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

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 my-2">
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    Recent Searches
                  </p>
                  <Button
                    variant={'ghost'}
                    size="sm"
                    onClick={() => clearHistory.mutate()}
                  >
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>

                {history.map((location) => {
                  return (
                    <CommandItem
                      key={`${location.lat}-${location.lon}`}
                      value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                      onSelect={handlSelectLocation}
                    >
                      <Clock className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-300" />
                      <span>{location.name}</span>
                      {location.state && (
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          , {location.state}
                        </span>
                      )}
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        , {location.country}
                      </span>
                      <span className="ml-auto text text-gray-700 dark:text-gray-300">
                        {format(location.searchedAt, 'MMM d, h:mm a')}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}

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
