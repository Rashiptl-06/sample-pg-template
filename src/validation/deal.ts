export const createDealBody = {
  $$strict: true,

  sourceDealId: {
    type: 'number',
    integer: true,
    positive: true,
    convert: true,
  },

  repositoryId: {
    type: 'number',
    integer: true,
    positive: true,
    convert: true,
  },

  dealName: {
    type: 'string',
    min: 1,
    max: 255,
    trim: true,
  },

  sectorId: {
    type: 'number',
    integer: true,
    positive: true,
    convert: true,
  },

  geographyId: {
    type: 'number',
    integer: true,
    positive: true,
    convert: true,
  },

  sponsorId: {
    type: 'number',
    integer: true,
    positive: true,
    optional: true,
    nullable: true,
    convert: true,
  },

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

  ndaConfirmed: {
    type: 'boolean',
    convert: true,
  },

  stageId: {
    type: 'number',
    integer: true,
    positive: true,
    optional: true,
    nullable: true,
    convert: true,
  },
};

export const listDealsSortableFields = [
  'dealName',
  'createdAt',
  'updatedAt',
];

export const listDealsQuery = {
  $$strict: true,

  search: {
    type: 'string',
    optional: true,
    trim: true,
    max: 255,
  },

  sectorIds: {
    type: 'array',
    items: {
      type: 'number',
      integer: true,
      positive: true,
      convert: true,
    },
    optional: true,
    max: 50,
  },

  geographyIds: {
    type: 'array',
    items: {
      type: 'number',
      integer: true,
      positive: true,
      convert: true,
    },
    optional: true,
    max: 50,
  },

  industryIds: {
    type: 'array',
    items: {
      type: 'number',
      integer: true,
      positive: true,
      convert: true,
    },
    optional: true,
    max: 50,
  },

  dealTypeIds: {
    type: 'array',
    items: {
      type: 'number',
      integer: true,
      positive: true,
      convert: true,
    },
    optional: true,
    max: 50,
  },

  stageIds: {
    type: 'array',
    items: {
      type: 'number',
      integer: true,
      positive: true,
      convert: true,
    },
    optional: true,
    max: 50,
  },

  page: {
    type: 'number',
    integer: true,
    positive: true,
    optional: true,
    convert: true,
    default: 1,
  },

  limit: {
    type: 'number',
    integer: true,
    positive: true,
    optional: true,
    convert: true,
    default: 10,
    max: 100,
  },

  sortBy: {
    type: 'enum',
    values: listDealsSortableFields,
    optional: true,
    default: 'updatedAt',
  },

  sortOrder: {
    type: 'enum',
    values: ['asc', 'desc'],
    optional: true,
    default: 'desc',
  },
};

export const dealIdParam = {
  dealId: {
    type: 'number',
    integer: true,
    positive: true,
    convert: true,
  },
};

export const dealMaterialsSortableFields = [
  'dealFileId',
  'fileName',
  'fileType',
  'fileSize',
  'classificationName',
  'updatedAt',
];

export const dealMaterialsListQuery = {
  $$strict: true,

  search: {
    type: 'string',
    optional: true,
    trim: true,
    max: 255,
  },

  classificationId: {
    type: 'number',
    integer: true,
    positive: true,
    optional: true,
    convert: true,
  },

  page: {
    type: 'number',
    integer: true,
    positive: true,
    optional: true,
    convert: true,
    default: 1,
  },

  limit: {
    type: 'number',
    integer: true,
    positive: true,
    optional: true,
    convert: true,
    default: 10,
    max: 100,
  },

  sortBy: {
    type: 'enum',
    values: dealMaterialsSortableFields,
    optional: true,
    default: 'updatedAt',
  },

  sortOrder: {
    type: 'enum',
    values: ['asc', 'desc'],
    optional: true,
    default: 'desc',
  },
};

export const dealMaterialsBody = {
  $$strict: true,

  fileTypes: {
    type: 'array',
    items: {
      type: 'string',
      trim: true,
      min: 1,
    },
    optional: true,
    default: [],
    max: 50,
  },
};

export const dealAuditLogsQuery = {
  $$strict: true,

  page: {
    type: 'number',
    integer: true,
    positive: true,
    optional: true,
    convert: true,
    default: 1,
  },

  limit: {
    type: 'number',
    integer: true,
    positive: true,
    optional: true,
    convert: true,
    default: 20,
    max: 100,
  },
};

export const dealAuditLogsBody = {
  $$strict: true,

  performedByIds: {
    type: 'array',
    items: {
      type: 'string',
      trim: true,
      min: 1,
    },
    optional: true,
    max: 50,
  },

  actions: {
    type: 'array',
    items: {
      type: 'string',
      trim: true,
      min: 1,
    },
    optional: true,
    max: 50,
  },

  startDate: {
    type: 'string',
    optional: true,
    trim: true,
    pattern: /^\d{4}-\d{2}-\d{2}$/,
  },

  endDate: {
    type: 'string',
    optional: true,
    trim: true,
    pattern: /^\d{4}-\d{2}-\d{2}$/,
  },
};

export const retryAiJobBody = {
  $$strict: true,

  jobType: {
    type: 'enum',
    values: [
      'PARAMETER_EVALUATION',
      'DILIGENCE_REPORT_GENERATION',
      'VIRTUAL_IC_MEMBER_REPORT_GENERATION',
      'BALANCED_REPORT_GENERATION',
    ],
  },

  versionId: {
    type: 'number',
    integer: true,
    positive: true,
    convert: true,
    optional: true,
  },
};
export const updateDealStageBody = {
  $$strict: true,

  stageId: {
    type: 'number',
    integer: true,
    positive: true,
    convert: true,
  },
};