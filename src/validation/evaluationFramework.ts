export const frameworkIdParam = {
  frameworkId: {
    type: 'number',
    integer: true,
    positive: true,
    convert: true,
  },
};

export const categoriesByTaxonomyQuery = {
  $$strict: true,

  dealTypeId: {
    type: 'number',
    integer: true,
    positive: true,
    convert: true,
  },

  industryId: {
    type: 'number',
    integer: true,
    positive: true,
    convert: true,
  },

  sectorId: {
    type: 'number',
    integer: true,
    positive: true,
    convert: true,
  },
};