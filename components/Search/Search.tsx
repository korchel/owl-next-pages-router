import cn from 'classnames';
import { KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/router';

import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import SearchIcon from './search.svg';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';


export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const goToSearchPage = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      goToSearchPage();
    }
  };

  return (
    <form className={cn(styles.search, className)} {...props} role="search">
      <Input
        placeholder="Поиск..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className={styles.input}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="primary"
        className={styles.searchButton}
        onClick={goToSearchPage}
        aria-label="Поиск по сайту"
      >
        <SearchIcon />
      </Button>
    </form>
  );
};