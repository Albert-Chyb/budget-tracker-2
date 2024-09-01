export type TCategory = {
  id: number;
  name: string;
  rgb: string;
  type: TCategoryType;
};

export type TCategoryType = 'income' | 'expense';
