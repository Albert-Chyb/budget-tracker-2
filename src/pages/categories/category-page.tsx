import CategoryForm from '@/components/categories/category-form';
import { CategoriesPageLoaderData } from '@/loaders/categories-page-loader';
import { useLoaderData, useNavigation } from 'react-router-dom';

export default function CategoryPage() {
  const { categoriesColors } = useLoaderData() as CategoriesPageLoaderData;
  const { state } = useNavigation();
  const isLoading = state === 'loading';

  return (
    <>
      {!isLoading ? (
        <CategoryForm colors={categoriesColors} />
      ) : (
        'Pobieram dane'
      )}
    </>
  );
}
