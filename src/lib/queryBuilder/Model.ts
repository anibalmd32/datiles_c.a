import Database from "@tauri-apps/plugin-sql";
import { TABLES } from "@/definitions/enums";
import {
    QueryJoinOptions,
    QueryLimitOptions,
    QueryOffsetOptions,
    QueryOrderOptions,
    QuerySelectOptions,
    QueryWhereOptions,
    QueryInsertOptions,
    QueryUpdateOptions,
} from "@/definitions/queryBuilder";
import { QueryBuilder } from "./QueryBuilder";

type ModelSelectOptions<T> = {
    select?: QuerySelectOptions<T>;
    withRelation?: QueryJoinOptions<T>;
    filters?: QueryWhereOptions<T>;
    pagination?: {
        size: QueryLimitOptions;
        skip: QueryOffsetOptions;
    };
    order?: QueryOrderOptions;
};

type ModelCountOptions<T> = {
    where?: QueryWhereOptions<T>;
};

type ModelUpdateOptions<T> = {
    id: string;
    data: QueryUpdateOptions<T>;
};

interface IModel<T> {
    select: (
        options: ModelSelectOptions<T>,
        params: Array<unknown>,
    ) => Promise<T[]>;
    count: (
        options: ModelCountOptions<T>,
        params: Array<unknown>,
    ) => Promise<number>;
    create: (
        options: QueryInsertOptions<T>,
        params: Array<unknown>,
    ) => Promise<void>;
    delete: ({ id }: { id: number }) => Promise<void>;
    update: (
        options: ModelUpdateOptions<T>,
        params: Array<unknown>,
    ) => Promise<void>;
}

export class Model<T> implements IModel<T> {
    constructor(private readonly table: TABLES) {}

    async select(options: ModelSelectOptions<T>, params: Array<unknown>) {
        const db = await Database.load("sqlite:datiles.db");
        const { filters, order, pagination, select, withRelation } = options;

        const query = new QueryBuilder<T>(this.table)
            .fromQuery(this.table)
            .selectQuery(select);

        if (filters) query.whereQuery(filters);
        if (order) query.orderQuey(order);
        if (pagination)
            query.limitQuery(pagination.size).offsetQuery(pagination.skip);
        if (withRelation) query.joinQuery(withRelation);

        const result = await db.select<Array<T>>(query.build(), params);

        return result;
    }

    async count(options: ModelCountOptions<T>, params: Array<unknown>) {
        const db = await Database.load("sqlite:datiles.db");
        const { where } = options;

        const query = new QueryBuilder<T>(this.table)
            .fromQuery(this.table)
            .countQuery();

        if (where) query.whereQuery(where);

        const result = await db.select<Array<{ total: number }>>(
            query.build(),
            params,
        );

        return result[0].total;
    }

    async create(options: QueryInsertOptions<T>, params: Array<unknown>) {
        const db = await Database.load("sqlite:datiles.db");
        const query = new QueryBuilder<T>(this.table).insertQuery(options);

        await db.execute(query.build(), params);
    }

    async delete({ id }: { id: number }): Promise<void> {
        const db = await Database.load("sqlite:datiles.db");
        const query = new QueryBuilder<T>(this.table).deleteQuery("?");

        await db.execute(query.build(), [id]);
    }

    async update(options: ModelUpdateOptions<T>, params: Array<unknown>) {
        const db = await Database.load("sqlite:datiles.db");
        const query = new QueryBuilder<T>(this.table).updateQuery(
            options.data,
            options.id,
        );

        await db.execute(query.build(), params);
    }
}
