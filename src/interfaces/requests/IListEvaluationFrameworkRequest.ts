export interface GetEvaluationFrameworkParams {
  frameworkId: number;
}

export interface GetCategoriesByTaxonomyQuery {
  dealTypeId: number;
  industryId: number;
  sectorId: number;
}


// export interface RequiredParameter {
//   id: number;
//   parameterName: string;
//   description: string | null;
//   displayOrder: number;
//   weightage: number;
// }

// export interface RequiredParameterCategory {
//   id: number;
//   categoryName: string;
//   displayOrder: number;
//   weightage: number;
//   parameters: RequiredParameter[];
// }

export interface RequiredParametersFramework {
  id: number;
  frameworkName: string;
  description: string | null;
  categories: {
    id: number;
    categoryName: string;
    displayOrder: number;
    weightage: number;
    parameters: {
      id: number;
      parameterName: string;
      description: string | null;
      displayOrder: number;
      weightage: number;
    }[];
  }[];
}

export interface RequiredParametersResponse {
  success: true;
  data: {
    dealId: number;
    dealName: string;
    frameworkId: number;
    frameworkName: string;
    description: string | null;
    categories: {
      categoryId: number;
      categoryName: string;
      displayOrder: number;
      weightage: number;
      parameters: {
        parameterId: number;
        parameterName: string;
        description: string | null;
        displayOrder: number;
        weightage: number;
      }[];
    }[];
  };
}