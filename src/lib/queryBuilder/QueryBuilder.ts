import { TABLES } from "@/definitions/enums";
import {
    QueryFromOptions,
    QueryJoinOptions,
    QueryOrderOptions,
    QueryLimitOptions,
    QueryOffsetOptions,
    QuerySelectOptions,
    QueryWhereOptions,
    QueryInsertOptions,
    QueryUpdateOptions,
} from "@/definitions/queryBuilder";

interface Builder<T> {
  fromQuery: (option: QueryFromOptions) => this;
  selectQuery: (options?: QuerySelectOptions<T>) => this;
  whereQuery: (options: QueryWhereOptions<T>) => this;
  joinQuery: (options: QueryJoinOptions<T>) => this;
  orderQuey: (option: QueryOrderOptions) => this;
  limitQuery: (option: QueryLimitOptions) => this;
  offsetQuery: (option: QueryOffsetOptions) => this;
  countQuery: () => this;
  insertQuery: (options: QueryInsertOptions<T>, id: string) => this;
  deleteQuery: (option: string) => this;
  updateQuery: (options: QueryUpdateOptions<T>, id: string) => this;
  build: () => string;
}

export class QueryBuilder<T> implements Builder<T> {
    private table: string;

    private queryParts: {
    from?: string;
    select?: string;
    where?: string;
    join?: string;
    order?: string;
    limit?: string;
    offset?: string;
    count?: string;
    insert?: string;
    remove?: string;
    update?: string;
  } = {};

    constructor(from: TABLES) {
        this.table = from;
    }

    fromQuery(option: QueryFromOptions) {
        this.queryParts.from = `FROM ${String(option)}`;
        return this;
    }

    selectQuery(options?: QuerySelectOptions<T>) {
        if (options) {
            this.queryParts.select = `SELECT ${options.join(", ")}`;
        } else {
            this.queryParts.select = "SELECT *";
        }
        return this;
    }

    whereQuery(options: QueryWhereOptions<T>) {
        const conditions: string[] = [];

        for (const option of options) {
            const col = String(option.column);
            const operator = option.operator;

            if (operator === "like") {
                conditions.push(`${col} LIKE '%' || ${option.value} || '%' `);
            } else if (operator === "=") {
                conditions.push(`${col} = COALESCE(${option.value}, ${col}) `);
            } else {
                conditions.push(
                    `(${col} ${operator} ${option.value} OR ${option.value} IS NULL) `,
                );
            }
        }

        if (conditions.length > 0) {
            this.queryParts.where = `WHERE ${conditions.join(" AND ")}`;
        }

        return this;
    }

    joinQuery(options: QueryJoinOptions<T>) {
        for (const option of options) {
            this.queryParts.join += `JOIN ${String(option.table)} ON ${this.queryParts.from}.${String(option.fk)} = ${String(option.table)}.id`;
        }

        return this;
    }

    orderQuey(option: QueryOrderOptions) {
        this.queryParts.order = `ORDER BY id ${option}`;
        return this;
    }

    limitQuery(option: QueryLimitOptions) {
        this.queryParts.limit = `LIMIT ${option}`;
        return this;
    }

    offsetQuery(option: QueryOffsetOptions) {
        this.queryParts.offset = `OFFSET ${option}`;
        return this;
    }

    countQuery() {
        this.queryParts.count = "SELECT COUNT(*) AS total";
        return this;
    }

    insertQuery(options: QueryInsertOptions<T>) {
        const cols = Object.keys(options);
        const values = Object.values(options);

        this.queryParts.insert = `INSERT INTO ${this.table} (${cols.join(",")}) VALUES (${values})`;

        return this;
    }

    deleteQuery(option: string) {
        this.queryParts.remove = `DELETE FROM ${this.table} WHERE id = ${option}`;
        return this;
    }

    updateQuery(options: QueryUpdateOptions<T>, id: string) {
        const setAssignments = Object.keys(options).map((col) => {
            return `${col} = ${options[col as keyof T]}`;
        });
        const setClause = setAssignments.join(", ");
        this.queryParts.update = `UPDATE ${this.table} SET ${setClause} WHERE id = ${id}`;
        return this;
    }

    build() {
        const {
            from,
            select,
            join,
            limit,
            offset,
            order,
            where,
            count,
            insert,
            remove,
            update,
        } = this.queryParts;

        let query = "";

        if (select) query += ` ${select}`;
        if (count) query += ` ${count}`;
        if (from) query += ` ${from}`;
        if (join) query += ` ${join}`;
        if (where) query += ` ${where}`;
        if (order) query += ` ${order}`;
        if (limit) query += ` ${limit}`;
        if (offset) query += ` ${offset}`;
        if (insert) query += ` ${insert}`;
        if (remove) query += ` ${remove}`;
        if (update) query += ` ${update}`;

        return query.trim().concat(";");
    }
}
