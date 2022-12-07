export function assertFilters(filters: {
  date: { from: Date; to: Date } | null;
  activity: string | null;
}): asserts filters is {
  date: { from: Date; to: Date };
  activity: string;
} {
  const errors: { 'filtres.date'?: string[]; 'filters.activity'?: string[] } = {};
  if (!filters.date) {
    errors['filtres.date'] = ['Enter date'];
  }
  if (!filters.activity) {
    errors['filters.activity'] = ['Choose activity'];
  }
  if (Object.keys(errors).length) {
    throw errors;
  }
}
