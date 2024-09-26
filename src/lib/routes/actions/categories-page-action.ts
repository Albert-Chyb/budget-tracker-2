import { ActionFunction } from 'react-router-dom';

function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export const categoriesPageAction = (async ({ request }) => {
  const formData = await request.formData();
  const formValue = Object.fromEntries(formData);

  console.log('Categories page action', formValue);
  // TODO: Remove this line once the action is integrated with backend
  await wait(1_000);

  if (request.method === 'DELETE') {
    console.log(`Deleted category with id ${formValue.id}`);
  } else if (request.method === 'POST') {
    console.log('INSERT INTO categories table');
  } else if (request.method === 'PUT') {
    console.log(`UPDATE categories table`);
  }

  return {};
}) satisfies ActionFunction;
