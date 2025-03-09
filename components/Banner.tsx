import { Movie } from '@/typings';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  trending: Movie[];
}

function Banner({ trending }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(trending[Math.floor(Math.random() * trending.length)]);
  }, [trending]);

  console.log(movie);

  return (
    <div>
      {/* <div>
        <Image />
    </div> */}
    </div>
  );
}

export default Banner;
