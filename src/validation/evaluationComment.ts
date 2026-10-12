export const dealParameterCommentsParams = {
  dealId: {
    type: 'number',
    integer: true,
    positive: true,
    convert: true,
  },
  parameterId: {
    type: 'number',
    integer: true,
    positive: true,
    convert: true,
  },
};

export const dealParameterCommentIdParams = {
  ...dealParameterCommentsParams,
  commentId: {
    type: 'number',
    integer: true,
    positive: true,
    convert: true,
  },
};

export const upsertCommentBody = {
  $$strict: true,

  commentId: {
    type: 'number',
    integer: true,
    positive: true,
    optional: true,
    nullable: true,
    convert: true,
  },

  title: {
    type: 'string',
    min: 1,
    max: 500,
    trim: true,
  },

  comment: {
    type: 'string',
    min: 1,
    max: 5000,
    trim: true,
  },
};