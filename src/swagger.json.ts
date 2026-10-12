export const swaggerJson = () => ({
  openapi: '3.0.0',
  info: {
    description: 'PostgreSQL Template API',
    version: '1.0.0',
    title: 'Sample PG Template API',
  },
  servers: [
    {
      url: '/',
      description: 'Local',
    },
  ],
  tags: [{ name: 'TESTING' }, { name: 'DEALS' }, { name: 'EVALUATION FRAMEWORK' }],
  paths: {
    '/healthcheck': {
      get: {
        summary: 'Health check',
        tags: ['TESTING'],
        responses: {
          200: {
            description: 'Service is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                  example: 'OK',
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/testingdata': {
      get: {
        summary: 'Get all records from testing table',
        tags: ['TESTING'],
        responses: {
          200: {
            description: 'List of testing records',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer', example: 1 },
                          name: { type: 'string', example: 'Sample record' },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            $ref: '#/components/responses/UnauthorizedError',
          },
          403: {
            $ref: '#/components/responses/tokenRequired',
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    '/api/v1/deals': {
      get: {
        summary: 'Get all deals',
        tags: ['DEALS'],
        responses: {
          200: {
            description: 'List of deals',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 1 },
                      sourceDealId: { type: 'integer', example: 1 },
                      repositoryId: { type: 'integer', example: 101 },
                      dealName: {
                        type: 'string',
                        example: 'Acme Healthcare Acquisition',
                      },
                      sectorId: { type: 'integer', example: 1 },
                      geographyId: { type: 'integer', example: 1 },
                      sponsorId: { type: 'integer', nullable: true, example: 1 },
                      dealTypeId: { type: 'integer', example: 1 },
                      industryId: { type: 'integer', example: 1 },
                      stageId: { type: 'integer', nullable: true, example: 1 },
                      status: { type: 'string', example: 'Active' },
                      ndaConfirmed: { type: 'boolean', example: true },
                      aiOutputConfirmedBy: {
                        type: 'string',
                        nullable: true,
                        example: 'admin',
                      },
                      aiOutputConfirmedAt: {
                        type: 'string',
                        format: 'date-time',
                        nullable: true,
                      },
                      stageChangedBy: {
                        type: 'string',
                        nullable: true,
                        example: 'admin',
                      },
                      stageChangedAt: {
                        type: 'string',
                        format: 'date-time',
                        nullable: true,
                      },
                      completedAt: {
                        type: 'string',
                        format: 'date-time',
                        nullable: true,
                      },
                      createdBy: { type: 'string', example: 'admin' },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            $ref: '#/components/responses/UnauthorizedError',
          },
          403: {
            $ref: '#/components/responses/tokenRequired',
          },
        },
        security: [{ bearerAuth: [] }],
      },
      post: {
        summary: 'Create a new deal',
        tags: ['DEALS'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'sourceDealId',
                  'repositoryId',
                  'dealName',
                  'sectorId',
                  'geographyId',
                  'dealTypeId',
                  'industryId',
                  'ndaConfirmed',
                ],
                properties: {
                  sourceDealId: { type: 'integer', example: 5 },
                  repositoryId: { type: 'integer', example: 105 },
                  dealName: {
                    type: 'string',
                    example: 'Nova Healthcare Investment',
                  },
                  sectorId: { type: 'integer', example: 1 },
                  geographyId: { type: 'integer', example: 2 },
                  sponsorId: {
                    type: 'integer',
                    nullable: true,
                    example: 3,
                  },
                  dealTypeId: { type: 'integer', example: 1 },
                  industryId: { type: 'integer', example: 4 },
                  ndaConfirmed: { type: 'boolean', example: true },
                  stageId: {
                    type: 'integer',
                    nullable: true,
                    example: 1,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Deal created successfully',
          },
          401: {
            $ref: '#/components/responses/UnauthorizedError',
          },
          403: {
            $ref: '#/components/responses/tokenRequired',
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },

    '/api/v1/deals/{dealId}': {
      get: {
        tags: ['DEALS'],
        summary: 'Get deal by ID',
        security: [{ bearerAuth: [] }],

        parameters: [
          {
            in: 'path',
            name: 'dealId',
            required: true,
            schema: {
              type: 'integer',
              positive: true,
              example: 6,
            },
          },
        ],

        responses: {
          '200': {
            description: 'Deal retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'integer',
                          example: 6,
                        },
                        sourceDealId: {
                          type: 'integer',
                          example: 6,
                        },
                        repositoryId: {
                          type: 'integer',
                          example: 106,
                        },
                        dealName: {
                          type: 'string',
                          example: 'Apex Financial Services Expansion',
                        },
                        sectorId: {
                          type: 'integer',
                          example: 2,
                        },
                        geographyId: {
                          type: 'integer',
                          example: 3,
                        },
                        sponsorId: {
                          type: 'integer',
                          nullable: true,
                          example: 2,
                        },
                        dealTypeId: {
                          type: 'integer',
                          example: 2,
                        },
                        industryId: {
                          type: 'integer',
                          example: 3,
                        },
                        stageId: {
                          type: 'integer',
                          nullable: true,
                          example: 2,
                        },
                        status: {
                          type: 'string',
                          example: 'Draft',
                        },
                        ndaConfirmed: {
                          type: 'boolean',
                          example: false,
                        },
                        aiOutputConfirmedBy: {
                          type: 'string',
                          nullable: true,
                          example: null,
                        },
                        aiOutputConfirmedAt: {
                          type: 'string',
                          format: 'date-time',
                          nullable: true,
                          example: null,
                        },
                        stageChangedBy: {
                          type: 'string',
                          nullable: true,
                          example: null,
                        },
                        stageChangedAt: {
                          type: 'string',
                          format: 'date-time',
                          nullable: true,
                          example: null,
                        },
                        completedAt: {
                          type: 'string',
                          format: 'date-time',
                          nullable: true,
                          example: null,
                        },
                        createdBy: {
                          type: 'string',
                          example: 'system',
                        },
                        createdAt: {
                          type: 'string',
                          format: 'date-time',
                          example: '2026-09-28T04:49:16.829Z',
                        },
                        updatedAt: {
                          type: 'string',
                          format: 'date-time',
                          example: '2026-09-28T04:49:16.829Z',
                        },
                      },
                    },
                  },
                },

                example: {
                  success: true,
                  data: {
                    id: 6,
                    sourceDealId: 6,
                    repositoryId: 106,
                    dealName: 'Apex Financial Services Expansion',
                    sectorId: 2,
                    geographyId: 3,
                    sponsorId: 2,
                    dealTypeId: 2,
                    industryId: 3,
                    stageId: 2,
                    status: 'Draft',
                    ndaConfirmed: false,
                    aiOutputConfirmedBy: null,
                    aiOutputConfirmedAt: null,
                    stageChangedBy: null,
                    stageChangedAt: null,
                    completedAt: null,
                    createdBy: 'system',
                    createdAt: '2026-09-28T04:49:16.829Z',
                    updatedAt: '2026-09-28T04:49:16.829Z',
                  },
                },
              },
            },
          },

          '400': {
            $ref: '#/components/responses/validationError',
          },

          '401': {
            $ref: '#/components/responses/UnauthorizedError',
          },

          '403': {
            $ref: '#/components/responses/tokenRequired',
          },

          '404': {
            description: 'Deal not found',
          },
        },
      },
    },

    '/api/v1/deals/{dealId}/stage': {
      patch: {
        summary: 'Update deal stage',
        tags: ['DEALS'],
        parameters: [
          {
            name: 'dealId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 6,
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['stageId'],
                properties: {
                  stageId: {
                    type: 'integer',
                    example: 3,
                    description: 'ID of the new active deal stage',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Deal stage updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer', example: 6 },
                        dealName: {
                          type: 'string',
                          example: 'Apex Financial Services Expansion',
                        },
                        stageId: {
                          type: 'integer',
                          example: 3,
                        },
                        stageChangedBy: {
                          type: 'string',
                          nullable: true,
                          example: '36e79998-7456-44e4-aafd-b0faa9f8e7cd',
                        },
                        stageChangedAt: {
                          type: 'string',
                          format: 'date-time',
                          nullable: true,
                        },
                        updatedAt: {
                          type: 'string',
                          format: 'date-time',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/validationError',
          },
          401: {
            $ref: '#/components/responses/UnauthorizedError',
          },
          403: {
            $ref: '#/components/responses/tokenRequired',
          },
          404: {
            description: 'Deal or target stage not found',
          },
          412: {
            description: 'Stage update is not allowed',
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },

    '/api/v1/evaluation-framework/{frameworkId}': {
      get: {
        summary: 'Get evaluation framework by ID',
        tags: ['EVALUATION FRAMEWORK'],
        parameters: [
          {
            name: 'frameworkId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
        ],
        responses: {
          200: {
            description: 'Evaluation framework details',
          },
          400: {
            $ref: '#/components/responses/validationError',
          },
          401: {
            $ref: '#/components/responses/UnauthorizedError',
          },
          403: {
            $ref: '#/components/responses/tokenRequired',
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },

    '/api/v1/evaluation-framework/categories': {
      get: {
        summary: 'Get evaluation framework categories by taxonomy',
        tags: ['EVALUATION FRAMEWORK'],
        parameters: [
          {
            name: 'sectorId',
            in: 'query',
            required: true,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
          {
            name: 'dealTypeId',
            in: 'query',
            required: true,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
          {
            name: 'industryId',
            in: 'query',
            required: true,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
        ],
        responses: {
          200: {
            description: 'Evaluation framework categories',
          },
          400: {
            $ref: '#/components/responses/validationError',
          },
          401: {
            $ref: '#/components/responses/UnauthorizedError',
          },
          403: {
            $ref: '#/components/responses/tokenRequired',
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    '/api/v1/deals/{dealId}/required-parameters/{parameterId}/comments': {
      get: {
        summary: 'Get comments for a deal evaluation parameter',
        tags: ['DEALS'],
        parameters: [
          {
            name: 'dealId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
          {
            name: 'parameterId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
        ],
        responses: {
          200: {
            description: 'Evaluation comments retrieved successfully',
          },
          400: {
            $ref: '#/components/responses/validationError',
          },
          401: {
            $ref: '#/components/responses/UnauthorizedError',
          },
          403: {
            $ref: '#/components/responses/tokenRequired',
          },
        },
        security: [{ bearerAuth: [] }],
      },

      put: {
        summary: 'Create or update an evaluation comment',
        tags: ['DEALS'],
        parameters: [
          {
            name: 'dealId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
          {
            name: 'parameterId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'comment'],
                properties: {
                  commentId: {
                    type: 'integer',
                    nullable: true,
                    example: 1,
                  },
                  title: {
                    type: 'string',
                    example: 'Market concern',
                  },
                  comment: {
                    type: 'string',
                    example: 'Market growth needs further review.',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Evaluation comment updated successfully',
          },
          201: {
            description: 'Evaluation comment created successfully',
          },
          400: {
            $ref: '#/components/responses/validationError',
          },
          401: {
            $ref: '#/components/responses/UnauthorizedError',
          },
          403: {
            $ref: '#/components/responses/tokenRequired',
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },

    '/api/v1/deals/{dealId}/required-parameters/{parameterId}/comments/{commentId}': {
      delete: {
        summary: 'Delete an evaluation comment',
        tags: ['DEALS'],
        parameters: [
          {
            name: 'dealId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
          {
            name: 'parameterId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
          {
            name: 'commentId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
        ],
        responses: {
          200: {
            description: 'Evaluation comment deleted successfully',
          },
          400: {
            $ref: '#/components/responses/validationError',
          },
          401: {
            $ref: '#/components/responses/UnauthorizedError',
          },
          403: {
            $ref: '#/components/responses/tokenRequired',
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    '/api/v1/deals/{dealId}/required-parameters': {
      get: {
        tags: ['DEALS'],
        summary: 'Get required parameters for a deal',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'dealId',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Required parameters retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        dealId: {
                          type: 'integer',
                          example: 1,
                        },
                        dealName: {
                          type: 'string',
                          example: 'Sample Deal',
                        },
                        frameworkId: {
                          type: 'integer',
                          example: 1,
                        },
                        description: {
                          type: 'string',
                          nullable: true,
                          example: 'Evaluation framework description',
                        },
                        categories: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              categoryId: {
                                type: 'integer',
                                example: 1,
                              },
                              categoryName: {
                                type: 'string',
                                example: 'Financial',
                              },
                              displayOrder: {
                                type: 'integer',
                                example: 1,
                              },
                              weightage: {
                                type: 'number',
                                example: 50,
                              },
                              parameters: {
                                type: 'array',
                                items: {
                                  type: 'object',
                                  properties: {
                                    parameterId: {
                                      type: 'integer',
                                      example: 1,
                                    },
                                    parameterName: {
                                      type: 'string',
                                      example: 'Revenue',
                                    },
                                    description: {
                                      type: 'string',
                                      nullable: true,
                                      example: 'Annual revenue of the company',
                                    },
                                    displayOrder: {
                                      type: 'integer',
                                      example: 1,
                                    },
                                    weightage: {
                                      type: 'number',
                                      example: 50,
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
          },
          '403': {
            description: 'Forbidden',
          },
          '404': {
            description: 'Deal or evaluation framework not found',
          },
        },
      },
    },
    '/api/v1/deals/{dealId}/materials': {
      post: {
        tags: ['DEALS'],
        summary: 'Get materials for a deal',
        security: [{ bearerAuth: [] }],

        parameters: [
          {
            in: 'path',
            name: 'dealId',
            required: true,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
          {
            in: 'query',
            name: 'search',
            required: false,
            schema: {
              type: 'string',
              example: 'Financial',
            },
          },
          {
            in: 'query',
            name: 'classificationId',
            required: false,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
          {
            in: 'query',
            name: 'page',
            required: false,
            schema: {
              type: 'integer',
              default: 1,
              example: 1,
            },
          },
          {
            in: 'query',
            name: 'limit',
            required: false,
            schema: {
              type: 'integer',
              default: 10,
              example: 10,
            },
          },
          {
            in: 'query',
            name: 'sortBy',
            required: false,
            schema: {
              type: 'string',
              enum: [
                'dealFileId',
                'fileName',
                'fileType',
                'fileSize',
                'classificationName',
                'updatedAt',
              ],
              default: 'updatedAt',
              example: 'updatedAt',
            },
          },
          {
            in: 'query',
            name: 'sortOrder',
            required: false,
            schema: {
              type: 'string',
              enum: ['asc', 'desc'],
              default: 'desc',
              example: 'desc',
            },
          },
        ],

        requestBody: {
          required: false,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  fileTypes: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    example: ['pdf', 'pptx'],
                  },
                },
              },
            },
          },
        },

        responses: {
          '200': {
            description: 'Deal materials retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        filters: {
                          type: 'object',
                          properties: {
                            fileTypes: {
                              type: 'array',
                              items: {
                                type: 'string',
                              },
                              example: ['PDF', 'PPTX'],
                            },
                          },
                        },
                        lastUpdatedAt: {
                          type: 'string',
                          format: 'date-time',
                          nullable: true,
                          example: '2026-10-03T10:30:00.000Z',
                        },
                        items: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              dealFileId: {
                                type: 'integer',
                                example: 1,
                              },
                              sourceFileId: {
                                type: 'integer',
                                example: 1,
                              },
                              fileName: {
                                type: 'string',
                                nullable: true,
                                example: 'Financial_Report.pdf',
                              },
                              fileType: {
                                type: 'string',
                                nullable: true,
                                example: 'PDF',
                              },
                              fileSize: {
                                type: 'number',
                                nullable: true,
                                example: 250000,
                              },
                              sourcePath: {
                                type: 'string',
                                nullable: true,
                                example: '/source/Financial_Report.pdf',
                              },
                              storagePath: {
                                type: 'string',
                                nullable: true,
                                example: '/storage/Financial_Report.pdf',
                              },
                              sourceFileVersion: {
                                type: 'integer',
                                example: 1,
                              },
                              classificationId: {
                                type: 'integer',
                                nullable: true,
                                example: 1,
                              },
                              classificationName: {
                                type: 'string',
                                nullable: true,
                                example: 'Financial',
                              },
                              lastUpdatedAt: {
                                type: 'string',
                                format: 'date-time',
                                example: '2026-10-03T10:30:00.000Z',
                              },
                            },
                          },
                        },
                        pagination: {
                          type: 'object',
                          properties: {
                            page: {
                              type: 'integer',
                              example: 1,
                            },
                            limit: {
                              type: 'integer',
                              example: 10,
                            },
                            totalItems: {
                              type: 'integer',
                              example: 2,
                            },
                            totalPages: {
                              type: 'integer',
                              example: 1,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            $ref: '#/components/responses/validationError',
          },
          '401': {
            $ref: '#/components/responses/UnauthorizedError',
          },
          '403': {
            $ref: '#/components/responses/tokenRequired',
          },
          '404': {
            description: 'Deal not found',
          },
        },
      },
    },
    '/api/v1/deals/{dealId}/audit-logs': {
      post: {
        tags: ['DEALS'],
        summary: 'Get audit logs for a deal',
        security: [{ bearerAuth: [] }],

        parameters: [
          {
            in: 'path',
            name: 'dealId',
            required: true,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
          {
            in: 'query',
            name: 'page',
            required: false,
            schema: {
              type: 'integer',
              default: 1,
              example: 1,
            },
          },
          {
            in: 'query',
            name: 'limit',
            required: false,
            schema: {
              type: 'integer',
              default: 20,
              example: 20,
            },
          },
        ],

        requestBody: {
          required: false,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  performedByIds: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    example: ['user-1', 'user-2'],
                  },
                  actions: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    example: ['CREATED', 'UPDATED'],
                  },
                  startDate: {
                    type: 'string',
                    format: 'date',
                    example: '2026-10-01',
                  },
                  endDate: {
                    type: 'string',
                    format: 'date',
                    example: '2026-10-03',
                  },
                },
              },
            },
          },
        },

        responses: {
          '200': {
            description: 'Deal audit logs retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        filters: {
                          type: 'object',
                          properties: {
                            performedByIds: {
                              type: 'array',
                              items: {
                                type: 'string',
                              },
                              example: ['user-1', 'user-2'],
                            },
                            actions: {
                              type: 'array',
                              items: {
                                type: 'string',
                              },
                              example: ['CREATED', 'UPDATED'],
                            },
                          },
                        },
                        items: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              id: {
                                type: 'integer',
                                example: 1,
                              },
                              dealId: {
                                type: 'integer',
                                example: 1,
                              },
                              entityType: {
                                type: 'string',
                                example: 'DEAL',
                              },
                              entityId: {
                                type: 'integer',
                                nullable: true,
                                example: 1,
                              },
                              action: {
                                type: 'string',
                                example: 'UPDATED',
                              },
                              performedById: {
                                type: 'string',
                                example: 'user-1',
                              },
                              summary: {
                                type: 'string',
                                example: 'Deal updated successfully',
                              },
                              details: {
                                type: 'object',
                                nullable: true,
                                additionalProperties: true,
                              },
                              createdAt: {
                                type: 'string',
                                format: 'date-time',
                                example: '2026-10-03T10:30:00.000Z',
                              },
                            },
                          },
                        },
                        pagination: {
                          type: 'object',
                          properties: {
                            page: {
                              type: 'integer',
                              example: 1,
                            },
                            limit: {
                              type: 'integer',
                              example: 20,
                            },
                            totalItems: {
                              type: 'integer',
                              example: 3,
                            },
                            totalPages: {
                              type: 'integer',
                              example: 1,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            $ref: '#/components/responses/validationError',
          },
          '401': {
            $ref: '#/components/responses/UnauthorizedError',
          },
          '403': {
            $ref: '#/components/responses/tokenRequired',
          },
          '404': {
            description: 'Deal not found',
          },
        },
      },
    },
    '/api/v1/deals/{dealId}/ai-jobs/retry': {
      post: {
        tags: ['DEALS'],
        summary: 'Retry a failed AI job',
        security: [{ bearerAuth: [] }],

        parameters: [
          {
            in: 'path',
            name: 'dealId',
            required: true,
            schema: {
              type: 'integer',
              example: 1,
            },
          },
        ],

        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['jobType'],
                properties: {
                  jobType: {
                    type: 'string',
                    enum: ['PARAMETER_EVALUATION'],
                    example: 'PARAMETER_EVALUATION',
                  },
                  versionId: {
                    type: 'integer',
                    example: 1,
                    description:
                      'Do not provide versionId for PARAMETER_EVALUATION.',
                  },
                },
              },
              example: {
                jobType: 'PARAMETER_EVALUATION',
              },
            },
          },
        },

        responses: {
          '200': {
            description: 'AI job retry requested successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        dealId: {
                          type: 'integer',
                          example: 1,
                        },
                        aiJobId: {
                          type: 'integer',
                          example: 2,
                        },
                        retryOfJobId: {
                          type: 'integer',
                          example: 1,
                        },
                        jobStatus: {
                          type: 'string',
                          example: 'Pending',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description:
              'Retry is not allowed, versionId was provided, or an active AI job already exists',
          },
          '401': {
            $ref: '#/components/responses/UnauthorizedError',
          },
          '403': {
            $ref: '#/components/responses/tokenRequired',
          },
          '404': {
            description: 'Deal not found',
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    responses: {
      tokenRequired: {
        description: 'Access token required',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: { type: 'string', example: 'access token is required!' },
                statusCode: { type: 'number', example: 403 },
                type: { type: 'string', example: 'forbidden' },
              },
            },
          },
        },
      },
      UnauthorizedError: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: { type: 'string' },
                statusCode: { type: 'number', example: 401 },
                type: { type: 'string', example: 'unauthorized' },
              },
            },
          },
        },
      },
      validationError: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: { type: 'string', example: 'invalid_request' },
                statusCode: { type: 'number', example: 400 },
                validations: { type: 'array', items: { type: 'object' } },
              },
            },
          },
        },
      },
    },
  },
});
