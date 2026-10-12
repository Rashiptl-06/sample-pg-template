interface IJoin {
  table: string;
  condition: string;
}

interface ICte {
  table: string;
  query: string;
}

export class QueryBuilder {
  private query = '';
  private cte: ICte[] = [];

  select(args: string[]) {
    this.query = `SELECT ${args.join(', ')}`;
    return this;
  }

  fromTable(tableName: string, subQuery?: string) {
    this.query += subQuery ? ` FROM (${subQuery}) AS ${tableName}` : ` FROM ${tableName}`;
    return this;
  }

  where(conditions: string[]) {
    if (conditions.length > 0) {
      this.query += ` WHERE ${conditions.join(' AND ')}`;
    }
    return this;
  }

  limit(limit?: number) {
    if (limit !== undefined) {
      this.query += ` LIMIT ${limit}`;
    }
    return this;
  }

  offset(offset?: number) {
    if (offset !== undefined) {
      this.query += ` OFFSET ${offset}`;
    }
    return this;
  }

  orderBy(sortOrder: Array<[column: string, order: 'ASC' | 'DESC']>) {
    if (sortOrder.length > 0) {
      this.query += ` ORDER BY ${sortOrder.map(([col, ord]) => `${col} ${ord}`).join(', ')}`;
    }
    return this;
  }

  leftJoin(joins: IJoin[]) {
    joins.forEach(({ table, condition }) => {
      this.query += ` LEFT JOIN ${table} ON ${condition}`;
    });
    return this;
  }

  rightJoin(joins: IJoin[]) {
    joins.forEach(({ table, condition }) => {
      this.query += ` RIGHT JOIN ${table} ON ${condition}`;
    });
    return this;
  }

  innerJoin(joins: IJoin[]) {
    joins.forEach(({ table, condition }) => {
      this.query += ` INNER JOIN ${table} ON ${condition}`;
    });
    return this;
  }

  groupBy(columns: string[]) {
    if (columns.length > 0) {
      this.query += ` GROUP BY ${columns.join(', ')}`;
    }
    return this;
  }

  addCte(table: string, query: string) {
    this.cte.push({ table, query });
    return this;
  }

  build(): string {
    return this.cte.length
      ? `WITH ${this.cte.map(({ table, query }) => `${table} AS (${query})`).join(', ')} ${this.query}`
      : this.query;
  }
}
