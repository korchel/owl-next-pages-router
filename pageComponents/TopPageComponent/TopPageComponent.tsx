import parse from 'html-react-parser';
import { useEffect, useReducer } from 'react';
import { useReducedMotion } from 'framer-motion';

import styles from './TopPageComponent.module.css';
import { TopPageComponentProps } from './TopPageComponent.props';
import { Advantages, HhData, Htag, Product, Ptag, Sort, Tag } from '@/components';
import { TopLevelCategory } from '@/interfaces/page.interface';
import { SortEnum } from '@/components/Sort/Sort.props';
import { sortReducer } from './sort.reducer';
import useScrollY from '@/hooks/useScrollY';

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });
  const shouldReduceMotion = useReducedMotion();

  const y = useScrollY();

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  useEffect(() => {
    dispatchSort({ type: 'reset', newState: products });
  }, [products]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && <Tag color="gray" size="m" aria-label={products.length + 'штук'}>{products.length}</Tag>}
        <Sort sort={sort} setSort={setSort}/>
      </div>
      <div role="list">
        {sortedProducts && sortedProducts.map((product) => (
          <Product
            role="listitem"
            layout={shouldReduceMotion ? false : true}
            key={product._id}
            product={product}
          />
        ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag color="red" size="m">hh.ru</Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2">Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && <div className={styles.seo}>{parse(page.seoText)}</div>}
      <Htag tag="h2">Получаемые навыки</Htag>
      {page.tags.map((tag) => <Tag color="primary"key={tag}>{tag}</Tag>)}
    </div>
  );
};