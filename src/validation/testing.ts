export const testingListQuery = {
  limit: { type: 'number', optional: true, convert: true, default: 100 },
  offset: { type: 'number', optional: true, convert: true, default: 0 },
};
