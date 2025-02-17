import { TABLES } from "./enums";

export type QuerySelectOptions<T> = Array<keyof T>;

export type QueryFromOptions = TABLES;

export type QueryOrderOptions = "ASC" | "DESC";

export type QueryWhereOptions<T> = Array<{
    column: keyof T;
    value: string;
    operator: "=" | "<=" | ">=" | ">" | "<" | "like";
}>;

export type QueryJoinOptions = Array<{
    table: TABLES;
    fk: string;
    type?: "INNER" | "LEFT" | "RIGHT" | "FULL"; // Tipo de JOIN opcional
}>;

export type QueryOffsetOptions = string;

export type QueryLimitOptions = string;

export type QueryInsertOptions<T> = { [K in keyof T]: string };

export type QueryUpdateOptions<T> = { [K in keyof Partial<T>]: string };
