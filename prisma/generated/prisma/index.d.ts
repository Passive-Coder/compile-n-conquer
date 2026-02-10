
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model QueueEntry
 * 
 */
export type QueueEntry = $Result.DefaultSelection<Prisma.$QueueEntryPayload>
/**
 * Model Match
 * 
 */
export type Match = $Result.DefaultSelection<Prisma.$MatchPayload>
/**
 * Model MatchPlayer
 * 
 */
export type MatchPlayer = $Result.DefaultSelection<Prisma.$MatchPlayerPayload>
/**
 * Model Question
 * 
 */
export type Question = $Result.DefaultSelection<Prisma.$QuestionPayload>
/**
 * Model MatchQuestion
 * 
 */
export type MatchQuestion = $Result.DefaultSelection<Prisma.$MatchQuestionPayload>
/**
 * Model Submission
 * 
 */
export type Submission = $Result.DefaultSelection<Prisma.$SubmissionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const SkillTier: {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  PRO: 'PRO'
};

export type SkillTier = (typeof SkillTier)[keyof typeof SkillTier]


export const MatchStatus: {
  WAITING: 'WAITING',
  IN_PROGRESS: 'IN_PROGRESS',
  EVALUATING: 'EVALUATING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type MatchStatus = (typeof MatchStatus)[keyof typeof MatchStatus]


export const GameMode: {
  FASTEST: 'FASTEST',
  SHORTEST: 'SHORTEST',
  REVERSE: 'REVERSE',
  DEBUGGING: 'DEBUGGING'
};

export type GameMode = (typeof GameMode)[keyof typeof GameMode]


export const MatchOutcome: {
  WIN: 'WIN',
  LOSS: 'LOSS',
  DRAW: 'DRAW'
};

export type MatchOutcome = (typeof MatchOutcome)[keyof typeof MatchOutcome]


export const Difficulty: {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD'
};

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty]

}

export type SkillTier = $Enums.SkillTier

export const SkillTier: typeof $Enums.SkillTier

export type MatchStatus = $Enums.MatchStatus

export const MatchStatus: typeof $Enums.MatchStatus

export type GameMode = $Enums.GameMode

export const GameMode: typeof $Enums.GameMode

export type MatchOutcome = $Enums.MatchOutcome

export const MatchOutcome: typeof $Enums.MatchOutcome

export type Difficulty = $Enums.Difficulty

export const Difficulty: typeof $Enums.Difficulty

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.queueEntry`: Exposes CRUD operations for the **QueueEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QueueEntries
    * const queueEntries = await prisma.queueEntry.findMany()
    * ```
    */
  get queueEntry(): Prisma.QueueEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.match`: Exposes CRUD operations for the **Match** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Matches
    * const matches = await prisma.match.findMany()
    * ```
    */
  get match(): Prisma.MatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matchPlayer`: Exposes CRUD operations for the **MatchPlayer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MatchPlayers
    * const matchPlayers = await prisma.matchPlayer.findMany()
    * ```
    */
  get matchPlayer(): Prisma.MatchPlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.question`: Exposes CRUD operations for the **Question** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Questions
    * const questions = await prisma.question.findMany()
    * ```
    */
  get question(): Prisma.QuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matchQuestion`: Exposes CRUD operations for the **MatchQuestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MatchQuestions
    * const matchQuestions = await prisma.matchQuestion.findMany()
    * ```
    */
  get matchQuestion(): Prisma.MatchQuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.submission`: Exposes CRUD operations for the **Submission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Submissions
    * const submissions = await prisma.submission.findMany()
    * ```
    */
  get submission(): Prisma.SubmissionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    QueueEntry: 'QueueEntry',
    Match: 'Match',
    MatchPlayer: 'MatchPlayer',
    Question: 'Question',
    MatchQuestion: 'MatchQuestion',
    Submission: 'Submission'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "queueEntry" | "match" | "matchPlayer" | "question" | "matchQuestion" | "submission"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      QueueEntry: {
        payload: Prisma.$QueueEntryPayload<ExtArgs>
        fields: Prisma.QueueEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QueueEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QueueEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>
          }
          findFirst: {
            args: Prisma.QueueEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QueueEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>
          }
          findMany: {
            args: Prisma.QueueEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>[]
          }
          create: {
            args: Prisma.QueueEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>
          }
          createMany: {
            args: Prisma.QueueEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QueueEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>[]
          }
          delete: {
            args: Prisma.QueueEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>
          }
          update: {
            args: Prisma.QueueEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>
          }
          deleteMany: {
            args: Prisma.QueueEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QueueEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QueueEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>[]
          }
          upsert: {
            args: Prisma.QueueEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueEntryPayload>
          }
          aggregate: {
            args: Prisma.QueueEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQueueEntry>
          }
          groupBy: {
            args: Prisma.QueueEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<QueueEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.QueueEntryCountArgs<ExtArgs>
            result: $Utils.Optional<QueueEntryCountAggregateOutputType> | number
          }
        }
      }
      Match: {
        payload: Prisma.$MatchPayload<ExtArgs>
        fields: Prisma.MatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findFirst: {
            args: Prisma.MatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findMany: {
            args: Prisma.MatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          create: {
            args: Prisma.MatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          createMany: {
            args: Prisma.MatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          delete: {
            args: Prisma.MatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          update: {
            args: Prisma.MatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          deleteMany: {
            args: Prisma.MatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          upsert: {
            args: Prisma.MatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          aggregate: {
            args: Prisma.MatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatch>
          }
          groupBy: {
            args: Prisma.MatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchCountArgs<ExtArgs>
            result: $Utils.Optional<MatchCountAggregateOutputType> | number
          }
        }
      }
      MatchPlayer: {
        payload: Prisma.$MatchPlayerPayload<ExtArgs>
        fields: Prisma.MatchPlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchPlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchPlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>
          }
          findFirst: {
            args: Prisma.MatchPlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchPlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>
          }
          findMany: {
            args: Prisma.MatchPlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>[]
          }
          create: {
            args: Prisma.MatchPlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>
          }
          createMany: {
            args: Prisma.MatchPlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchPlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>[]
          }
          delete: {
            args: Prisma.MatchPlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>
          }
          update: {
            args: Prisma.MatchPlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>
          }
          deleteMany: {
            args: Prisma.MatchPlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchPlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchPlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>[]
          }
          upsert: {
            args: Prisma.MatchPlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPlayerPayload>
          }
          aggregate: {
            args: Prisma.MatchPlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatchPlayer>
          }
          groupBy: {
            args: Prisma.MatchPlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchPlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchPlayerCountArgs<ExtArgs>
            result: $Utils.Optional<MatchPlayerCountAggregateOutputType> | number
          }
        }
      }
      Question: {
        payload: Prisma.$QuestionPayload<ExtArgs>
        fields: Prisma.QuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findFirst: {
            args: Prisma.QuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findMany: {
            args: Prisma.QuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          create: {
            args: Prisma.QuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          createMany: {
            args: Prisma.QuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          delete: {
            args: Prisma.QuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          update: {
            args: Prisma.QuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          upsert: {
            args: Prisma.QuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          aggregate: {
            args: Prisma.QuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion>
          }
          groupBy: {
            args: Prisma.QuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionCountAggregateOutputType> | number
          }
        }
      }
      MatchQuestion: {
        payload: Prisma.$MatchQuestionPayload<ExtArgs>
        fields: Prisma.MatchQuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchQuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchQuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchQuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchQuestionPayload>
          }
          findFirst: {
            args: Prisma.MatchQuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchQuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchQuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchQuestionPayload>
          }
          findMany: {
            args: Prisma.MatchQuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchQuestionPayload>[]
          }
          create: {
            args: Prisma.MatchQuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchQuestionPayload>
          }
          createMany: {
            args: Prisma.MatchQuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchQuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchQuestionPayload>[]
          }
          delete: {
            args: Prisma.MatchQuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchQuestionPayload>
          }
          update: {
            args: Prisma.MatchQuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchQuestionPayload>
          }
          deleteMany: {
            args: Prisma.MatchQuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchQuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchQuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchQuestionPayload>[]
          }
          upsert: {
            args: Prisma.MatchQuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchQuestionPayload>
          }
          aggregate: {
            args: Prisma.MatchQuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatchQuestion>
          }
          groupBy: {
            args: Prisma.MatchQuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchQuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchQuestionCountArgs<ExtArgs>
            result: $Utils.Optional<MatchQuestionCountAggregateOutputType> | number
          }
        }
      }
      Submission: {
        payload: Prisma.$SubmissionPayload<ExtArgs>
        fields: Prisma.SubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findFirst: {
            args: Prisma.SubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findMany: {
            args: Prisma.SubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          create: {
            args: Prisma.SubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          createMany: {
            args: Prisma.SubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          delete: {
            args: Prisma.SubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          update: {
            args: Prisma.SubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          deleteMany: {
            args: Prisma.SubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          upsert: {
            args: Prisma.SubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          aggregate: {
            args: Prisma.SubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubmission>
          }
          groupBy: {
            args: Prisma.SubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<SubmissionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    queueEntry?: QueueEntryOmit
    match?: MatchOmit
    matchPlayer?: MatchPlayerOmit
    question?: QuestionOmit
    matchQuestion?: MatchQuestionOmit
    submission?: SubmissionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    matchPlayers: number
    queueEntries: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    matchPlayers?: boolean | UserCountOutputTypeCountMatchPlayersArgs
    queueEntries?: boolean | UserCountOutputTypeCountQueueEntriesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMatchPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchPlayerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQueueEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueueEntryWhereInput
  }


  /**
   * Count Type MatchCountOutputType
   */

  export type MatchCountOutputType = {
    players: number
    questions: number
    submissions: number
  }

  export type MatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | MatchCountOutputTypeCountPlayersArgs
    questions?: boolean | MatchCountOutputTypeCountQuestionsArgs
    submissions?: boolean | MatchCountOutputTypeCountSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchCountOutputType
     */
    select?: MatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchPlayerWhereInput
  }

  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchQuestionWhereInput
  }

  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }


  /**
   * Count Type QuestionCountOutputType
   */

  export type QuestionCountOutputType = {
    matchQuestions: number
  }

  export type QuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    matchQuestions?: boolean | QuestionCountOutputTypeCountMatchQuestionsArgs
  }

  // Custom InputTypes
  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionCountOutputType
     */
    select?: QuestionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountMatchQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchQuestionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    elo: number | null
    totalWins: number | null
    totalMatches: number | null
    totalXP: number | null
    streak: number | null
  }

  export type UserSumAggregateOutputType = {
    elo: number | null
    totalWins: number | null
    totalMatches: number | null
    totalXP: number | null
    streak: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    displayName: string | null
    avatarUrl: string | null
    title: string | null
    skillTier: $Enums.SkillTier | null
    elo: number | null
    totalWins: number | null
    totalMatches: number | null
    totalXP: number | null
    streak: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    displayName: string | null
    avatarUrl: string | null
    title: string | null
    skillTier: $Enums.SkillTier | null
    elo: number | null
    totalWins: number | null
    totalMatches: number | null
    totalXP: number | null
    streak: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    passwordHash: number
    displayName: number
    avatarUrl: number
    title: number
    skillTier: number
    elo: number
    totalWins: number
    totalMatches: number
    totalXP: number
    streak: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    elo?: true
    totalWins?: true
    totalMatches?: true
    totalXP?: true
    streak?: true
  }

  export type UserSumAggregateInputType = {
    elo?: true
    totalWins?: true
    totalMatches?: true
    totalXP?: true
    streak?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    displayName?: true
    avatarUrl?: true
    title?: true
    skillTier?: true
    elo?: true
    totalWins?: true
    totalMatches?: true
    totalXP?: true
    streak?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    displayName?: true
    avatarUrl?: true
    title?: true
    skillTier?: true
    elo?: true
    totalWins?: true
    totalMatches?: true
    totalXP?: true
    streak?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    displayName?: true
    avatarUrl?: true
    title?: true
    skillTier?: true
    elo?: true
    totalWins?: true
    totalMatches?: true
    totalXP?: true
    streak?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    passwordHash: string
    displayName: string | null
    avatarUrl: string | null
    title: string
    skillTier: $Enums.SkillTier
    elo: number
    totalWins: number
    totalMatches: number
    totalXP: number
    streak: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    title?: boolean
    skillTier?: boolean
    elo?: boolean
    totalWins?: boolean
    totalMatches?: boolean
    totalXP?: boolean
    streak?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    matchPlayers?: boolean | User$matchPlayersArgs<ExtArgs>
    queueEntries?: boolean | User$queueEntriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    title?: boolean
    skillTier?: boolean
    elo?: boolean
    totalWins?: boolean
    totalMatches?: boolean
    totalXP?: boolean
    streak?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    title?: boolean
    skillTier?: boolean
    elo?: boolean
    totalWins?: boolean
    totalMatches?: boolean
    totalXP?: boolean
    streak?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    title?: boolean
    skillTier?: boolean
    elo?: boolean
    totalWins?: boolean
    totalMatches?: boolean
    totalXP?: boolean
    streak?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "passwordHash" | "displayName" | "avatarUrl" | "title" | "skillTier" | "elo" | "totalWins" | "totalMatches" | "totalXP" | "streak" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    matchPlayers?: boolean | User$matchPlayersArgs<ExtArgs>
    queueEntries?: boolean | User$queueEntriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      matchPlayers: Prisma.$MatchPlayerPayload<ExtArgs>[]
      queueEntries: Prisma.$QueueEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      passwordHash: string
      displayName: string | null
      avatarUrl: string | null
      title: string
      skillTier: $Enums.SkillTier
      elo: number
      totalWins: number
      totalMatches: number
      totalXP: number
      streak: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    matchPlayers<T extends User$matchPlayersArgs<ExtArgs> = {}>(args?: Subset<T, User$matchPlayersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    queueEntries<T extends User$queueEntriesArgs<ExtArgs> = {}>(args?: Subset<T, User$queueEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly displayName: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly title: FieldRef<"User", 'String'>
    readonly skillTier: FieldRef<"User", 'SkillTier'>
    readonly elo: FieldRef<"User", 'Int'>
    readonly totalWins: FieldRef<"User", 'Int'>
    readonly totalMatches: FieldRef<"User", 'Int'>
    readonly totalXP: FieldRef<"User", 'Int'>
    readonly streak: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.matchPlayers
   */
  export type User$matchPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null
    where?: MatchPlayerWhereInput
    orderBy?: MatchPlayerOrderByWithRelationInput | MatchPlayerOrderByWithRelationInput[]
    cursor?: MatchPlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchPlayerScalarFieldEnum | MatchPlayerScalarFieldEnum[]
  }

  /**
   * User.queueEntries
   */
  export type User$queueEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    where?: QueueEntryWhereInput
    orderBy?: QueueEntryOrderByWithRelationInput | QueueEntryOrderByWithRelationInput[]
    cursor?: QueueEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QueueEntryScalarFieldEnum | QueueEntryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model QueueEntry
   */

  export type AggregateQueueEntry = {
    _count: QueueEntryCountAggregateOutputType | null
    _min: QueueEntryMinAggregateOutputType | null
    _max: QueueEntryMaxAggregateOutputType | null
  }

  export type QueueEntryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    joinedAt: Date | null
    active: boolean | null
  }

  export type QueueEntryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    joinedAt: Date | null
    active: boolean | null
  }

  export type QueueEntryCountAggregateOutputType = {
    id: number
    userId: number
    joinedAt: number
    active: number
    _all: number
  }


  export type QueueEntryMinAggregateInputType = {
    id?: true
    userId?: true
    joinedAt?: true
    active?: true
  }

  export type QueueEntryMaxAggregateInputType = {
    id?: true
    userId?: true
    joinedAt?: true
    active?: true
  }

  export type QueueEntryCountAggregateInputType = {
    id?: true
    userId?: true
    joinedAt?: true
    active?: true
    _all?: true
  }

  export type QueueEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueueEntry to aggregate.
     */
    where?: QueueEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueEntries to fetch.
     */
    orderBy?: QueueEntryOrderByWithRelationInput | QueueEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QueueEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QueueEntries
    **/
    _count?: true | QueueEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QueueEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QueueEntryMaxAggregateInputType
  }

  export type GetQueueEntryAggregateType<T extends QueueEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateQueueEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQueueEntry[P]>
      : GetScalarType<T[P], AggregateQueueEntry[P]>
  }




  export type QueueEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueueEntryWhereInput
    orderBy?: QueueEntryOrderByWithAggregationInput | QueueEntryOrderByWithAggregationInput[]
    by: QueueEntryScalarFieldEnum[] | QueueEntryScalarFieldEnum
    having?: QueueEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QueueEntryCountAggregateInputType | true
    _min?: QueueEntryMinAggregateInputType
    _max?: QueueEntryMaxAggregateInputType
  }

  export type QueueEntryGroupByOutputType = {
    id: string
    userId: string
    joinedAt: Date
    active: boolean
    _count: QueueEntryCountAggregateOutputType | null
    _min: QueueEntryMinAggregateOutputType | null
    _max: QueueEntryMaxAggregateOutputType | null
  }

  type GetQueueEntryGroupByPayload<T extends QueueEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QueueEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QueueEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QueueEntryGroupByOutputType[P]>
            : GetScalarType<T[P], QueueEntryGroupByOutputType[P]>
        }
      >
    >


  export type QueueEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    joinedAt?: boolean
    active?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queueEntry"]>

  export type QueueEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    joinedAt?: boolean
    active?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queueEntry"]>

  export type QueueEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    joinedAt?: boolean
    active?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queueEntry"]>

  export type QueueEntrySelectScalar = {
    id?: boolean
    userId?: boolean
    joinedAt?: boolean
    active?: boolean
  }

  export type QueueEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "joinedAt" | "active", ExtArgs["result"]["queueEntry"]>
  export type QueueEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type QueueEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type QueueEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $QueueEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QueueEntry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      joinedAt: Date
      active: boolean
    }, ExtArgs["result"]["queueEntry"]>
    composites: {}
  }

  type QueueEntryGetPayload<S extends boolean | null | undefined | QueueEntryDefaultArgs> = $Result.GetResult<Prisma.$QueueEntryPayload, S>

  type QueueEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QueueEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QueueEntryCountAggregateInputType | true
    }

  export interface QueueEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QueueEntry'], meta: { name: 'QueueEntry' } }
    /**
     * Find zero or one QueueEntry that matches the filter.
     * @param {QueueEntryFindUniqueArgs} args - Arguments to find a QueueEntry
     * @example
     * // Get one QueueEntry
     * const queueEntry = await prisma.queueEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QueueEntryFindUniqueArgs>(args: SelectSubset<T, QueueEntryFindUniqueArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QueueEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QueueEntryFindUniqueOrThrowArgs} args - Arguments to find a QueueEntry
     * @example
     * // Get one QueueEntry
     * const queueEntry = await prisma.queueEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QueueEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, QueueEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QueueEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueEntryFindFirstArgs} args - Arguments to find a QueueEntry
     * @example
     * // Get one QueueEntry
     * const queueEntry = await prisma.queueEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QueueEntryFindFirstArgs>(args?: SelectSubset<T, QueueEntryFindFirstArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QueueEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueEntryFindFirstOrThrowArgs} args - Arguments to find a QueueEntry
     * @example
     * // Get one QueueEntry
     * const queueEntry = await prisma.queueEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QueueEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, QueueEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QueueEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QueueEntries
     * const queueEntries = await prisma.queueEntry.findMany()
     * 
     * // Get first 10 QueueEntries
     * const queueEntries = await prisma.queueEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const queueEntryWithIdOnly = await prisma.queueEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QueueEntryFindManyArgs>(args?: SelectSubset<T, QueueEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QueueEntry.
     * @param {QueueEntryCreateArgs} args - Arguments to create a QueueEntry.
     * @example
     * // Create one QueueEntry
     * const QueueEntry = await prisma.queueEntry.create({
     *   data: {
     *     // ... data to create a QueueEntry
     *   }
     * })
     * 
     */
    create<T extends QueueEntryCreateArgs>(args: SelectSubset<T, QueueEntryCreateArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QueueEntries.
     * @param {QueueEntryCreateManyArgs} args - Arguments to create many QueueEntries.
     * @example
     * // Create many QueueEntries
     * const queueEntry = await prisma.queueEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QueueEntryCreateManyArgs>(args?: SelectSubset<T, QueueEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QueueEntries and returns the data saved in the database.
     * @param {QueueEntryCreateManyAndReturnArgs} args - Arguments to create many QueueEntries.
     * @example
     * // Create many QueueEntries
     * const queueEntry = await prisma.queueEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QueueEntries and only return the `id`
     * const queueEntryWithIdOnly = await prisma.queueEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QueueEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, QueueEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QueueEntry.
     * @param {QueueEntryDeleteArgs} args - Arguments to delete one QueueEntry.
     * @example
     * // Delete one QueueEntry
     * const QueueEntry = await prisma.queueEntry.delete({
     *   where: {
     *     // ... filter to delete one QueueEntry
     *   }
     * })
     * 
     */
    delete<T extends QueueEntryDeleteArgs>(args: SelectSubset<T, QueueEntryDeleteArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QueueEntry.
     * @param {QueueEntryUpdateArgs} args - Arguments to update one QueueEntry.
     * @example
     * // Update one QueueEntry
     * const queueEntry = await prisma.queueEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QueueEntryUpdateArgs>(args: SelectSubset<T, QueueEntryUpdateArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QueueEntries.
     * @param {QueueEntryDeleteManyArgs} args - Arguments to filter QueueEntries to delete.
     * @example
     * // Delete a few QueueEntries
     * const { count } = await prisma.queueEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QueueEntryDeleteManyArgs>(args?: SelectSubset<T, QueueEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueueEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QueueEntries
     * const queueEntry = await prisma.queueEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QueueEntryUpdateManyArgs>(args: SelectSubset<T, QueueEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueueEntries and returns the data updated in the database.
     * @param {QueueEntryUpdateManyAndReturnArgs} args - Arguments to update many QueueEntries.
     * @example
     * // Update many QueueEntries
     * const queueEntry = await prisma.queueEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QueueEntries and only return the `id`
     * const queueEntryWithIdOnly = await prisma.queueEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QueueEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, QueueEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QueueEntry.
     * @param {QueueEntryUpsertArgs} args - Arguments to update or create a QueueEntry.
     * @example
     * // Update or create a QueueEntry
     * const queueEntry = await prisma.queueEntry.upsert({
     *   create: {
     *     // ... data to create a QueueEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QueueEntry we want to update
     *   }
     * })
     */
    upsert<T extends QueueEntryUpsertArgs>(args: SelectSubset<T, QueueEntryUpsertArgs<ExtArgs>>): Prisma__QueueEntryClient<$Result.GetResult<Prisma.$QueueEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QueueEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueEntryCountArgs} args - Arguments to filter QueueEntries to count.
     * @example
     * // Count the number of QueueEntries
     * const count = await prisma.queueEntry.count({
     *   where: {
     *     // ... the filter for the QueueEntries we want to count
     *   }
     * })
    **/
    count<T extends QueueEntryCountArgs>(
      args?: Subset<T, QueueEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QueueEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QueueEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QueueEntryAggregateArgs>(args: Subset<T, QueueEntryAggregateArgs>): Prisma.PrismaPromise<GetQueueEntryAggregateType<T>>

    /**
     * Group by QueueEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QueueEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QueueEntryGroupByArgs['orderBy'] }
        : { orderBy?: QueueEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QueueEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQueueEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QueueEntry model
   */
  readonly fields: QueueEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QueueEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QueueEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QueueEntry model
   */
  interface QueueEntryFieldRefs {
    readonly id: FieldRef<"QueueEntry", 'String'>
    readonly userId: FieldRef<"QueueEntry", 'String'>
    readonly joinedAt: FieldRef<"QueueEntry", 'DateTime'>
    readonly active: FieldRef<"QueueEntry", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * QueueEntry findUnique
   */
  export type QueueEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * Filter, which QueueEntry to fetch.
     */
    where: QueueEntryWhereUniqueInput
  }

  /**
   * QueueEntry findUniqueOrThrow
   */
  export type QueueEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * Filter, which QueueEntry to fetch.
     */
    where: QueueEntryWhereUniqueInput
  }

  /**
   * QueueEntry findFirst
   */
  export type QueueEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * Filter, which QueueEntry to fetch.
     */
    where?: QueueEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueEntries to fetch.
     */
    orderBy?: QueueEntryOrderByWithRelationInput | QueueEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueueEntries.
     */
    cursor?: QueueEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueueEntries.
     */
    distinct?: QueueEntryScalarFieldEnum | QueueEntryScalarFieldEnum[]
  }

  /**
   * QueueEntry findFirstOrThrow
   */
  export type QueueEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * Filter, which QueueEntry to fetch.
     */
    where?: QueueEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueEntries to fetch.
     */
    orderBy?: QueueEntryOrderByWithRelationInput | QueueEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueueEntries.
     */
    cursor?: QueueEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueueEntries.
     */
    distinct?: QueueEntryScalarFieldEnum | QueueEntryScalarFieldEnum[]
  }

  /**
   * QueueEntry findMany
   */
  export type QueueEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * Filter, which QueueEntries to fetch.
     */
    where?: QueueEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueEntries to fetch.
     */
    orderBy?: QueueEntryOrderByWithRelationInput | QueueEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QueueEntries.
     */
    cursor?: QueueEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueEntries.
     */
    skip?: number
    distinct?: QueueEntryScalarFieldEnum | QueueEntryScalarFieldEnum[]
  }

  /**
   * QueueEntry create
   */
  export type QueueEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a QueueEntry.
     */
    data: XOR<QueueEntryCreateInput, QueueEntryUncheckedCreateInput>
  }

  /**
   * QueueEntry createMany
   */
  export type QueueEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QueueEntries.
     */
    data: QueueEntryCreateManyInput | QueueEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QueueEntry createManyAndReturn
   */
  export type QueueEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * The data used to create many QueueEntries.
     */
    data: QueueEntryCreateManyInput | QueueEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QueueEntry update
   */
  export type QueueEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a QueueEntry.
     */
    data: XOR<QueueEntryUpdateInput, QueueEntryUncheckedUpdateInput>
    /**
     * Choose, which QueueEntry to update.
     */
    where: QueueEntryWhereUniqueInput
  }

  /**
   * QueueEntry updateMany
   */
  export type QueueEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QueueEntries.
     */
    data: XOR<QueueEntryUpdateManyMutationInput, QueueEntryUncheckedUpdateManyInput>
    /**
     * Filter which QueueEntries to update
     */
    where?: QueueEntryWhereInput
    /**
     * Limit how many QueueEntries to update.
     */
    limit?: number
  }

  /**
   * QueueEntry updateManyAndReturn
   */
  export type QueueEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * The data used to update QueueEntries.
     */
    data: XOR<QueueEntryUpdateManyMutationInput, QueueEntryUncheckedUpdateManyInput>
    /**
     * Filter which QueueEntries to update
     */
    where?: QueueEntryWhereInput
    /**
     * Limit how many QueueEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QueueEntry upsert
   */
  export type QueueEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the QueueEntry to update in case it exists.
     */
    where: QueueEntryWhereUniqueInput
    /**
     * In case the QueueEntry found by the `where` argument doesn't exist, create a new QueueEntry with this data.
     */
    create: XOR<QueueEntryCreateInput, QueueEntryUncheckedCreateInput>
    /**
     * In case the QueueEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QueueEntryUpdateInput, QueueEntryUncheckedUpdateInput>
  }

  /**
   * QueueEntry delete
   */
  export type QueueEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
    /**
     * Filter which QueueEntry to delete.
     */
    where: QueueEntryWhereUniqueInput
  }

  /**
   * QueueEntry deleteMany
   */
  export type QueueEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueueEntries to delete
     */
    where?: QueueEntryWhereInput
    /**
     * Limit how many QueueEntries to delete.
     */
    limit?: number
  }

  /**
   * QueueEntry without action
   */
  export type QueueEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueEntry
     */
    select?: QueueEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueEntry
     */
    omit?: QueueEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueEntryInclude<ExtArgs> | null
  }


  /**
   * Model Match
   */

  export type AggregateMatch = {
    _count: MatchCountAggregateOutputType | null
    _avg: MatchAvgAggregateOutputType | null
    _sum: MatchSumAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  export type MatchAvgAggregateOutputType = {
    maxPlayers: number | null
  }

  export type MatchSumAggregateOutputType = {
    maxPlayers: number | null
  }

  export type MatchMinAggregateOutputType = {
    id: string | null
    maxPlayers: number | null
    status: $Enums.MatchStatus | null
    mode: $Enums.GameMode | null
    startedAt: Date | null
    endedAt: Date | null
    createdAt: Date | null
    threadTimeComplexity: string | null
    threadSpaceComplexity: string | null
    threadOriginality: string | null
    threadRanking: string | null
  }

  export type MatchMaxAggregateOutputType = {
    id: string | null
    maxPlayers: number | null
    status: $Enums.MatchStatus | null
    mode: $Enums.GameMode | null
    startedAt: Date | null
    endedAt: Date | null
    createdAt: Date | null
    threadTimeComplexity: string | null
    threadSpaceComplexity: string | null
    threadOriginality: string | null
    threadRanking: string | null
  }

  export type MatchCountAggregateOutputType = {
    id: number
    maxPlayers: number
    status: number
    mode: number
    startedAt: number
    endedAt: number
    createdAt: number
    threadTimeComplexity: number
    threadSpaceComplexity: number
    threadOriginality: number
    threadRanking: number
    _all: number
  }


  export type MatchAvgAggregateInputType = {
    maxPlayers?: true
  }

  export type MatchSumAggregateInputType = {
    maxPlayers?: true
  }

  export type MatchMinAggregateInputType = {
    id?: true
    maxPlayers?: true
    status?: true
    mode?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    threadTimeComplexity?: true
    threadSpaceComplexity?: true
    threadOriginality?: true
    threadRanking?: true
  }

  export type MatchMaxAggregateInputType = {
    id?: true
    maxPlayers?: true
    status?: true
    mode?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    threadTimeComplexity?: true
    threadSpaceComplexity?: true
    threadOriginality?: true
    threadRanking?: true
  }

  export type MatchCountAggregateInputType = {
    id?: true
    maxPlayers?: true
    status?: true
    mode?: true
    startedAt?: true
    endedAt?: true
    createdAt?: true
    threadTimeComplexity?: true
    threadSpaceComplexity?: true
    threadOriginality?: true
    threadRanking?: true
    _all?: true
  }

  export type MatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Match to aggregate.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Matches
    **/
    _count?: true | MatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchMaxAggregateInputType
  }

  export type GetMatchAggregateType<T extends MatchAggregateArgs> = {
        [P in keyof T & keyof AggregateMatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatch[P]>
      : GetScalarType<T[P], AggregateMatch[P]>
  }




  export type MatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithAggregationInput | MatchOrderByWithAggregationInput[]
    by: MatchScalarFieldEnum[] | MatchScalarFieldEnum
    having?: MatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchCountAggregateInputType | true
    _avg?: MatchAvgAggregateInputType
    _sum?: MatchSumAggregateInputType
    _min?: MatchMinAggregateInputType
    _max?: MatchMaxAggregateInputType
  }

  export type MatchGroupByOutputType = {
    id: string
    maxPlayers: number
    status: $Enums.MatchStatus
    mode: $Enums.GameMode
    startedAt: Date | null
    endedAt: Date | null
    createdAt: Date
    threadTimeComplexity: string | null
    threadSpaceComplexity: string | null
    threadOriginality: string | null
    threadRanking: string | null
    _count: MatchCountAggregateOutputType | null
    _avg: MatchAvgAggregateOutputType | null
    _sum: MatchSumAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  type GetMatchGroupByPayload<T extends MatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchGroupByOutputType[P]>
            : GetScalarType<T[P], MatchGroupByOutputType[P]>
        }
      >
    >


  export type MatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    maxPlayers?: boolean
    status?: boolean
    mode?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    threadTimeComplexity?: boolean
    threadSpaceComplexity?: boolean
    threadOriginality?: boolean
    threadRanking?: boolean
    players?: boolean | Match$playersArgs<ExtArgs>
    questions?: boolean | Match$questionsArgs<ExtArgs>
    submissions?: boolean | Match$submissionsArgs<ExtArgs>
    _count?: boolean | MatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    maxPlayers?: boolean
    status?: boolean
    mode?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    threadTimeComplexity?: boolean
    threadSpaceComplexity?: boolean
    threadOriginality?: boolean
    threadRanking?: boolean
  }, ExtArgs["result"]["match"]>

  export type MatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    maxPlayers?: boolean
    status?: boolean
    mode?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    threadTimeComplexity?: boolean
    threadSpaceComplexity?: boolean
    threadOriginality?: boolean
    threadRanking?: boolean
  }, ExtArgs["result"]["match"]>

  export type MatchSelectScalar = {
    id?: boolean
    maxPlayers?: boolean
    status?: boolean
    mode?: boolean
    startedAt?: boolean
    endedAt?: boolean
    createdAt?: boolean
    threadTimeComplexity?: boolean
    threadSpaceComplexity?: boolean
    threadOriginality?: boolean
    threadRanking?: boolean
  }

  export type MatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "maxPlayers" | "status" | "mode" | "startedAt" | "endedAt" | "createdAt" | "threadTimeComplexity" | "threadSpaceComplexity" | "threadOriginality" | "threadRanking", ExtArgs["result"]["match"]>
  export type MatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | Match$playersArgs<ExtArgs>
    questions?: boolean | Match$questionsArgs<ExtArgs>
    submissions?: boolean | Match$submissionsArgs<ExtArgs>
    _count?: boolean | MatchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Match"
    objects: {
      players: Prisma.$MatchPlayerPayload<ExtArgs>[]
      questions: Prisma.$MatchQuestionPayload<ExtArgs>[]
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      maxPlayers: number
      status: $Enums.MatchStatus
      mode: $Enums.GameMode
      startedAt: Date | null
      endedAt: Date | null
      createdAt: Date
      threadTimeComplexity: string | null
      threadSpaceComplexity: string | null
      threadOriginality: string | null
      threadRanking: string | null
    }, ExtArgs["result"]["match"]>
    composites: {}
  }

  type MatchGetPayload<S extends boolean | null | undefined | MatchDefaultArgs> = $Result.GetResult<Prisma.$MatchPayload, S>

  type MatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchCountAggregateInputType | true
    }

  export interface MatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Match'], meta: { name: 'Match' } }
    /**
     * Find zero or one Match that matches the filter.
     * @param {MatchFindUniqueArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchFindUniqueArgs>(args: SelectSubset<T, MatchFindUniqueArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Match that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchFindUniqueOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchFindFirstArgs>(args?: SelectSubset<T, MatchFindFirstArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Matches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Matches
     * const matches = await prisma.match.findMany()
     * 
     * // Get first 10 Matches
     * const matches = await prisma.match.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchWithIdOnly = await prisma.match.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchFindManyArgs>(args?: SelectSubset<T, MatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Match.
     * @param {MatchCreateArgs} args - Arguments to create a Match.
     * @example
     * // Create one Match
     * const Match = await prisma.match.create({
     *   data: {
     *     // ... data to create a Match
     *   }
     * })
     * 
     */
    create<T extends MatchCreateArgs>(args: SelectSubset<T, MatchCreateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Matches.
     * @param {MatchCreateManyArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchCreateManyArgs>(args?: SelectSubset<T, MatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Matches and returns the data saved in the database.
     * @param {MatchCreateManyAndReturnArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Match.
     * @param {MatchDeleteArgs} args - Arguments to delete one Match.
     * @example
     * // Delete one Match
     * const Match = await prisma.match.delete({
     *   where: {
     *     // ... filter to delete one Match
     *   }
     * })
     * 
     */
    delete<T extends MatchDeleteArgs>(args: SelectSubset<T, MatchDeleteArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Match.
     * @param {MatchUpdateArgs} args - Arguments to update one Match.
     * @example
     * // Update one Match
     * const match = await prisma.match.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchUpdateArgs>(args: SelectSubset<T, MatchUpdateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Matches.
     * @param {MatchDeleteManyArgs} args - Arguments to filter Matches to delete.
     * @example
     * // Delete a few Matches
     * const { count } = await prisma.match.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchDeleteManyArgs>(args?: SelectSubset<T, MatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchUpdateManyArgs>(args: SelectSubset<T, MatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches and returns the data updated in the database.
     * @param {MatchUpdateManyAndReturnArgs} args - Arguments to update many Matches.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Match.
     * @param {MatchUpsertArgs} args - Arguments to update or create a Match.
     * @example
     * // Update or create a Match
     * const match = await prisma.match.upsert({
     *   create: {
     *     // ... data to create a Match
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Match we want to update
     *   }
     * })
     */
    upsert<T extends MatchUpsertArgs>(args: SelectSubset<T, MatchUpsertArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchCountArgs} args - Arguments to filter Matches to count.
     * @example
     * // Count the number of Matches
     * const count = await prisma.match.count({
     *   where: {
     *     // ... the filter for the Matches we want to count
     *   }
     * })
    **/
    count<T extends MatchCountArgs>(
      args?: Subset<T, MatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchAggregateArgs>(args: Subset<T, MatchAggregateArgs>): Prisma.PrismaPromise<GetMatchAggregateType<T>>

    /**
     * Group by Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchGroupByArgs['orderBy'] }
        : { orderBy?: MatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Match model
   */
  readonly fields: MatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Match.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    players<T extends Match$playersArgs<ExtArgs> = {}>(args?: Subset<T, Match$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    questions<T extends Match$questionsArgs<ExtArgs> = {}>(args?: Subset<T, Match$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submissions<T extends Match$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, Match$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Match model
   */
  interface MatchFieldRefs {
    readonly id: FieldRef<"Match", 'String'>
    readonly maxPlayers: FieldRef<"Match", 'Int'>
    readonly status: FieldRef<"Match", 'MatchStatus'>
    readonly mode: FieldRef<"Match", 'GameMode'>
    readonly startedAt: FieldRef<"Match", 'DateTime'>
    readonly endedAt: FieldRef<"Match", 'DateTime'>
    readonly createdAt: FieldRef<"Match", 'DateTime'>
    readonly threadTimeComplexity: FieldRef<"Match", 'String'>
    readonly threadSpaceComplexity: FieldRef<"Match", 'String'>
    readonly threadOriginality: FieldRef<"Match", 'String'>
    readonly threadRanking: FieldRef<"Match", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Match findUnique
   */
  export type MatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findUniqueOrThrow
   */
  export type MatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findFirst
   */
  export type MatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findFirstOrThrow
   */
  export type MatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findMany
   */
  export type MatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Matches to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match create
   */
  export type MatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to create a Match.
     */
    data?: XOR<MatchCreateInput, MatchUncheckedCreateInput>
  }

  /**
   * Match createMany
   */
  export type MatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Match createManyAndReturn
   */
  export type MatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Match update
   */
  export type MatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to update a Match.
     */
    data: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
    /**
     * Choose, which Match to update.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match updateMany
   */
  export type MatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
  }

  /**
   * Match updateManyAndReturn
   */
  export type MatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
  }

  /**
   * Match upsert
   */
  export type MatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The filter to search for the Match to update in case it exists.
     */
    where: MatchWhereUniqueInput
    /**
     * In case the Match found by the `where` argument doesn't exist, create a new Match with this data.
     */
    create: XOR<MatchCreateInput, MatchUncheckedCreateInput>
    /**
     * In case the Match was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
  }

  /**
   * Match delete
   */
  export type MatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter which Match to delete.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match deleteMany
   */
  export type MatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Matches to delete
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to delete.
     */
    limit?: number
  }

  /**
   * Match.players
   */
  export type Match$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null
    where?: MatchPlayerWhereInput
    orderBy?: MatchPlayerOrderByWithRelationInput | MatchPlayerOrderByWithRelationInput[]
    cursor?: MatchPlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchPlayerScalarFieldEnum | MatchPlayerScalarFieldEnum[]
  }

  /**
   * Match.questions
   */
  export type Match$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchQuestion
     */
    select?: MatchQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchQuestion
     */
    omit?: MatchQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchQuestionInclude<ExtArgs> | null
    where?: MatchQuestionWhereInput
    orderBy?: MatchQuestionOrderByWithRelationInput | MatchQuestionOrderByWithRelationInput[]
    cursor?: MatchQuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchQuestionScalarFieldEnum | MatchQuestionScalarFieldEnum[]
  }

  /**
   * Match.submissions
   */
  export type Match$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Match without action
   */
  export type MatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
  }


  /**
   * Model MatchPlayer
   */

  export type AggregateMatchPlayer = {
    _count: MatchPlayerCountAggregateOutputType | null
    _avg: MatchPlayerAvgAggregateOutputType | null
    _sum: MatchPlayerSumAggregateOutputType | null
    _min: MatchPlayerMinAggregateOutputType | null
    _max: MatchPlayerMaxAggregateOutputType | null
  }

  export type MatchPlayerAvgAggregateOutputType = {
    rank: number | null
    score: number | null
    xpDelta: number | null
  }

  export type MatchPlayerSumAggregateOutputType = {
    rank: number | null
    score: number | null
    xpDelta: number | null
  }

  export type MatchPlayerMinAggregateOutputType = {
    id: string | null
    matchId: string | null
    userId: string | null
    rank: number | null
    score: number | null
    result: $Enums.MatchOutcome | null
    xpDelta: number | null
    joinedAt: Date | null
  }

  export type MatchPlayerMaxAggregateOutputType = {
    id: string | null
    matchId: string | null
    userId: string | null
    rank: number | null
    score: number | null
    result: $Enums.MatchOutcome | null
    xpDelta: number | null
    joinedAt: Date | null
  }

  export type MatchPlayerCountAggregateOutputType = {
    id: number
    matchId: number
    userId: number
    rank: number
    score: number
    result: number
    xpDelta: number
    joinedAt: number
    _all: number
  }


  export type MatchPlayerAvgAggregateInputType = {
    rank?: true
    score?: true
    xpDelta?: true
  }

  export type MatchPlayerSumAggregateInputType = {
    rank?: true
    score?: true
    xpDelta?: true
  }

  export type MatchPlayerMinAggregateInputType = {
    id?: true
    matchId?: true
    userId?: true
    rank?: true
    score?: true
    result?: true
    xpDelta?: true
    joinedAt?: true
  }

  export type MatchPlayerMaxAggregateInputType = {
    id?: true
    matchId?: true
    userId?: true
    rank?: true
    score?: true
    result?: true
    xpDelta?: true
    joinedAt?: true
  }

  export type MatchPlayerCountAggregateInputType = {
    id?: true
    matchId?: true
    userId?: true
    rank?: true
    score?: true
    result?: true
    xpDelta?: true
    joinedAt?: true
    _all?: true
  }

  export type MatchPlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchPlayer to aggregate.
     */
    where?: MatchPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchPlayers to fetch.
     */
    orderBy?: MatchPlayerOrderByWithRelationInput | MatchPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MatchPlayers
    **/
    _count?: true | MatchPlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchPlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchPlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchPlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchPlayerMaxAggregateInputType
  }

  export type GetMatchPlayerAggregateType<T extends MatchPlayerAggregateArgs> = {
        [P in keyof T & keyof AggregateMatchPlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatchPlayer[P]>
      : GetScalarType<T[P], AggregateMatchPlayer[P]>
  }




  export type MatchPlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchPlayerWhereInput
    orderBy?: MatchPlayerOrderByWithAggregationInput | MatchPlayerOrderByWithAggregationInput[]
    by: MatchPlayerScalarFieldEnum[] | MatchPlayerScalarFieldEnum
    having?: MatchPlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchPlayerCountAggregateInputType | true
    _avg?: MatchPlayerAvgAggregateInputType
    _sum?: MatchPlayerSumAggregateInputType
    _min?: MatchPlayerMinAggregateInputType
    _max?: MatchPlayerMaxAggregateInputType
  }

  export type MatchPlayerGroupByOutputType = {
    id: string
    matchId: string
    userId: string
    rank: number | null
    score: number | null
    result: $Enums.MatchOutcome | null
    xpDelta: number
    joinedAt: Date
    _count: MatchPlayerCountAggregateOutputType | null
    _avg: MatchPlayerAvgAggregateOutputType | null
    _sum: MatchPlayerSumAggregateOutputType | null
    _min: MatchPlayerMinAggregateOutputType | null
    _max: MatchPlayerMaxAggregateOutputType | null
  }

  type GetMatchPlayerGroupByPayload<T extends MatchPlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchPlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchPlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchPlayerGroupByOutputType[P]>
            : GetScalarType<T[P], MatchPlayerGroupByOutputType[P]>
        }
      >
    >


  export type MatchPlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    userId?: boolean
    rank?: boolean
    score?: boolean
    result?: boolean
    xpDelta?: boolean
    joinedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchPlayer"]>

  export type MatchPlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    userId?: boolean
    rank?: boolean
    score?: boolean
    result?: boolean
    xpDelta?: boolean
    joinedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchPlayer"]>

  export type MatchPlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    userId?: boolean
    rank?: boolean
    score?: boolean
    result?: boolean
    xpDelta?: boolean
    joinedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchPlayer"]>

  export type MatchPlayerSelectScalar = {
    id?: boolean
    matchId?: boolean
    userId?: boolean
    rank?: boolean
    score?: boolean
    result?: boolean
    xpDelta?: boolean
    joinedAt?: boolean
  }

  export type MatchPlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "matchId" | "userId" | "rank" | "score" | "result" | "xpDelta" | "joinedAt", ExtArgs["result"]["matchPlayer"]>
  export type MatchPlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MatchPlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MatchPlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MatchPlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MatchPlayer"
    objects: {
      match: Prisma.$MatchPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      matchId: string
      userId: string
      rank: number | null
      score: number | null
      result: $Enums.MatchOutcome | null
      xpDelta: number
      joinedAt: Date
    }, ExtArgs["result"]["matchPlayer"]>
    composites: {}
  }

  type MatchPlayerGetPayload<S extends boolean | null | undefined | MatchPlayerDefaultArgs> = $Result.GetResult<Prisma.$MatchPlayerPayload, S>

  type MatchPlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchPlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchPlayerCountAggregateInputType | true
    }

  export interface MatchPlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MatchPlayer'], meta: { name: 'MatchPlayer' } }
    /**
     * Find zero or one MatchPlayer that matches the filter.
     * @param {MatchPlayerFindUniqueArgs} args - Arguments to find a MatchPlayer
     * @example
     * // Get one MatchPlayer
     * const matchPlayer = await prisma.matchPlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchPlayerFindUniqueArgs>(args: SelectSubset<T, MatchPlayerFindUniqueArgs<ExtArgs>>): Prisma__MatchPlayerClient<$Result.GetResult<Prisma.$MatchPlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MatchPlayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchPlayerFindUniqueOrThrowArgs} args - Arguments to find a MatchPlayer
     * @example
     * // Get one MatchPlayer
     * const matchPlayer = await prisma.matchPlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchPlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchPlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchPlayerClient<$Result.GetResult<Prisma.$MatchPlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchPlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchPlayerFindFirstArgs} args - Arguments to find a MatchPlayer
     * @example
     * // Get one MatchPlayer
     * const matchPlayer = await prisma.matchPlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchPlayerFindFirstArgs>(args?: SelectSubset<T, MatchPlayerFindFirstArgs<ExtArgs>>): Prisma__MatchPlayerClient<$Result.GetResult<Prisma.$MatchPlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchPlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchPlayerFindFirstOrThrowArgs} args - Arguments to find a MatchPlayer
     * @example
     * // Get one MatchPlayer
     * const matchPlayer = await prisma.matchPlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchPlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchPlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchPlayerClient<$Result.GetResult<Prisma.$MatchPlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MatchPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchPlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatchPlayers
     * const matchPlayers = await prisma.matchPlayer.findMany()
     * 
     * // Get first 10 MatchPlayers
     * const matchPlayers = await prisma.matchPlayer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchPlayerWithIdOnly = await prisma.matchPlayer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchPlayerFindManyArgs>(args?: SelectSubset<T, MatchPlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MatchPlayer.
     * @param {MatchPlayerCreateArgs} args - Arguments to create a MatchPlayer.
     * @example
     * // Create one MatchPlayer
     * const MatchPlayer = await prisma.matchPlayer.create({
     *   data: {
     *     // ... data to create a MatchPlayer
     *   }
     * })
     * 
     */
    create<T extends MatchPlayerCreateArgs>(args: SelectSubset<T, MatchPlayerCreateArgs<ExtArgs>>): Prisma__MatchPlayerClient<$Result.GetResult<Prisma.$MatchPlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MatchPlayers.
     * @param {MatchPlayerCreateManyArgs} args - Arguments to create many MatchPlayers.
     * @example
     * // Create many MatchPlayers
     * const matchPlayer = await prisma.matchPlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchPlayerCreateManyArgs>(args?: SelectSubset<T, MatchPlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MatchPlayers and returns the data saved in the database.
     * @param {MatchPlayerCreateManyAndReturnArgs} args - Arguments to create many MatchPlayers.
     * @example
     * // Create many MatchPlayers
     * const matchPlayer = await prisma.matchPlayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MatchPlayers and only return the `id`
     * const matchPlayerWithIdOnly = await prisma.matchPlayer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchPlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchPlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MatchPlayer.
     * @param {MatchPlayerDeleteArgs} args - Arguments to delete one MatchPlayer.
     * @example
     * // Delete one MatchPlayer
     * const MatchPlayer = await prisma.matchPlayer.delete({
     *   where: {
     *     // ... filter to delete one MatchPlayer
     *   }
     * })
     * 
     */
    delete<T extends MatchPlayerDeleteArgs>(args: SelectSubset<T, MatchPlayerDeleteArgs<ExtArgs>>): Prisma__MatchPlayerClient<$Result.GetResult<Prisma.$MatchPlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MatchPlayer.
     * @param {MatchPlayerUpdateArgs} args - Arguments to update one MatchPlayer.
     * @example
     * // Update one MatchPlayer
     * const matchPlayer = await prisma.matchPlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchPlayerUpdateArgs>(args: SelectSubset<T, MatchPlayerUpdateArgs<ExtArgs>>): Prisma__MatchPlayerClient<$Result.GetResult<Prisma.$MatchPlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MatchPlayers.
     * @param {MatchPlayerDeleteManyArgs} args - Arguments to filter MatchPlayers to delete.
     * @example
     * // Delete a few MatchPlayers
     * const { count } = await prisma.matchPlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchPlayerDeleteManyArgs>(args?: SelectSubset<T, MatchPlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchPlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatchPlayers
     * const matchPlayer = await prisma.matchPlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchPlayerUpdateManyArgs>(args: SelectSubset<T, MatchPlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchPlayers and returns the data updated in the database.
     * @param {MatchPlayerUpdateManyAndReturnArgs} args - Arguments to update many MatchPlayers.
     * @example
     * // Update many MatchPlayers
     * const matchPlayer = await prisma.matchPlayer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MatchPlayers and only return the `id`
     * const matchPlayerWithIdOnly = await prisma.matchPlayer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchPlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchPlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MatchPlayer.
     * @param {MatchPlayerUpsertArgs} args - Arguments to update or create a MatchPlayer.
     * @example
     * // Update or create a MatchPlayer
     * const matchPlayer = await prisma.matchPlayer.upsert({
     *   create: {
     *     // ... data to create a MatchPlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatchPlayer we want to update
     *   }
     * })
     */
    upsert<T extends MatchPlayerUpsertArgs>(args: SelectSubset<T, MatchPlayerUpsertArgs<ExtArgs>>): Prisma__MatchPlayerClient<$Result.GetResult<Prisma.$MatchPlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MatchPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchPlayerCountArgs} args - Arguments to filter MatchPlayers to count.
     * @example
     * // Count the number of MatchPlayers
     * const count = await prisma.matchPlayer.count({
     *   where: {
     *     // ... the filter for the MatchPlayers we want to count
     *   }
     * })
    **/
    count<T extends MatchPlayerCountArgs>(
      args?: Subset<T, MatchPlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchPlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MatchPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchPlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchPlayerAggregateArgs>(args: Subset<T, MatchPlayerAggregateArgs>): Prisma.PrismaPromise<GetMatchPlayerAggregateType<T>>

    /**
     * Group by MatchPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchPlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchPlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchPlayerGroupByArgs['orderBy'] }
        : { orderBy?: MatchPlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchPlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MatchPlayer model
   */
  readonly fields: MatchPlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatchPlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchPlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    match<T extends MatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MatchDefaultArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MatchPlayer model
   */
  interface MatchPlayerFieldRefs {
    readonly id: FieldRef<"MatchPlayer", 'String'>
    readonly matchId: FieldRef<"MatchPlayer", 'String'>
    readonly userId: FieldRef<"MatchPlayer", 'String'>
    readonly rank: FieldRef<"MatchPlayer", 'Int'>
    readonly score: FieldRef<"MatchPlayer", 'Float'>
    readonly result: FieldRef<"MatchPlayer", 'MatchOutcome'>
    readonly xpDelta: FieldRef<"MatchPlayer", 'Int'>
    readonly joinedAt: FieldRef<"MatchPlayer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MatchPlayer findUnique
   */
  export type MatchPlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null
    /**
     * Filter, which MatchPlayer to fetch.
     */
    where: MatchPlayerWhereUniqueInput
  }

  /**
   * MatchPlayer findUniqueOrThrow
   */
  export type MatchPlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null
    /**
     * Filter, which MatchPlayer to fetch.
     */
    where: MatchPlayerWhereUniqueInput
  }

  /**
   * MatchPlayer findFirst
   */
  export type MatchPlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null
    /**
     * Filter, which MatchPlayer to fetch.
     */
    where?: MatchPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchPlayers to fetch.
     */
    orderBy?: MatchPlayerOrderByWithRelationInput | MatchPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchPlayers.
     */
    cursor?: MatchPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchPlayers.
     */
    distinct?: MatchPlayerScalarFieldEnum | MatchPlayerScalarFieldEnum[]
  }

  /**
   * MatchPlayer findFirstOrThrow
   */
  export type MatchPlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null
    /**
     * Filter, which MatchPlayer to fetch.
     */
    where?: MatchPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchPlayers to fetch.
     */
    orderBy?: MatchPlayerOrderByWithRelationInput | MatchPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchPlayers.
     */
    cursor?: MatchPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchPlayers.
     */
    distinct?: MatchPlayerScalarFieldEnum | MatchPlayerScalarFieldEnum[]
  }

  /**
   * MatchPlayer findMany
   */
  export type MatchPlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null
    /**
     * Filter, which MatchPlayers to fetch.
     */
    where?: MatchPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchPlayers to fetch.
     */
    orderBy?: MatchPlayerOrderByWithRelationInput | MatchPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MatchPlayers.
     */
    cursor?: MatchPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchPlayers.
     */
    skip?: number
    distinct?: MatchPlayerScalarFieldEnum | MatchPlayerScalarFieldEnum[]
  }

  /**
   * MatchPlayer create
   */
  export type MatchPlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a MatchPlayer.
     */
    data: XOR<MatchPlayerCreateInput, MatchPlayerUncheckedCreateInput>
  }

  /**
   * MatchPlayer createMany
   */
  export type MatchPlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatchPlayers.
     */
    data: MatchPlayerCreateManyInput | MatchPlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatchPlayer createManyAndReturn
   */
  export type MatchPlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null
    /**
     * The data used to create many MatchPlayers.
     */
    data: MatchPlayerCreateManyInput | MatchPlayerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchPlayer update
   */
  export type MatchPlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a MatchPlayer.
     */
    data: XOR<MatchPlayerUpdateInput, MatchPlayerUncheckedUpdateInput>
    /**
     * Choose, which MatchPlayer to update.
     */
    where: MatchPlayerWhereUniqueInput
  }

  /**
   * MatchPlayer updateMany
   */
  export type MatchPlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatchPlayers.
     */
    data: XOR<MatchPlayerUpdateManyMutationInput, MatchPlayerUncheckedUpdateManyInput>
    /**
     * Filter which MatchPlayers to update
     */
    where?: MatchPlayerWhereInput
    /**
     * Limit how many MatchPlayers to update.
     */
    limit?: number
  }

  /**
   * MatchPlayer updateManyAndReturn
   */
  export type MatchPlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null
    /**
     * The data used to update MatchPlayers.
     */
    data: XOR<MatchPlayerUpdateManyMutationInput, MatchPlayerUncheckedUpdateManyInput>
    /**
     * Filter which MatchPlayers to update
     */
    where?: MatchPlayerWhereInput
    /**
     * Limit how many MatchPlayers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchPlayer upsert
   */
  export type MatchPlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the MatchPlayer to update in case it exists.
     */
    where: MatchPlayerWhereUniqueInput
    /**
     * In case the MatchPlayer found by the `where` argument doesn't exist, create a new MatchPlayer with this data.
     */
    create: XOR<MatchPlayerCreateInput, MatchPlayerUncheckedCreateInput>
    /**
     * In case the MatchPlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchPlayerUpdateInput, MatchPlayerUncheckedUpdateInput>
  }

  /**
   * MatchPlayer delete
   */
  export type MatchPlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null
    /**
     * Filter which MatchPlayer to delete.
     */
    where: MatchPlayerWhereUniqueInput
  }

  /**
   * MatchPlayer deleteMany
   */
  export type MatchPlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchPlayers to delete
     */
    where?: MatchPlayerWhereInput
    /**
     * Limit how many MatchPlayers to delete.
     */
    limit?: number
  }

  /**
   * MatchPlayer without action
   */
  export type MatchPlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchPlayer
     */
    select?: MatchPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchPlayer
     */
    omit?: MatchPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchPlayerInclude<ExtArgs> | null
  }


  /**
   * Model Question
   */

  export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  export type QuestionMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    difficulty: $Enums.Difficulty | null
    mode: $Enums.GameMode | null
    brokenCode: string | null
    brokenLanguage: string | null
    expectedOutput: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuestionMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    difficulty: $Enums.Difficulty | null
    mode: $Enums.GameMode | null
    brokenCode: string | null
    brokenLanguage: string | null
    expectedOutput: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuestionCountAggregateOutputType = {
    id: number
    title: number
    description: number
    difficulty: number
    mode: number
    brokenCode: number
    brokenLanguage: number
    expectedOutput: number
    testCases: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QuestionMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    difficulty?: true
    mode?: true
    brokenCode?: true
    brokenLanguage?: true
    expectedOutput?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuestionMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    difficulty?: true
    mode?: true
    brokenCode?: true
    brokenLanguage?: true
    expectedOutput?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuestionCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    difficulty?: true
    mode?: true
    brokenCode?: true
    brokenLanguage?: true
    expectedOutput?: true
    testCases?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Question to aggregate.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Questions
    **/
    _count?: true | QuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionMaxAggregateInputType
  }

  export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion[P]>
      : GetScalarType<T[P], AggregateQuestion[P]>
  }




  export type QuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithAggregationInput | QuestionOrderByWithAggregationInput[]
    by: QuestionScalarFieldEnum[] | QuestionScalarFieldEnum
    having?: QuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionCountAggregateInputType | true
    _min?: QuestionMinAggregateInputType
    _max?: QuestionMaxAggregateInputType
  }

  export type QuestionGroupByOutputType = {
    id: string
    title: string
    description: string
    difficulty: $Enums.Difficulty
    mode: $Enums.GameMode
    brokenCode: string | null
    brokenLanguage: string | null
    expectedOutput: string | null
    testCases: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: QuestionCountAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    mode?: boolean
    brokenCode?: boolean
    brokenLanguage?: boolean
    expectedOutput?: boolean
    testCases?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    matchQuestions?: boolean | Question$matchQuestionsArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    mode?: boolean
    brokenCode?: boolean
    brokenLanguage?: boolean
    expectedOutput?: boolean
    testCases?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    mode?: boolean
    brokenCode?: boolean
    brokenLanguage?: boolean
    expectedOutput?: boolean
    testCases?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    mode?: boolean
    brokenCode?: boolean
    brokenLanguage?: boolean
    expectedOutput?: boolean
    testCases?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "difficulty" | "mode" | "brokenCode" | "brokenLanguage" | "expectedOutput" | "testCases" | "createdAt" | "updatedAt", ExtArgs["result"]["question"]>
  export type QuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    matchQuestions?: boolean | Question$matchQuestionsArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type QuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $QuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Question"
    objects: {
      matchQuestions: Prisma.$MatchQuestionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      difficulty: $Enums.Difficulty
      mode: $Enums.GameMode
      brokenCode: string | null
      brokenLanguage: string | null
      expectedOutput: string | null
      testCases: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["question"]>
    composites: {}
  }

  type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = $Result.GetResult<Prisma.$QuestionPayload, S>

  type QuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionCountAggregateInputType | true
    }

  export interface QuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Question'], meta: { name: 'Question' } }
    /**
     * Find zero or one Question that matches the filter.
     * @param {QuestionFindUniqueArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionFindUniqueArgs>(args: SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Question that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionFindUniqueOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionFindFirstArgs>(args?: SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Questions
     * const questions = await prisma.question.findMany()
     * 
     * // Get first 10 Questions
     * const questions = await prisma.question.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionWithIdOnly = await prisma.question.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionFindManyArgs>(args?: SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Question.
     * @param {QuestionCreateArgs} args - Arguments to create a Question.
     * @example
     * // Create one Question
     * const Question = await prisma.question.create({
     *   data: {
     *     // ... data to create a Question
     *   }
     * })
     * 
     */
    create<T extends QuestionCreateArgs>(args: SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Questions.
     * @param {QuestionCreateManyArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionCreateManyArgs>(args?: SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Questions and returns the data saved in the database.
     * @param {QuestionCreateManyAndReturnArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Question.
     * @param {QuestionDeleteArgs} args - Arguments to delete one Question.
     * @example
     * // Delete one Question
     * const Question = await prisma.question.delete({
     *   where: {
     *     // ... filter to delete one Question
     *   }
     * })
     * 
     */
    delete<T extends QuestionDeleteArgs>(args: SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Question.
     * @param {QuestionUpdateArgs} args - Arguments to update one Question.
     * @example
     * // Update one Question
     * const question = await prisma.question.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionUpdateArgs>(args: SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Questions.
     * @param {QuestionDeleteManyArgs} args - Arguments to filter Questions to delete.
     * @example
     * // Delete a few Questions
     * const { count } = await prisma.question.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionDeleteManyArgs>(args?: SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionUpdateManyArgs>(args: SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions and returns the data updated in the database.
     * @param {QuestionUpdateManyAndReturnArgs} args - Arguments to update many Questions.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Question.
     * @param {QuestionUpsertArgs} args - Arguments to update or create a Question.
     * @example
     * // Update or create a Question
     * const question = await prisma.question.upsert({
     *   create: {
     *     // ... data to create a Question
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question we want to update
     *   }
     * })
     */
    upsert<T extends QuestionUpsertArgs>(args: SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionCountArgs} args - Arguments to filter Questions to count.
     * @example
     * // Count the number of Questions
     * const count = await prisma.question.count({
     *   where: {
     *     // ... the filter for the Questions we want to count
     *   }
     * })
    **/
    count<T extends QuestionCountArgs>(
      args?: Subset<T, QuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionAggregateArgs>(args: Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>

    /**
     * Group by Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Question model
   */
  readonly fields: QuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Question.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    matchQuestions<T extends Question$matchQuestionsArgs<ExtArgs> = {}>(args?: Subset<T, Question$matchQuestionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Question model
   */
  interface QuestionFieldRefs {
    readonly id: FieldRef<"Question", 'String'>
    readonly title: FieldRef<"Question", 'String'>
    readonly description: FieldRef<"Question", 'String'>
    readonly difficulty: FieldRef<"Question", 'Difficulty'>
    readonly mode: FieldRef<"Question", 'GameMode'>
    readonly brokenCode: FieldRef<"Question", 'String'>
    readonly brokenLanguage: FieldRef<"Question", 'String'>
    readonly expectedOutput: FieldRef<"Question", 'String'>
    readonly testCases: FieldRef<"Question", 'Json'>
    readonly createdAt: FieldRef<"Question", 'DateTime'>
    readonly updatedAt: FieldRef<"Question", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Question findUnique
   */
  export type QuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findUniqueOrThrow
   */
  export type QuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findFirst
   */
  export type QuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findFirstOrThrow
   */
  export type QuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findMany
   */
  export type QuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Questions to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question create
   */
  export type QuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a Question.
     */
    data: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
  }

  /**
   * Question createMany
   */
  export type QuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question createManyAndReturn
   */
  export type QuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question update
   */
  export type QuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a Question.
     */
    data: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
    /**
     * Choose, which Question to update.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question updateMany
   */
  export type QuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to update.
     */
    limit?: number
  }

  /**
   * Question updateManyAndReturn
   */
  export type QuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to update.
     */
    limit?: number
  }

  /**
   * Question upsert
   */
  export type QuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the Question to update in case it exists.
     */
    where: QuestionWhereUniqueInput
    /**
     * In case the Question found by the `where` argument doesn't exist, create a new Question with this data.
     */
    create: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
    /**
     * In case the Question was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
  }

  /**
   * Question delete
   */
  export type QuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter which Question to delete.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question deleteMany
   */
  export type QuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Questions to delete
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to delete.
     */
    limit?: number
  }

  /**
   * Question.matchQuestions
   */
  export type Question$matchQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchQuestion
     */
    select?: MatchQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchQuestion
     */
    omit?: MatchQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchQuestionInclude<ExtArgs> | null
    where?: MatchQuestionWhereInput
    orderBy?: MatchQuestionOrderByWithRelationInput | MatchQuestionOrderByWithRelationInput[]
    cursor?: MatchQuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchQuestionScalarFieldEnum | MatchQuestionScalarFieldEnum[]
  }

  /**
   * Question without action
   */
  export type QuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
  }


  /**
   * Model MatchQuestion
   */

  export type AggregateMatchQuestion = {
    _count: MatchQuestionCountAggregateOutputType | null
    _avg: MatchQuestionAvgAggregateOutputType | null
    _sum: MatchQuestionSumAggregateOutputType | null
    _min: MatchQuestionMinAggregateOutputType | null
    _max: MatchQuestionMaxAggregateOutputType | null
  }

  export type MatchQuestionAvgAggregateOutputType = {
    order: number | null
  }

  export type MatchQuestionSumAggregateOutputType = {
    order: number | null
  }

  export type MatchQuestionMinAggregateOutputType = {
    id: string | null
    matchId: string | null
    questionId: string | null
    order: number | null
  }

  export type MatchQuestionMaxAggregateOutputType = {
    id: string | null
    matchId: string | null
    questionId: string | null
    order: number | null
  }

  export type MatchQuestionCountAggregateOutputType = {
    id: number
    matchId: number
    questionId: number
    order: number
    _all: number
  }


  export type MatchQuestionAvgAggregateInputType = {
    order?: true
  }

  export type MatchQuestionSumAggregateInputType = {
    order?: true
  }

  export type MatchQuestionMinAggregateInputType = {
    id?: true
    matchId?: true
    questionId?: true
    order?: true
  }

  export type MatchQuestionMaxAggregateInputType = {
    id?: true
    matchId?: true
    questionId?: true
    order?: true
  }

  export type MatchQuestionCountAggregateInputType = {
    id?: true
    matchId?: true
    questionId?: true
    order?: true
    _all?: true
  }

  export type MatchQuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchQuestion to aggregate.
     */
    where?: MatchQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchQuestions to fetch.
     */
    orderBy?: MatchQuestionOrderByWithRelationInput | MatchQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MatchQuestions
    **/
    _count?: true | MatchQuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchQuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchQuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchQuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchQuestionMaxAggregateInputType
  }

  export type GetMatchQuestionAggregateType<T extends MatchQuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateMatchQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatchQuestion[P]>
      : GetScalarType<T[P], AggregateMatchQuestion[P]>
  }




  export type MatchQuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchQuestionWhereInput
    orderBy?: MatchQuestionOrderByWithAggregationInput | MatchQuestionOrderByWithAggregationInput[]
    by: MatchQuestionScalarFieldEnum[] | MatchQuestionScalarFieldEnum
    having?: MatchQuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchQuestionCountAggregateInputType | true
    _avg?: MatchQuestionAvgAggregateInputType
    _sum?: MatchQuestionSumAggregateInputType
    _min?: MatchQuestionMinAggregateInputType
    _max?: MatchQuestionMaxAggregateInputType
  }

  export type MatchQuestionGroupByOutputType = {
    id: string
    matchId: string
    questionId: string
    order: number
    _count: MatchQuestionCountAggregateOutputType | null
    _avg: MatchQuestionAvgAggregateOutputType | null
    _sum: MatchQuestionSumAggregateOutputType | null
    _min: MatchQuestionMinAggregateOutputType | null
    _max: MatchQuestionMaxAggregateOutputType | null
  }

  type GetMatchQuestionGroupByPayload<T extends MatchQuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchQuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchQuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchQuestionGroupByOutputType[P]>
            : GetScalarType<T[P], MatchQuestionGroupByOutputType[P]>
        }
      >
    >


  export type MatchQuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    questionId?: boolean
    order?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchQuestion"]>

  export type MatchQuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    questionId?: boolean
    order?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchQuestion"]>

  export type MatchQuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    questionId?: boolean
    order?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchQuestion"]>

  export type MatchQuestionSelectScalar = {
    id?: boolean
    matchId?: boolean
    questionId?: boolean
    order?: boolean
  }

  export type MatchQuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "matchId" | "questionId" | "order", ExtArgs["result"]["matchQuestion"]>
  export type MatchQuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }
  export type MatchQuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }
  export type MatchQuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type $MatchQuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MatchQuestion"
    objects: {
      match: Prisma.$MatchPayload<ExtArgs>
      question: Prisma.$QuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      matchId: string
      questionId: string
      order: number
    }, ExtArgs["result"]["matchQuestion"]>
    composites: {}
  }

  type MatchQuestionGetPayload<S extends boolean | null | undefined | MatchQuestionDefaultArgs> = $Result.GetResult<Prisma.$MatchQuestionPayload, S>

  type MatchQuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchQuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchQuestionCountAggregateInputType | true
    }

  export interface MatchQuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MatchQuestion'], meta: { name: 'MatchQuestion' } }
    /**
     * Find zero or one MatchQuestion that matches the filter.
     * @param {MatchQuestionFindUniqueArgs} args - Arguments to find a MatchQuestion
     * @example
     * // Get one MatchQuestion
     * const matchQuestion = await prisma.matchQuestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchQuestionFindUniqueArgs>(args: SelectSubset<T, MatchQuestionFindUniqueArgs<ExtArgs>>): Prisma__MatchQuestionClient<$Result.GetResult<Prisma.$MatchQuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MatchQuestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchQuestionFindUniqueOrThrowArgs} args - Arguments to find a MatchQuestion
     * @example
     * // Get one MatchQuestion
     * const matchQuestion = await prisma.matchQuestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchQuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchQuestionClient<$Result.GetResult<Prisma.$MatchQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchQuestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchQuestionFindFirstArgs} args - Arguments to find a MatchQuestion
     * @example
     * // Get one MatchQuestion
     * const matchQuestion = await prisma.matchQuestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchQuestionFindFirstArgs>(args?: SelectSubset<T, MatchQuestionFindFirstArgs<ExtArgs>>): Prisma__MatchQuestionClient<$Result.GetResult<Prisma.$MatchQuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchQuestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchQuestionFindFirstOrThrowArgs} args - Arguments to find a MatchQuestion
     * @example
     * // Get one MatchQuestion
     * const matchQuestion = await prisma.matchQuestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchQuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchQuestionClient<$Result.GetResult<Prisma.$MatchQuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MatchQuestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchQuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatchQuestions
     * const matchQuestions = await prisma.matchQuestion.findMany()
     * 
     * // Get first 10 MatchQuestions
     * const matchQuestions = await prisma.matchQuestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchQuestionWithIdOnly = await prisma.matchQuestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchQuestionFindManyArgs>(args?: SelectSubset<T, MatchQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MatchQuestion.
     * @param {MatchQuestionCreateArgs} args - Arguments to create a MatchQuestion.
     * @example
     * // Create one MatchQuestion
     * const MatchQuestion = await prisma.matchQuestion.create({
     *   data: {
     *     // ... data to create a MatchQuestion
     *   }
     * })
     * 
     */
    create<T extends MatchQuestionCreateArgs>(args: SelectSubset<T, MatchQuestionCreateArgs<ExtArgs>>): Prisma__MatchQuestionClient<$Result.GetResult<Prisma.$MatchQuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MatchQuestions.
     * @param {MatchQuestionCreateManyArgs} args - Arguments to create many MatchQuestions.
     * @example
     * // Create many MatchQuestions
     * const matchQuestion = await prisma.matchQuestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchQuestionCreateManyArgs>(args?: SelectSubset<T, MatchQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MatchQuestions and returns the data saved in the database.
     * @param {MatchQuestionCreateManyAndReturnArgs} args - Arguments to create many MatchQuestions.
     * @example
     * // Create many MatchQuestions
     * const matchQuestion = await prisma.matchQuestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MatchQuestions and only return the `id`
     * const matchQuestionWithIdOnly = await prisma.matchQuestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchQuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchQuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchQuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MatchQuestion.
     * @param {MatchQuestionDeleteArgs} args - Arguments to delete one MatchQuestion.
     * @example
     * // Delete one MatchQuestion
     * const MatchQuestion = await prisma.matchQuestion.delete({
     *   where: {
     *     // ... filter to delete one MatchQuestion
     *   }
     * })
     * 
     */
    delete<T extends MatchQuestionDeleteArgs>(args: SelectSubset<T, MatchQuestionDeleteArgs<ExtArgs>>): Prisma__MatchQuestionClient<$Result.GetResult<Prisma.$MatchQuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MatchQuestion.
     * @param {MatchQuestionUpdateArgs} args - Arguments to update one MatchQuestion.
     * @example
     * // Update one MatchQuestion
     * const matchQuestion = await prisma.matchQuestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchQuestionUpdateArgs>(args: SelectSubset<T, MatchQuestionUpdateArgs<ExtArgs>>): Prisma__MatchQuestionClient<$Result.GetResult<Prisma.$MatchQuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MatchQuestions.
     * @param {MatchQuestionDeleteManyArgs} args - Arguments to filter MatchQuestions to delete.
     * @example
     * // Delete a few MatchQuestions
     * const { count } = await prisma.matchQuestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchQuestionDeleteManyArgs>(args?: SelectSubset<T, MatchQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchQuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatchQuestions
     * const matchQuestion = await prisma.matchQuestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchQuestionUpdateManyArgs>(args: SelectSubset<T, MatchQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchQuestions and returns the data updated in the database.
     * @param {MatchQuestionUpdateManyAndReturnArgs} args - Arguments to update many MatchQuestions.
     * @example
     * // Update many MatchQuestions
     * const matchQuestion = await prisma.matchQuestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MatchQuestions and only return the `id`
     * const matchQuestionWithIdOnly = await prisma.matchQuestion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchQuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchQuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchQuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MatchQuestion.
     * @param {MatchQuestionUpsertArgs} args - Arguments to update or create a MatchQuestion.
     * @example
     * // Update or create a MatchQuestion
     * const matchQuestion = await prisma.matchQuestion.upsert({
     *   create: {
     *     // ... data to create a MatchQuestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatchQuestion we want to update
     *   }
     * })
     */
    upsert<T extends MatchQuestionUpsertArgs>(args: SelectSubset<T, MatchQuestionUpsertArgs<ExtArgs>>): Prisma__MatchQuestionClient<$Result.GetResult<Prisma.$MatchQuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MatchQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchQuestionCountArgs} args - Arguments to filter MatchQuestions to count.
     * @example
     * // Count the number of MatchQuestions
     * const count = await prisma.matchQuestion.count({
     *   where: {
     *     // ... the filter for the MatchQuestions we want to count
     *   }
     * })
    **/
    count<T extends MatchQuestionCountArgs>(
      args?: Subset<T, MatchQuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchQuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MatchQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchQuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchQuestionAggregateArgs>(args: Subset<T, MatchQuestionAggregateArgs>): Prisma.PrismaPromise<GetMatchQuestionAggregateType<T>>

    /**
     * Group by MatchQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchQuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchQuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchQuestionGroupByArgs['orderBy'] }
        : { orderBy?: MatchQuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MatchQuestion model
   */
  readonly fields: MatchQuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatchQuestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchQuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    match<T extends MatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MatchDefaultArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MatchQuestion model
   */
  interface MatchQuestionFieldRefs {
    readonly id: FieldRef<"MatchQuestion", 'String'>
    readonly matchId: FieldRef<"MatchQuestion", 'String'>
    readonly questionId: FieldRef<"MatchQuestion", 'String'>
    readonly order: FieldRef<"MatchQuestion", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MatchQuestion findUnique
   */
  export type MatchQuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchQuestion
     */
    select?: MatchQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchQuestion
     */
    omit?: MatchQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchQuestionInclude<ExtArgs> | null
    /**
     * Filter, which MatchQuestion to fetch.
     */
    where: MatchQuestionWhereUniqueInput
  }

  /**
   * MatchQuestion findUniqueOrThrow
   */
  export type MatchQuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchQuestion
     */
    select?: MatchQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchQuestion
     */
    omit?: MatchQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchQuestionInclude<ExtArgs> | null
    /**
     * Filter, which MatchQuestion to fetch.
     */
    where: MatchQuestionWhereUniqueInput
  }

  /**
   * MatchQuestion findFirst
   */
  export type MatchQuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchQuestion
     */
    select?: MatchQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchQuestion
     */
    omit?: MatchQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchQuestionInclude<ExtArgs> | null
    /**
     * Filter, which MatchQuestion to fetch.
     */
    where?: MatchQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchQuestions to fetch.
     */
    orderBy?: MatchQuestionOrderByWithRelationInput | MatchQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchQuestions.
     */
    cursor?: MatchQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchQuestions.
     */
    distinct?: MatchQuestionScalarFieldEnum | MatchQuestionScalarFieldEnum[]
  }

  /**
   * MatchQuestion findFirstOrThrow
   */
  export type MatchQuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchQuestion
     */
    select?: MatchQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchQuestion
     */
    omit?: MatchQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchQuestionInclude<ExtArgs> | null
    /**
     * Filter, which MatchQuestion to fetch.
     */
    where?: MatchQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchQuestions to fetch.
     */
    orderBy?: MatchQuestionOrderByWithRelationInput | MatchQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchQuestions.
     */
    cursor?: MatchQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchQuestions.
     */
    distinct?: MatchQuestionScalarFieldEnum | MatchQuestionScalarFieldEnum[]
  }

  /**
   * MatchQuestion findMany
   */
  export type MatchQuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchQuestion
     */
    select?: MatchQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchQuestion
     */
    omit?: MatchQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchQuestionInclude<ExtArgs> | null
    /**
     * Filter, which MatchQuestions to fetch.
     */
    where?: MatchQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchQuestions to fetch.
     */
    orderBy?: MatchQuestionOrderByWithRelationInput | MatchQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MatchQuestions.
     */
    cursor?: MatchQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchQuestions.
     */
    skip?: number
    distinct?: MatchQuestionScalarFieldEnum | MatchQuestionScalarFieldEnum[]
  }

  /**
   * MatchQuestion create
   */
  export type MatchQuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchQuestion
     */
    select?: MatchQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchQuestion
     */
    omit?: MatchQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchQuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a MatchQuestion.
     */
    data: XOR<MatchQuestionCreateInput, MatchQuestionUncheckedCreateInput>
  }

  /**
   * MatchQuestion createMany
   */
  export type MatchQuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatchQuestions.
     */
    data: MatchQuestionCreateManyInput | MatchQuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatchQuestion createManyAndReturn
   */
  export type MatchQuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchQuestion
     */
    select?: MatchQuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchQuestion
     */
    omit?: MatchQuestionOmit<ExtArgs> | null
    /**
     * The data used to create many MatchQuestions.
     */
    data: MatchQuestionCreateManyInput | MatchQuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchQuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchQuestion update
   */
  export type MatchQuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchQuestion
     */
    select?: MatchQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchQuestion
     */
    omit?: MatchQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchQuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a MatchQuestion.
     */
    data: XOR<MatchQuestionUpdateInput, MatchQuestionUncheckedUpdateInput>
    /**
     * Choose, which MatchQuestion to update.
     */
    where: MatchQuestionWhereUniqueInput
  }

  /**
   * MatchQuestion updateMany
   */
  export type MatchQuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatchQuestions.
     */
    data: XOR<MatchQuestionUpdateManyMutationInput, MatchQuestionUncheckedUpdateManyInput>
    /**
     * Filter which MatchQuestions to update
     */
    where?: MatchQuestionWhereInput
    /**
     * Limit how many MatchQuestions to update.
     */
    limit?: number
  }

  /**
   * MatchQuestion updateManyAndReturn
   */
  export type MatchQuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchQuestion
     */
    select?: MatchQuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchQuestion
     */
    omit?: MatchQuestionOmit<ExtArgs> | null
    /**
     * The data used to update MatchQuestions.
     */
    data: XOR<MatchQuestionUpdateManyMutationInput, MatchQuestionUncheckedUpdateManyInput>
    /**
     * Filter which MatchQuestions to update
     */
    where?: MatchQuestionWhereInput
    /**
     * Limit how many MatchQuestions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchQuestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchQuestion upsert
   */
  export type MatchQuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchQuestion
     */
    select?: MatchQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchQuestion
     */
    omit?: MatchQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchQuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the MatchQuestion to update in case it exists.
     */
    where: MatchQuestionWhereUniqueInput
    /**
     * In case the MatchQuestion found by the `where` argument doesn't exist, create a new MatchQuestion with this data.
     */
    create: XOR<MatchQuestionCreateInput, MatchQuestionUncheckedCreateInput>
    /**
     * In case the MatchQuestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchQuestionUpdateInput, MatchQuestionUncheckedUpdateInput>
  }

  /**
   * MatchQuestion delete
   */
  export type MatchQuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchQuestion
     */
    select?: MatchQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchQuestion
     */
    omit?: MatchQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchQuestionInclude<ExtArgs> | null
    /**
     * Filter which MatchQuestion to delete.
     */
    where: MatchQuestionWhereUniqueInput
  }

  /**
   * MatchQuestion deleteMany
   */
  export type MatchQuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchQuestions to delete
     */
    where?: MatchQuestionWhereInput
    /**
     * Limit how many MatchQuestions to delete.
     */
    limit?: number
  }

  /**
   * MatchQuestion without action
   */
  export type MatchQuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchQuestion
     */
    select?: MatchQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchQuestion
     */
    omit?: MatchQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchQuestionInclude<ExtArgs> | null
  }


  /**
   * Model Submission
   */

  export type AggregateSubmission = {
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  export type SubmissionAvgAggregateOutputType = {
    charCount: number | null
    exitCode: number | null
    execTimeMs: number | null
    testsPassed: number | null
    testsTotal: number | null
    timeScore: number | null
    spaceScore: number | null
    originalityScore: number | null
    relevanceScore: number | null
  }

  export type SubmissionSumAggregateOutputType = {
    charCount: number | null
    exitCode: number | null
    execTimeMs: number | null
    testsPassed: number | null
    testsTotal: number | null
    timeScore: number | null
    spaceScore: number | null
    originalityScore: number | null
    relevanceScore: number | null
  }

  export type SubmissionMinAggregateOutputType = {
    id: string | null
    matchId: string | null
    userId: string | null
    questionId: string | null
    code: string | null
    language: string | null
    charCount: number | null
    stdout: string | null
    stderr: string | null
    exitCode: number | null
    execTimeMs: number | null
    testsPassed: number | null
    testsTotal: number | null
    timeComplexity: string | null
    timeScore: number | null
    spaceComplexity: string | null
    spaceScore: number | null
    originalityScore: number | null
    relevanceScore: number | null
    submittedAt: Date | null
  }

  export type SubmissionMaxAggregateOutputType = {
    id: string | null
    matchId: string | null
    userId: string | null
    questionId: string | null
    code: string | null
    language: string | null
    charCount: number | null
    stdout: string | null
    stderr: string | null
    exitCode: number | null
    execTimeMs: number | null
    testsPassed: number | null
    testsTotal: number | null
    timeComplexity: string | null
    timeScore: number | null
    spaceComplexity: string | null
    spaceScore: number | null
    originalityScore: number | null
    relevanceScore: number | null
    submittedAt: Date | null
  }

  export type SubmissionCountAggregateOutputType = {
    id: number
    matchId: number
    userId: number
    questionId: number
    code: number
    language: number
    charCount: number
    stdout: number
    stderr: number
    exitCode: number
    execTimeMs: number
    testsPassed: number
    testsTotal: number
    timeComplexity: number
    timeScore: number
    spaceComplexity: number
    spaceScore: number
    originalityScore: number
    relevanceScore: number
    submittedAt: number
    _all: number
  }


  export type SubmissionAvgAggregateInputType = {
    charCount?: true
    exitCode?: true
    execTimeMs?: true
    testsPassed?: true
    testsTotal?: true
    timeScore?: true
    spaceScore?: true
    originalityScore?: true
    relevanceScore?: true
  }

  export type SubmissionSumAggregateInputType = {
    charCount?: true
    exitCode?: true
    execTimeMs?: true
    testsPassed?: true
    testsTotal?: true
    timeScore?: true
    spaceScore?: true
    originalityScore?: true
    relevanceScore?: true
  }

  export type SubmissionMinAggregateInputType = {
    id?: true
    matchId?: true
    userId?: true
    questionId?: true
    code?: true
    language?: true
    charCount?: true
    stdout?: true
    stderr?: true
    exitCode?: true
    execTimeMs?: true
    testsPassed?: true
    testsTotal?: true
    timeComplexity?: true
    timeScore?: true
    spaceComplexity?: true
    spaceScore?: true
    originalityScore?: true
    relevanceScore?: true
    submittedAt?: true
  }

  export type SubmissionMaxAggregateInputType = {
    id?: true
    matchId?: true
    userId?: true
    questionId?: true
    code?: true
    language?: true
    charCount?: true
    stdout?: true
    stderr?: true
    exitCode?: true
    execTimeMs?: true
    testsPassed?: true
    testsTotal?: true
    timeComplexity?: true
    timeScore?: true
    spaceComplexity?: true
    spaceScore?: true
    originalityScore?: true
    relevanceScore?: true
    submittedAt?: true
  }

  export type SubmissionCountAggregateInputType = {
    id?: true
    matchId?: true
    userId?: true
    questionId?: true
    code?: true
    language?: true
    charCount?: true
    stdout?: true
    stderr?: true
    exitCode?: true
    execTimeMs?: true
    testsPassed?: true
    testsTotal?: true
    timeComplexity?: true
    timeScore?: true
    spaceComplexity?: true
    spaceScore?: true
    originalityScore?: true
    relevanceScore?: true
    submittedAt?: true
    _all?: true
  }

  export type SubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submission to aggregate.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Submissions
    **/
    _count?: true | SubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubmissionMaxAggregateInputType
  }

  export type GetSubmissionAggregateType<T extends SubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubmission[P]>
      : GetScalarType<T[P], AggregateSubmission[P]>
  }




  export type SubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithAggregationInput | SubmissionOrderByWithAggregationInput[]
    by: SubmissionScalarFieldEnum[] | SubmissionScalarFieldEnum
    having?: SubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubmissionCountAggregateInputType | true
    _avg?: SubmissionAvgAggregateInputType
    _sum?: SubmissionSumAggregateInputType
    _min?: SubmissionMinAggregateInputType
    _max?: SubmissionMaxAggregateInputType
  }

  export type SubmissionGroupByOutputType = {
    id: string
    matchId: string
    userId: string
    questionId: string
    code: string
    language: string
    charCount: number | null
    stdout: string | null
    stderr: string | null
    exitCode: number | null
    execTimeMs: number | null
    testsPassed: number
    testsTotal: number
    timeComplexity: string | null
    timeScore: number | null
    spaceComplexity: string | null
    spaceScore: number | null
    originalityScore: number | null
    relevanceScore: number | null
    submittedAt: Date
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  type GetSubmissionGroupByPayload<T extends SubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
        }
      >
    >


  export type SubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    userId?: boolean
    questionId?: boolean
    code?: boolean
    language?: boolean
    charCount?: boolean
    stdout?: boolean
    stderr?: boolean
    exitCode?: boolean
    execTimeMs?: boolean
    testsPassed?: boolean
    testsTotal?: boolean
    timeComplexity?: boolean
    timeScore?: boolean
    spaceComplexity?: boolean
    spaceScore?: boolean
    originalityScore?: boolean
    relevanceScore?: boolean
    submittedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    userId?: boolean
    questionId?: boolean
    code?: boolean
    language?: boolean
    charCount?: boolean
    stdout?: boolean
    stderr?: boolean
    exitCode?: boolean
    execTimeMs?: boolean
    testsPassed?: boolean
    testsTotal?: boolean
    timeComplexity?: boolean
    timeScore?: boolean
    spaceComplexity?: boolean
    spaceScore?: boolean
    originalityScore?: boolean
    relevanceScore?: boolean
    submittedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    userId?: boolean
    questionId?: boolean
    code?: boolean
    language?: boolean
    charCount?: boolean
    stdout?: boolean
    stderr?: boolean
    exitCode?: boolean
    execTimeMs?: boolean
    testsPassed?: boolean
    testsTotal?: boolean
    timeComplexity?: boolean
    timeScore?: boolean
    spaceComplexity?: boolean
    spaceScore?: boolean
    originalityScore?: boolean
    relevanceScore?: boolean
    submittedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectScalar = {
    id?: boolean
    matchId?: boolean
    userId?: boolean
    questionId?: boolean
    code?: boolean
    language?: boolean
    charCount?: boolean
    stdout?: boolean
    stderr?: boolean
    exitCode?: boolean
    execTimeMs?: boolean
    testsPassed?: boolean
    testsTotal?: boolean
    timeComplexity?: boolean
    timeScore?: boolean
    spaceComplexity?: boolean
    spaceScore?: boolean
    originalityScore?: boolean
    relevanceScore?: boolean
    submittedAt?: boolean
  }

  export type SubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "matchId" | "userId" | "questionId" | "code" | "language" | "charCount" | "stdout" | "stderr" | "exitCode" | "execTimeMs" | "testsPassed" | "testsTotal" | "timeComplexity" | "timeScore" | "spaceComplexity" | "spaceScore" | "originalityScore" | "relevanceScore" | "submittedAt", ExtArgs["result"]["submission"]>
  export type SubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }
  export type SubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }
  export type SubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }

  export type $SubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Submission"
    objects: {
      match: Prisma.$MatchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      matchId: string
      userId: string
      questionId: string
      code: string
      language: string
      charCount: number | null
      stdout: string | null
      stderr: string | null
      exitCode: number | null
      execTimeMs: number | null
      testsPassed: number
      testsTotal: number
      timeComplexity: string | null
      timeScore: number | null
      spaceComplexity: string | null
      spaceScore: number | null
      originalityScore: number | null
      relevanceScore: number | null
      submittedAt: Date
    }, ExtArgs["result"]["submission"]>
    composites: {}
  }

  type SubmissionGetPayload<S extends boolean | null | undefined | SubmissionDefaultArgs> = $Result.GetResult<Prisma.$SubmissionPayload, S>

  type SubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubmissionCountAggregateInputType | true
    }

  export interface SubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Submission'], meta: { name: 'Submission' } }
    /**
     * Find zero or one Submission that matches the filter.
     * @param {SubmissionFindUniqueArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubmissionFindUniqueArgs>(args: SelectSubset<T, SubmissionFindUniqueArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Submission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubmissionFindUniqueOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubmissionFindFirstArgs>(args?: SelectSubset<T, SubmissionFindFirstArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Submissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Submissions
     * const submissions = await prisma.submission.findMany()
     * 
     * // Get first 10 Submissions
     * const submissions = await prisma.submission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const submissionWithIdOnly = await prisma.submission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubmissionFindManyArgs>(args?: SelectSubset<T, SubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Submission.
     * @param {SubmissionCreateArgs} args - Arguments to create a Submission.
     * @example
     * // Create one Submission
     * const Submission = await prisma.submission.create({
     *   data: {
     *     // ... data to create a Submission
     *   }
     * })
     * 
     */
    create<T extends SubmissionCreateArgs>(args: SelectSubset<T, SubmissionCreateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Submissions.
     * @param {SubmissionCreateManyArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubmissionCreateManyArgs>(args?: SelectSubset<T, SubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Submissions and returns the data saved in the database.
     * @param {SubmissionCreateManyAndReturnArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Submission.
     * @param {SubmissionDeleteArgs} args - Arguments to delete one Submission.
     * @example
     * // Delete one Submission
     * const Submission = await prisma.submission.delete({
     *   where: {
     *     // ... filter to delete one Submission
     *   }
     * })
     * 
     */
    delete<T extends SubmissionDeleteArgs>(args: SelectSubset<T, SubmissionDeleteArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Submission.
     * @param {SubmissionUpdateArgs} args - Arguments to update one Submission.
     * @example
     * // Update one Submission
     * const submission = await prisma.submission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubmissionUpdateArgs>(args: SelectSubset<T, SubmissionUpdateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Submissions.
     * @param {SubmissionDeleteManyArgs} args - Arguments to filter Submissions to delete.
     * @example
     * // Delete a few Submissions
     * const { count } = await prisma.submission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubmissionDeleteManyArgs>(args?: SelectSubset<T, SubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubmissionUpdateManyArgs>(args: SelectSubset<T, SubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions and returns the data updated in the database.
     * @param {SubmissionUpdateManyAndReturnArgs} args - Arguments to update many Submissions.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Submission.
     * @param {SubmissionUpsertArgs} args - Arguments to update or create a Submission.
     * @example
     * // Update or create a Submission
     * const submission = await prisma.submission.upsert({
     *   create: {
     *     // ... data to create a Submission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Submission we want to update
     *   }
     * })
     */
    upsert<T extends SubmissionUpsertArgs>(args: SelectSubset<T, SubmissionUpsertArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionCountArgs} args - Arguments to filter Submissions to count.
     * @example
     * // Count the number of Submissions
     * const count = await prisma.submission.count({
     *   where: {
     *     // ... the filter for the Submissions we want to count
     *   }
     * })
    **/
    count<T extends SubmissionCountArgs>(
      args?: Subset<T, SubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubmissionAggregateArgs>(args: Subset<T, SubmissionAggregateArgs>): Prisma.PrismaPromise<GetSubmissionAggregateType<T>>

    /**
     * Group by Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubmissionGroupByArgs['orderBy'] }
        : { orderBy?: SubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Submission model
   */
  readonly fields: SubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Submission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    match<T extends MatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MatchDefaultArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Submission model
   */
  interface SubmissionFieldRefs {
    readonly id: FieldRef<"Submission", 'String'>
    readonly matchId: FieldRef<"Submission", 'String'>
    readonly userId: FieldRef<"Submission", 'String'>
    readonly questionId: FieldRef<"Submission", 'String'>
    readonly code: FieldRef<"Submission", 'String'>
    readonly language: FieldRef<"Submission", 'String'>
    readonly charCount: FieldRef<"Submission", 'Int'>
    readonly stdout: FieldRef<"Submission", 'String'>
    readonly stderr: FieldRef<"Submission", 'String'>
    readonly exitCode: FieldRef<"Submission", 'Int'>
    readonly execTimeMs: FieldRef<"Submission", 'Int'>
    readonly testsPassed: FieldRef<"Submission", 'Int'>
    readonly testsTotal: FieldRef<"Submission", 'Int'>
    readonly timeComplexity: FieldRef<"Submission", 'String'>
    readonly timeScore: FieldRef<"Submission", 'Float'>
    readonly spaceComplexity: FieldRef<"Submission", 'String'>
    readonly spaceScore: FieldRef<"Submission", 'Float'>
    readonly originalityScore: FieldRef<"Submission", 'Float'>
    readonly relevanceScore: FieldRef<"Submission", 'Float'>
    readonly submittedAt: FieldRef<"Submission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Submission findUnique
   */
  export type SubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findUniqueOrThrow
   */
  export type SubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findFirst
   */
  export type SubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findFirstOrThrow
   */
  export type SubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findMany
   */
  export type SubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submissions to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission create
   */
  export type SubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Submission.
     */
    data: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
  }

  /**
   * Submission createMany
   */
  export type SubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Submission createManyAndReturn
   */
  export type SubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission update
   */
  export type SubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Submission.
     */
    data: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
    /**
     * Choose, which Submission to update.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission updateMany
   */
  export type SubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
  }

  /**
   * Submission updateManyAndReturn
   */
  export type SubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission upsert
   */
  export type SubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Submission to update in case it exists.
     */
    where: SubmissionWhereUniqueInput
    /**
     * In case the Submission found by the `where` argument doesn't exist, create a new Submission with this data.
     */
    create: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
    /**
     * In case the Submission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
  }

  /**
   * Submission delete
   */
  export type SubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter which Submission to delete.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission deleteMany
   */
  export type SubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submissions to delete
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to delete.
     */
    limit?: number
  }

  /**
   * Submission without action
   */
  export type SubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    passwordHash: 'passwordHash',
    displayName: 'displayName',
    avatarUrl: 'avatarUrl',
    title: 'title',
    skillTier: 'skillTier',
    elo: 'elo',
    totalWins: 'totalWins',
    totalMatches: 'totalMatches',
    totalXP: 'totalXP',
    streak: 'streak',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const QueueEntryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    joinedAt: 'joinedAt',
    active: 'active'
  };

  export type QueueEntryScalarFieldEnum = (typeof QueueEntryScalarFieldEnum)[keyof typeof QueueEntryScalarFieldEnum]


  export const MatchScalarFieldEnum: {
    id: 'id',
    maxPlayers: 'maxPlayers',
    status: 'status',
    mode: 'mode',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    createdAt: 'createdAt',
    threadTimeComplexity: 'threadTimeComplexity',
    threadSpaceComplexity: 'threadSpaceComplexity',
    threadOriginality: 'threadOriginality',
    threadRanking: 'threadRanking'
  };

  export type MatchScalarFieldEnum = (typeof MatchScalarFieldEnum)[keyof typeof MatchScalarFieldEnum]


  export const MatchPlayerScalarFieldEnum: {
    id: 'id',
    matchId: 'matchId',
    userId: 'userId',
    rank: 'rank',
    score: 'score',
    result: 'result',
    xpDelta: 'xpDelta',
    joinedAt: 'joinedAt'
  };

  export type MatchPlayerScalarFieldEnum = (typeof MatchPlayerScalarFieldEnum)[keyof typeof MatchPlayerScalarFieldEnum]


  export const QuestionScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    difficulty: 'difficulty',
    mode: 'mode',
    brokenCode: 'brokenCode',
    brokenLanguage: 'brokenLanguage',
    expectedOutput: 'expectedOutput',
    testCases: 'testCases',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum]


  export const MatchQuestionScalarFieldEnum: {
    id: 'id',
    matchId: 'matchId',
    questionId: 'questionId',
    order: 'order'
  };

  export type MatchQuestionScalarFieldEnum = (typeof MatchQuestionScalarFieldEnum)[keyof typeof MatchQuestionScalarFieldEnum]


  export const SubmissionScalarFieldEnum: {
    id: 'id',
    matchId: 'matchId',
    userId: 'userId',
    questionId: 'questionId',
    code: 'code',
    language: 'language',
    charCount: 'charCount',
    stdout: 'stdout',
    stderr: 'stderr',
    exitCode: 'exitCode',
    execTimeMs: 'execTimeMs',
    testsPassed: 'testsPassed',
    testsTotal: 'testsTotal',
    timeComplexity: 'timeComplexity',
    timeScore: 'timeScore',
    spaceComplexity: 'spaceComplexity',
    spaceScore: 'spaceScore',
    originalityScore: 'originalityScore',
    relevanceScore: 'relevanceScore',
    submittedAt: 'submittedAt'
  };

  export type SubmissionScalarFieldEnum = (typeof SubmissionScalarFieldEnum)[keyof typeof SubmissionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'SkillTier'
   */
  export type EnumSkillTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SkillTier'>
    


  /**
   * Reference to a field of type 'SkillTier[]'
   */
  export type ListEnumSkillTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SkillTier[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'MatchStatus'
   */
  export type EnumMatchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MatchStatus'>
    


  /**
   * Reference to a field of type 'MatchStatus[]'
   */
  export type ListEnumMatchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MatchStatus[]'>
    


  /**
   * Reference to a field of type 'GameMode'
   */
  export type EnumGameModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GameMode'>
    


  /**
   * Reference to a field of type 'GameMode[]'
   */
  export type ListEnumGameModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GameMode[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'MatchOutcome'
   */
  export type EnumMatchOutcomeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MatchOutcome'>
    


  /**
   * Reference to a field of type 'MatchOutcome[]'
   */
  export type ListEnumMatchOutcomeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MatchOutcome[]'>
    


  /**
   * Reference to a field of type 'Difficulty'
   */
  export type EnumDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Difficulty'>
    


  /**
   * Reference to a field of type 'Difficulty[]'
   */
  export type ListEnumDifficultyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Difficulty[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    displayName?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    title?: StringFilter<"User"> | string
    skillTier?: EnumSkillTierFilter<"User"> | $Enums.SkillTier
    elo?: IntFilter<"User"> | number
    totalWins?: IntFilter<"User"> | number
    totalMatches?: IntFilter<"User"> | number
    totalXP?: IntFilter<"User"> | number
    streak?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    matchPlayers?: MatchPlayerListRelationFilter
    queueEntries?: QueueEntryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    title?: SortOrder
    skillTier?: SortOrder
    elo?: SortOrder
    totalWins?: SortOrder
    totalMatches?: SortOrder
    totalXP?: SortOrder
    streak?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    matchPlayers?: MatchPlayerOrderByRelationAggregateInput
    queueEntries?: QueueEntryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    displayName?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    title?: StringFilter<"User"> | string
    skillTier?: EnumSkillTierFilter<"User"> | $Enums.SkillTier
    elo?: IntFilter<"User"> | number
    totalWins?: IntFilter<"User"> | number
    totalMatches?: IntFilter<"User"> | number
    totalXP?: IntFilter<"User"> | number
    streak?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    matchPlayers?: MatchPlayerListRelationFilter
    queueEntries?: QueueEntryListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    title?: SortOrder
    skillTier?: SortOrder
    elo?: SortOrder
    totalWins?: SortOrder
    totalMatches?: SortOrder
    totalXP?: SortOrder
    streak?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    displayName?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    title?: StringWithAggregatesFilter<"User"> | string
    skillTier?: EnumSkillTierWithAggregatesFilter<"User"> | $Enums.SkillTier
    elo?: IntWithAggregatesFilter<"User"> | number
    totalWins?: IntWithAggregatesFilter<"User"> | number
    totalMatches?: IntWithAggregatesFilter<"User"> | number
    totalXP?: IntWithAggregatesFilter<"User"> | number
    streak?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type QueueEntryWhereInput = {
    AND?: QueueEntryWhereInput | QueueEntryWhereInput[]
    OR?: QueueEntryWhereInput[]
    NOT?: QueueEntryWhereInput | QueueEntryWhereInput[]
    id?: StringFilter<"QueueEntry"> | string
    userId?: StringFilter<"QueueEntry"> | string
    joinedAt?: DateTimeFilter<"QueueEntry"> | Date | string
    active?: BoolFilter<"QueueEntry"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type QueueEntryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
    active?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type QueueEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_active?: QueueEntryUserIdActiveCompoundUniqueInput
    AND?: QueueEntryWhereInput | QueueEntryWhereInput[]
    OR?: QueueEntryWhereInput[]
    NOT?: QueueEntryWhereInput | QueueEntryWhereInput[]
    userId?: StringFilter<"QueueEntry"> | string
    joinedAt?: DateTimeFilter<"QueueEntry"> | Date | string
    active?: BoolFilter<"QueueEntry"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_active">

  export type QueueEntryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
    active?: SortOrder
    _count?: QueueEntryCountOrderByAggregateInput
    _max?: QueueEntryMaxOrderByAggregateInput
    _min?: QueueEntryMinOrderByAggregateInput
  }

  export type QueueEntryScalarWhereWithAggregatesInput = {
    AND?: QueueEntryScalarWhereWithAggregatesInput | QueueEntryScalarWhereWithAggregatesInput[]
    OR?: QueueEntryScalarWhereWithAggregatesInput[]
    NOT?: QueueEntryScalarWhereWithAggregatesInput | QueueEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QueueEntry"> | string
    userId?: StringWithAggregatesFilter<"QueueEntry"> | string
    joinedAt?: DateTimeWithAggregatesFilter<"QueueEntry"> | Date | string
    active?: BoolWithAggregatesFilter<"QueueEntry"> | boolean
  }

  export type MatchWhereInput = {
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    id?: StringFilter<"Match"> | string
    maxPlayers?: IntFilter<"Match"> | number
    status?: EnumMatchStatusFilter<"Match"> | $Enums.MatchStatus
    mode?: EnumGameModeFilter<"Match"> | $Enums.GameMode
    startedAt?: DateTimeNullableFilter<"Match"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"Match"> | Date | string | null
    createdAt?: DateTimeFilter<"Match"> | Date | string
    threadTimeComplexity?: StringNullableFilter<"Match"> | string | null
    threadSpaceComplexity?: StringNullableFilter<"Match"> | string | null
    threadOriginality?: StringNullableFilter<"Match"> | string | null
    threadRanking?: StringNullableFilter<"Match"> | string | null
    players?: MatchPlayerListRelationFilter
    questions?: MatchQuestionListRelationFilter
    submissions?: SubmissionListRelationFilter
  }

  export type MatchOrderByWithRelationInput = {
    id?: SortOrder
    maxPlayers?: SortOrder
    status?: SortOrder
    mode?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    threadTimeComplexity?: SortOrderInput | SortOrder
    threadSpaceComplexity?: SortOrderInput | SortOrder
    threadOriginality?: SortOrderInput | SortOrder
    threadRanking?: SortOrderInput | SortOrder
    players?: MatchPlayerOrderByRelationAggregateInput
    questions?: MatchQuestionOrderByRelationAggregateInput
    submissions?: SubmissionOrderByRelationAggregateInput
  }

  export type MatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    maxPlayers?: IntFilter<"Match"> | number
    status?: EnumMatchStatusFilter<"Match"> | $Enums.MatchStatus
    mode?: EnumGameModeFilter<"Match"> | $Enums.GameMode
    startedAt?: DateTimeNullableFilter<"Match"> | Date | string | null
    endedAt?: DateTimeNullableFilter<"Match"> | Date | string | null
    createdAt?: DateTimeFilter<"Match"> | Date | string
    threadTimeComplexity?: StringNullableFilter<"Match"> | string | null
    threadSpaceComplexity?: StringNullableFilter<"Match"> | string | null
    threadOriginality?: StringNullableFilter<"Match"> | string | null
    threadRanking?: StringNullableFilter<"Match"> | string | null
    players?: MatchPlayerListRelationFilter
    questions?: MatchQuestionListRelationFilter
    submissions?: SubmissionListRelationFilter
  }, "id">

  export type MatchOrderByWithAggregationInput = {
    id?: SortOrder
    maxPlayers?: SortOrder
    status?: SortOrder
    mode?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    endedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    threadTimeComplexity?: SortOrderInput | SortOrder
    threadSpaceComplexity?: SortOrderInput | SortOrder
    threadOriginality?: SortOrderInput | SortOrder
    threadRanking?: SortOrderInput | SortOrder
    _count?: MatchCountOrderByAggregateInput
    _avg?: MatchAvgOrderByAggregateInput
    _max?: MatchMaxOrderByAggregateInput
    _min?: MatchMinOrderByAggregateInput
    _sum?: MatchSumOrderByAggregateInput
  }

  export type MatchScalarWhereWithAggregatesInput = {
    AND?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    OR?: MatchScalarWhereWithAggregatesInput[]
    NOT?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Match"> | string
    maxPlayers?: IntWithAggregatesFilter<"Match"> | number
    status?: EnumMatchStatusWithAggregatesFilter<"Match"> | $Enums.MatchStatus
    mode?: EnumGameModeWithAggregatesFilter<"Match"> | $Enums.GameMode
    startedAt?: DateTimeNullableWithAggregatesFilter<"Match"> | Date | string | null
    endedAt?: DateTimeNullableWithAggregatesFilter<"Match"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Match"> | Date | string
    threadTimeComplexity?: StringNullableWithAggregatesFilter<"Match"> | string | null
    threadSpaceComplexity?: StringNullableWithAggregatesFilter<"Match"> | string | null
    threadOriginality?: StringNullableWithAggregatesFilter<"Match"> | string | null
    threadRanking?: StringNullableWithAggregatesFilter<"Match"> | string | null
  }

  export type MatchPlayerWhereInput = {
    AND?: MatchPlayerWhereInput | MatchPlayerWhereInput[]
    OR?: MatchPlayerWhereInput[]
    NOT?: MatchPlayerWhereInput | MatchPlayerWhereInput[]
    id?: StringFilter<"MatchPlayer"> | string
    matchId?: StringFilter<"MatchPlayer"> | string
    userId?: StringFilter<"MatchPlayer"> | string
    rank?: IntNullableFilter<"MatchPlayer"> | number | null
    score?: FloatNullableFilter<"MatchPlayer"> | number | null
    result?: EnumMatchOutcomeNullableFilter<"MatchPlayer"> | $Enums.MatchOutcome | null
    xpDelta?: IntFilter<"MatchPlayer"> | number
    joinedAt?: DateTimeFilter<"MatchPlayer"> | Date | string
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MatchPlayerOrderByWithRelationInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    rank?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    xpDelta?: SortOrder
    joinedAt?: SortOrder
    match?: MatchOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type MatchPlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    matchId_userId?: MatchPlayerMatchIdUserIdCompoundUniqueInput
    AND?: MatchPlayerWhereInput | MatchPlayerWhereInput[]
    OR?: MatchPlayerWhereInput[]
    NOT?: MatchPlayerWhereInput | MatchPlayerWhereInput[]
    matchId?: StringFilter<"MatchPlayer"> | string
    userId?: StringFilter<"MatchPlayer"> | string
    rank?: IntNullableFilter<"MatchPlayer"> | number | null
    score?: FloatNullableFilter<"MatchPlayer"> | number | null
    result?: EnumMatchOutcomeNullableFilter<"MatchPlayer"> | $Enums.MatchOutcome | null
    xpDelta?: IntFilter<"MatchPlayer"> | number
    joinedAt?: DateTimeFilter<"MatchPlayer"> | Date | string
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "matchId_userId">

  export type MatchPlayerOrderByWithAggregationInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    rank?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    xpDelta?: SortOrder
    joinedAt?: SortOrder
    _count?: MatchPlayerCountOrderByAggregateInput
    _avg?: MatchPlayerAvgOrderByAggregateInput
    _max?: MatchPlayerMaxOrderByAggregateInput
    _min?: MatchPlayerMinOrderByAggregateInput
    _sum?: MatchPlayerSumOrderByAggregateInput
  }

  export type MatchPlayerScalarWhereWithAggregatesInput = {
    AND?: MatchPlayerScalarWhereWithAggregatesInput | MatchPlayerScalarWhereWithAggregatesInput[]
    OR?: MatchPlayerScalarWhereWithAggregatesInput[]
    NOT?: MatchPlayerScalarWhereWithAggregatesInput | MatchPlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MatchPlayer"> | string
    matchId?: StringWithAggregatesFilter<"MatchPlayer"> | string
    userId?: StringWithAggregatesFilter<"MatchPlayer"> | string
    rank?: IntNullableWithAggregatesFilter<"MatchPlayer"> | number | null
    score?: FloatNullableWithAggregatesFilter<"MatchPlayer"> | number | null
    result?: EnumMatchOutcomeNullableWithAggregatesFilter<"MatchPlayer"> | $Enums.MatchOutcome | null
    xpDelta?: IntWithAggregatesFilter<"MatchPlayer"> | number
    joinedAt?: DateTimeWithAggregatesFilter<"MatchPlayer"> | Date | string
  }

  export type QuestionWhereInput = {
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    id?: StringFilter<"Question"> | string
    title?: StringFilter<"Question"> | string
    description?: StringFilter<"Question"> | string
    difficulty?: EnumDifficultyFilter<"Question"> | $Enums.Difficulty
    mode?: EnumGameModeFilter<"Question"> | $Enums.GameMode
    brokenCode?: StringNullableFilter<"Question"> | string | null
    brokenLanguage?: StringNullableFilter<"Question"> | string | null
    expectedOutput?: StringNullableFilter<"Question"> | string | null
    testCases?: JsonNullableFilter<"Question">
    createdAt?: DateTimeFilter<"Question"> | Date | string
    updatedAt?: DateTimeFilter<"Question"> | Date | string
    matchQuestions?: MatchQuestionListRelationFilter
  }

  export type QuestionOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    mode?: SortOrder
    brokenCode?: SortOrderInput | SortOrder
    brokenLanguage?: SortOrderInput | SortOrder
    expectedOutput?: SortOrderInput | SortOrder
    testCases?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    matchQuestions?: MatchQuestionOrderByRelationAggregateInput
  }

  export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    title?: StringFilter<"Question"> | string
    description?: StringFilter<"Question"> | string
    difficulty?: EnumDifficultyFilter<"Question"> | $Enums.Difficulty
    mode?: EnumGameModeFilter<"Question"> | $Enums.GameMode
    brokenCode?: StringNullableFilter<"Question"> | string | null
    brokenLanguage?: StringNullableFilter<"Question"> | string | null
    expectedOutput?: StringNullableFilter<"Question"> | string | null
    testCases?: JsonNullableFilter<"Question">
    createdAt?: DateTimeFilter<"Question"> | Date | string
    updatedAt?: DateTimeFilter<"Question"> | Date | string
    matchQuestions?: MatchQuestionListRelationFilter
  }, "id">

  export type QuestionOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    mode?: SortOrder
    brokenCode?: SortOrderInput | SortOrder
    brokenLanguage?: SortOrderInput | SortOrder
    expectedOutput?: SortOrderInput | SortOrder
    testCases?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QuestionCountOrderByAggregateInput
    _max?: QuestionMaxOrderByAggregateInput
    _min?: QuestionMinOrderByAggregateInput
  }

  export type QuestionScalarWhereWithAggregatesInput = {
    AND?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    OR?: QuestionScalarWhereWithAggregatesInput[]
    NOT?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Question"> | string
    title?: StringWithAggregatesFilter<"Question"> | string
    description?: StringWithAggregatesFilter<"Question"> | string
    difficulty?: EnumDifficultyWithAggregatesFilter<"Question"> | $Enums.Difficulty
    mode?: EnumGameModeWithAggregatesFilter<"Question"> | $Enums.GameMode
    brokenCode?: StringNullableWithAggregatesFilter<"Question"> | string | null
    brokenLanguage?: StringNullableWithAggregatesFilter<"Question"> | string | null
    expectedOutput?: StringNullableWithAggregatesFilter<"Question"> | string | null
    testCases?: JsonNullableWithAggregatesFilter<"Question">
    createdAt?: DateTimeWithAggregatesFilter<"Question"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Question"> | Date | string
  }

  export type MatchQuestionWhereInput = {
    AND?: MatchQuestionWhereInput | MatchQuestionWhereInput[]
    OR?: MatchQuestionWhereInput[]
    NOT?: MatchQuestionWhereInput | MatchQuestionWhereInput[]
    id?: StringFilter<"MatchQuestion"> | string
    matchId?: StringFilter<"MatchQuestion"> | string
    questionId?: StringFilter<"MatchQuestion"> | string
    order?: IntFilter<"MatchQuestion"> | number
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
  }

  export type MatchQuestionOrderByWithRelationInput = {
    id?: SortOrder
    matchId?: SortOrder
    questionId?: SortOrder
    order?: SortOrder
    match?: MatchOrderByWithRelationInput
    question?: QuestionOrderByWithRelationInput
  }

  export type MatchQuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    matchId_questionId?: MatchQuestionMatchIdQuestionIdCompoundUniqueInput
    AND?: MatchQuestionWhereInput | MatchQuestionWhereInput[]
    OR?: MatchQuestionWhereInput[]
    NOT?: MatchQuestionWhereInput | MatchQuestionWhereInput[]
    matchId?: StringFilter<"MatchQuestion"> | string
    questionId?: StringFilter<"MatchQuestion"> | string
    order?: IntFilter<"MatchQuestion"> | number
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
  }, "id" | "matchId_questionId">

  export type MatchQuestionOrderByWithAggregationInput = {
    id?: SortOrder
    matchId?: SortOrder
    questionId?: SortOrder
    order?: SortOrder
    _count?: MatchQuestionCountOrderByAggregateInput
    _avg?: MatchQuestionAvgOrderByAggregateInput
    _max?: MatchQuestionMaxOrderByAggregateInput
    _min?: MatchQuestionMinOrderByAggregateInput
    _sum?: MatchQuestionSumOrderByAggregateInput
  }

  export type MatchQuestionScalarWhereWithAggregatesInput = {
    AND?: MatchQuestionScalarWhereWithAggregatesInput | MatchQuestionScalarWhereWithAggregatesInput[]
    OR?: MatchQuestionScalarWhereWithAggregatesInput[]
    NOT?: MatchQuestionScalarWhereWithAggregatesInput | MatchQuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MatchQuestion"> | string
    matchId?: StringWithAggregatesFilter<"MatchQuestion"> | string
    questionId?: StringWithAggregatesFilter<"MatchQuestion"> | string
    order?: IntWithAggregatesFilter<"MatchQuestion"> | number
  }

  export type SubmissionWhereInput = {
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    id?: StringFilter<"Submission"> | string
    matchId?: StringFilter<"Submission"> | string
    userId?: StringFilter<"Submission"> | string
    questionId?: StringFilter<"Submission"> | string
    code?: StringFilter<"Submission"> | string
    language?: StringFilter<"Submission"> | string
    charCount?: IntNullableFilter<"Submission"> | number | null
    stdout?: StringNullableFilter<"Submission"> | string | null
    stderr?: StringNullableFilter<"Submission"> | string | null
    exitCode?: IntNullableFilter<"Submission"> | number | null
    execTimeMs?: IntNullableFilter<"Submission"> | number | null
    testsPassed?: IntFilter<"Submission"> | number
    testsTotal?: IntFilter<"Submission"> | number
    timeComplexity?: StringNullableFilter<"Submission"> | string | null
    timeScore?: FloatNullableFilter<"Submission"> | number | null
    spaceComplexity?: StringNullableFilter<"Submission"> | string | null
    spaceScore?: FloatNullableFilter<"Submission"> | number | null
    originalityScore?: FloatNullableFilter<"Submission"> | number | null
    relevanceScore?: FloatNullableFilter<"Submission"> | number | null
    submittedAt?: DateTimeFilter<"Submission"> | Date | string
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
  }

  export type SubmissionOrderByWithRelationInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    questionId?: SortOrder
    code?: SortOrder
    language?: SortOrder
    charCount?: SortOrderInput | SortOrder
    stdout?: SortOrderInput | SortOrder
    stderr?: SortOrderInput | SortOrder
    exitCode?: SortOrderInput | SortOrder
    execTimeMs?: SortOrderInput | SortOrder
    testsPassed?: SortOrder
    testsTotal?: SortOrder
    timeComplexity?: SortOrderInput | SortOrder
    timeScore?: SortOrderInput | SortOrder
    spaceComplexity?: SortOrderInput | SortOrder
    spaceScore?: SortOrderInput | SortOrder
    originalityScore?: SortOrderInput | SortOrder
    relevanceScore?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    match?: MatchOrderByWithRelationInput
  }

  export type SubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    matchId?: StringFilter<"Submission"> | string
    userId?: StringFilter<"Submission"> | string
    questionId?: StringFilter<"Submission"> | string
    code?: StringFilter<"Submission"> | string
    language?: StringFilter<"Submission"> | string
    charCount?: IntNullableFilter<"Submission"> | number | null
    stdout?: StringNullableFilter<"Submission"> | string | null
    stderr?: StringNullableFilter<"Submission"> | string | null
    exitCode?: IntNullableFilter<"Submission"> | number | null
    execTimeMs?: IntNullableFilter<"Submission"> | number | null
    testsPassed?: IntFilter<"Submission"> | number
    testsTotal?: IntFilter<"Submission"> | number
    timeComplexity?: StringNullableFilter<"Submission"> | string | null
    timeScore?: FloatNullableFilter<"Submission"> | number | null
    spaceComplexity?: StringNullableFilter<"Submission"> | string | null
    spaceScore?: FloatNullableFilter<"Submission"> | number | null
    originalityScore?: FloatNullableFilter<"Submission"> | number | null
    relevanceScore?: FloatNullableFilter<"Submission"> | number | null
    submittedAt?: DateTimeFilter<"Submission"> | Date | string
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
  }, "id">

  export type SubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    questionId?: SortOrder
    code?: SortOrder
    language?: SortOrder
    charCount?: SortOrderInput | SortOrder
    stdout?: SortOrderInput | SortOrder
    stderr?: SortOrderInput | SortOrder
    exitCode?: SortOrderInput | SortOrder
    execTimeMs?: SortOrderInput | SortOrder
    testsPassed?: SortOrder
    testsTotal?: SortOrder
    timeComplexity?: SortOrderInput | SortOrder
    timeScore?: SortOrderInput | SortOrder
    spaceComplexity?: SortOrderInput | SortOrder
    spaceScore?: SortOrderInput | SortOrder
    originalityScore?: SortOrderInput | SortOrder
    relevanceScore?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    _count?: SubmissionCountOrderByAggregateInput
    _avg?: SubmissionAvgOrderByAggregateInput
    _max?: SubmissionMaxOrderByAggregateInput
    _min?: SubmissionMinOrderByAggregateInput
    _sum?: SubmissionSumOrderByAggregateInput
  }

  export type SubmissionScalarWhereWithAggregatesInput = {
    AND?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    OR?: SubmissionScalarWhereWithAggregatesInput[]
    NOT?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Submission"> | string
    matchId?: StringWithAggregatesFilter<"Submission"> | string
    userId?: StringWithAggregatesFilter<"Submission"> | string
    questionId?: StringWithAggregatesFilter<"Submission"> | string
    code?: StringWithAggregatesFilter<"Submission"> | string
    language?: StringWithAggregatesFilter<"Submission"> | string
    charCount?: IntNullableWithAggregatesFilter<"Submission"> | number | null
    stdout?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    stderr?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    exitCode?: IntNullableWithAggregatesFilter<"Submission"> | number | null
    execTimeMs?: IntNullableWithAggregatesFilter<"Submission"> | number | null
    testsPassed?: IntWithAggregatesFilter<"Submission"> | number
    testsTotal?: IntWithAggregatesFilter<"Submission"> | number
    timeComplexity?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    timeScore?: FloatNullableWithAggregatesFilter<"Submission"> | number | null
    spaceComplexity?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    spaceScore?: FloatNullableWithAggregatesFilter<"Submission"> | number | null
    originalityScore?: FloatNullableWithAggregatesFilter<"Submission"> | number | null
    relevanceScore?: FloatNullableWithAggregatesFilter<"Submission"> | number | null
    submittedAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    displayName?: string | null
    avatarUrl?: string | null
    title?: string
    skillTier?: $Enums.SkillTier
    elo?: number
    totalWins?: number
    totalMatches?: number
    totalXP?: number
    streak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    matchPlayers?: MatchPlayerCreateNestedManyWithoutUserInput
    queueEntries?: QueueEntryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    displayName?: string | null
    avatarUrl?: string | null
    title?: string
    skillTier?: $Enums.SkillTier
    elo?: number
    totalWins?: number
    totalMatches?: number
    totalXP?: number
    streak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    matchPlayers?: MatchPlayerUncheckedCreateNestedManyWithoutUserInput
    queueEntries?: QueueEntryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    skillTier?: EnumSkillTierFieldUpdateOperationsInput | $Enums.SkillTier
    elo?: IntFieldUpdateOperationsInput | number
    totalWins?: IntFieldUpdateOperationsInput | number
    totalMatches?: IntFieldUpdateOperationsInput | number
    totalXP?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchPlayers?: MatchPlayerUpdateManyWithoutUserNestedInput
    queueEntries?: QueueEntryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    skillTier?: EnumSkillTierFieldUpdateOperationsInput | $Enums.SkillTier
    elo?: IntFieldUpdateOperationsInput | number
    totalWins?: IntFieldUpdateOperationsInput | number
    totalMatches?: IntFieldUpdateOperationsInput | number
    totalXP?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchPlayers?: MatchPlayerUncheckedUpdateManyWithoutUserNestedInput
    queueEntries?: QueueEntryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    displayName?: string | null
    avatarUrl?: string | null
    title?: string
    skillTier?: $Enums.SkillTier
    elo?: number
    totalWins?: number
    totalMatches?: number
    totalXP?: number
    streak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    skillTier?: EnumSkillTierFieldUpdateOperationsInput | $Enums.SkillTier
    elo?: IntFieldUpdateOperationsInput | number
    totalWins?: IntFieldUpdateOperationsInput | number
    totalMatches?: IntFieldUpdateOperationsInput | number
    totalXP?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    skillTier?: EnumSkillTierFieldUpdateOperationsInput | $Enums.SkillTier
    elo?: IntFieldUpdateOperationsInput | number
    totalWins?: IntFieldUpdateOperationsInput | number
    totalMatches?: IntFieldUpdateOperationsInput | number
    totalXP?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueEntryCreateInput = {
    id?: string
    joinedAt?: Date | string
    active?: boolean
    user: UserCreateNestedOneWithoutQueueEntriesInput
  }

  export type QueueEntryUncheckedCreateInput = {
    id?: string
    userId: string
    joinedAt?: Date | string
    active?: boolean
  }

  export type QueueEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutQueueEntriesNestedInput
  }

  export type QueueEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QueueEntryCreateManyInput = {
    id?: string
    userId: string
    joinedAt?: Date | string
    active?: boolean
  }

  export type QueueEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QueueEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MatchCreateInput = {
    id?: string
    maxPlayers?: number
    status?: $Enums.MatchStatus
    mode?: $Enums.GameMode
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    threadTimeComplexity?: string | null
    threadSpaceComplexity?: string | null
    threadOriginality?: string | null
    threadRanking?: string | null
    players?: MatchPlayerCreateNestedManyWithoutMatchInput
    questions?: MatchQuestionCreateNestedManyWithoutMatchInput
    submissions?: SubmissionCreateNestedManyWithoutMatchInput
  }

  export type MatchUncheckedCreateInput = {
    id?: string
    maxPlayers?: number
    status?: $Enums.MatchStatus
    mode?: $Enums.GameMode
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    threadTimeComplexity?: string | null
    threadSpaceComplexity?: string | null
    threadOriginality?: string | null
    threadRanking?: string | null
    players?: MatchPlayerUncheckedCreateNestedManyWithoutMatchInput
    questions?: MatchQuestionUncheckedCreateNestedManyWithoutMatchInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutMatchInput
  }

  export type MatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threadTimeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadSpaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadOriginality?: NullableStringFieldUpdateOperationsInput | string | null
    threadRanking?: NullableStringFieldUpdateOperationsInput | string | null
    players?: MatchPlayerUpdateManyWithoutMatchNestedInput
    questions?: MatchQuestionUpdateManyWithoutMatchNestedInput
    submissions?: SubmissionUpdateManyWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threadTimeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadSpaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadOriginality?: NullableStringFieldUpdateOperationsInput | string | null
    threadRanking?: NullableStringFieldUpdateOperationsInput | string | null
    players?: MatchPlayerUncheckedUpdateManyWithoutMatchNestedInput
    questions?: MatchQuestionUncheckedUpdateManyWithoutMatchNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutMatchNestedInput
  }

  export type MatchCreateManyInput = {
    id?: string
    maxPlayers?: number
    status?: $Enums.MatchStatus
    mode?: $Enums.GameMode
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    threadTimeComplexity?: string | null
    threadSpaceComplexity?: string | null
    threadOriginality?: string | null
    threadRanking?: string | null
  }

  export type MatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threadTimeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadSpaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadOriginality?: NullableStringFieldUpdateOperationsInput | string | null
    threadRanking?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threadTimeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadSpaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadOriginality?: NullableStringFieldUpdateOperationsInput | string | null
    threadRanking?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MatchPlayerCreateInput = {
    id?: string
    rank?: number | null
    score?: number | null
    result?: $Enums.MatchOutcome | null
    xpDelta?: number
    joinedAt?: Date | string
    match: MatchCreateNestedOneWithoutPlayersInput
    user: UserCreateNestedOneWithoutMatchPlayersInput
  }

  export type MatchPlayerUncheckedCreateInput = {
    id?: string
    matchId: string
    userId: string
    rank?: number | null
    score?: number | null
    result?: $Enums.MatchOutcome | null
    xpDelta?: number
    joinedAt?: Date | string
  }

  export type MatchPlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    result?: NullableEnumMatchOutcomeFieldUpdateOperationsInput | $Enums.MatchOutcome | null
    xpDelta?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutPlayersNestedInput
    user?: UserUpdateOneRequiredWithoutMatchPlayersNestedInput
  }

  export type MatchPlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    result?: NullableEnumMatchOutcomeFieldUpdateOperationsInput | $Enums.MatchOutcome | null
    xpDelta?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchPlayerCreateManyInput = {
    id?: string
    matchId: string
    userId: string
    rank?: number | null
    score?: number | null
    result?: $Enums.MatchOutcome | null
    xpDelta?: number
    joinedAt?: Date | string
  }

  export type MatchPlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    result?: NullableEnumMatchOutcomeFieldUpdateOperationsInput | $Enums.MatchOutcome | null
    xpDelta?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchPlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    result?: NullableEnumMatchOutcomeFieldUpdateOperationsInput | $Enums.MatchOutcome | null
    xpDelta?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionCreateInput = {
    id?: string
    title: string
    description: string
    difficulty?: $Enums.Difficulty
    mode?: $Enums.GameMode
    brokenCode?: string | null
    brokenLanguage?: string | null
    expectedOutput?: string | null
    testCases?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    matchQuestions?: MatchQuestionCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    difficulty?: $Enums.Difficulty
    mode?: $Enums.GameMode
    brokenCode?: string | null
    brokenLanguage?: string | null
    expectedOutput?: string | null
    testCases?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    matchQuestions?: MatchQuestionUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    brokenCode?: NullableStringFieldUpdateOperationsInput | string | null
    brokenLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    testCases?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchQuestions?: MatchQuestionUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    brokenCode?: NullableStringFieldUpdateOperationsInput | string | null
    brokenLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    testCases?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchQuestions?: MatchQuestionUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionCreateManyInput = {
    id?: string
    title: string
    description: string
    difficulty?: $Enums.Difficulty
    mode?: $Enums.GameMode
    brokenCode?: string | null
    brokenLanguage?: string | null
    expectedOutput?: string | null
    testCases?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    brokenCode?: NullableStringFieldUpdateOperationsInput | string | null
    brokenLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    testCases?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    brokenCode?: NullableStringFieldUpdateOperationsInput | string | null
    brokenLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    testCases?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchQuestionCreateInput = {
    id?: string
    order?: number
    match: MatchCreateNestedOneWithoutQuestionsInput
    question: QuestionCreateNestedOneWithoutMatchQuestionsInput
  }

  export type MatchQuestionUncheckedCreateInput = {
    id?: string
    matchId: string
    questionId: string
    order?: number
  }

  export type MatchQuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    match?: MatchUpdateOneRequiredWithoutQuestionsNestedInput
    question?: QuestionUpdateOneRequiredWithoutMatchQuestionsNestedInput
  }

  export type MatchQuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type MatchQuestionCreateManyInput = {
    id?: string
    matchId: string
    questionId: string
    order?: number
  }

  export type MatchQuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type MatchQuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type SubmissionCreateInput = {
    id?: string
    userId: string
    questionId: string
    code: string
    language: string
    charCount?: number | null
    stdout?: string | null
    stderr?: string | null
    exitCode?: number | null
    execTimeMs?: number | null
    testsPassed?: number
    testsTotal?: number
    timeComplexity?: string | null
    timeScore?: number | null
    spaceComplexity?: string | null
    spaceScore?: number | null
    originalityScore?: number | null
    relevanceScore?: number | null
    submittedAt?: Date | string
    match: MatchCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateInput = {
    id?: string
    matchId: string
    userId: string
    questionId: string
    code: string
    language: string
    charCount?: number | null
    stdout?: string | null
    stderr?: string | null
    exitCode?: number | null
    execTimeMs?: number | null
    testsPassed?: number
    testsTotal?: number
    timeComplexity?: string | null
    timeScore?: number | null
    spaceComplexity?: string | null
    spaceScore?: number | null
    originalityScore?: number | null
    relevanceScore?: number | null
    submittedAt?: Date | string
  }

  export type SubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    charCount?: NullableIntFieldUpdateOperationsInput | number | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    exitCode?: NullableIntFieldUpdateOperationsInput | number | null
    execTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    testsPassed?: IntFieldUpdateOperationsInput | number
    testsTotal?: IntFieldUpdateOperationsInput | number
    timeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    timeScore?: NullableFloatFieldUpdateOperationsInput | number | null
    spaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    spaceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    originalityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    relevanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    charCount?: NullableIntFieldUpdateOperationsInput | number | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    exitCode?: NullableIntFieldUpdateOperationsInput | number | null
    execTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    testsPassed?: IntFieldUpdateOperationsInput | number
    testsTotal?: IntFieldUpdateOperationsInput | number
    timeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    timeScore?: NullableFloatFieldUpdateOperationsInput | number | null
    spaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    spaceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    originalityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    relevanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateManyInput = {
    id?: string
    matchId: string
    userId: string
    questionId: string
    code: string
    language: string
    charCount?: number | null
    stdout?: string | null
    stderr?: string | null
    exitCode?: number | null
    execTimeMs?: number | null
    testsPassed?: number
    testsTotal?: number
    timeComplexity?: string | null
    timeScore?: number | null
    spaceComplexity?: string | null
    spaceScore?: number | null
    originalityScore?: number | null
    relevanceScore?: number | null
    submittedAt?: Date | string
  }

  export type SubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    charCount?: NullableIntFieldUpdateOperationsInput | number | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    exitCode?: NullableIntFieldUpdateOperationsInput | number | null
    execTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    testsPassed?: IntFieldUpdateOperationsInput | number
    testsTotal?: IntFieldUpdateOperationsInput | number
    timeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    timeScore?: NullableFloatFieldUpdateOperationsInput | number | null
    spaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    spaceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    originalityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    relevanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    charCount?: NullableIntFieldUpdateOperationsInput | number | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    exitCode?: NullableIntFieldUpdateOperationsInput | number | null
    execTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    testsPassed?: IntFieldUpdateOperationsInput | number
    testsTotal?: IntFieldUpdateOperationsInput | number
    timeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    timeScore?: NullableFloatFieldUpdateOperationsInput | number | null
    spaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    spaceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    originalityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    relevanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumSkillTierFilter<$PrismaModel = never> = {
    equals?: $Enums.SkillTier | EnumSkillTierFieldRefInput<$PrismaModel>
    in?: $Enums.SkillTier[] | ListEnumSkillTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.SkillTier[] | ListEnumSkillTierFieldRefInput<$PrismaModel>
    not?: NestedEnumSkillTierFilter<$PrismaModel> | $Enums.SkillTier
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MatchPlayerListRelationFilter = {
    every?: MatchPlayerWhereInput
    some?: MatchPlayerWhereInput
    none?: MatchPlayerWhereInput
  }

  export type QueueEntryListRelationFilter = {
    every?: QueueEntryWhereInput
    some?: QueueEntryWhereInput
    none?: QueueEntryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MatchPlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QueueEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    title?: SortOrder
    skillTier?: SortOrder
    elo?: SortOrder
    totalWins?: SortOrder
    totalMatches?: SortOrder
    totalXP?: SortOrder
    streak?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    elo?: SortOrder
    totalWins?: SortOrder
    totalMatches?: SortOrder
    totalXP?: SortOrder
    streak?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    title?: SortOrder
    skillTier?: SortOrder
    elo?: SortOrder
    totalWins?: SortOrder
    totalMatches?: SortOrder
    totalXP?: SortOrder
    streak?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    title?: SortOrder
    skillTier?: SortOrder
    elo?: SortOrder
    totalWins?: SortOrder
    totalMatches?: SortOrder
    totalXP?: SortOrder
    streak?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    elo?: SortOrder
    totalWins?: SortOrder
    totalMatches?: SortOrder
    totalXP?: SortOrder
    streak?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumSkillTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SkillTier | EnumSkillTierFieldRefInput<$PrismaModel>
    in?: $Enums.SkillTier[] | ListEnumSkillTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.SkillTier[] | ListEnumSkillTierFieldRefInput<$PrismaModel>
    not?: NestedEnumSkillTierWithAggregatesFilter<$PrismaModel> | $Enums.SkillTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSkillTierFilter<$PrismaModel>
    _max?: NestedEnumSkillTierFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type QueueEntryUserIdActiveCompoundUniqueInput = {
    userId: string
    active: boolean
  }

  export type QueueEntryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
    active?: SortOrder
  }

  export type QueueEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
    active?: SortOrder
  }

  export type QueueEntryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    joinedAt?: SortOrder
    active?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumMatchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchStatus | EnumMatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMatchStatusFilter<$PrismaModel> | $Enums.MatchStatus
  }

  export type EnumGameModeFilter<$PrismaModel = never> = {
    equals?: $Enums.GameMode | EnumGameModeFieldRefInput<$PrismaModel>
    in?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    not?: NestedEnumGameModeFilter<$PrismaModel> | $Enums.GameMode
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type MatchQuestionListRelationFilter = {
    every?: MatchQuestionWhereInput
    some?: MatchQuestionWhereInput
    none?: MatchQuestionWhereInput
  }

  export type SubmissionListRelationFilter = {
    every?: SubmissionWhereInput
    some?: SubmissionWhereInput
    none?: SubmissionWhereInput
  }

  export type MatchQuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MatchCountOrderByAggregateInput = {
    id?: SortOrder
    maxPlayers?: SortOrder
    status?: SortOrder
    mode?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    threadTimeComplexity?: SortOrder
    threadSpaceComplexity?: SortOrder
    threadOriginality?: SortOrder
    threadRanking?: SortOrder
  }

  export type MatchAvgOrderByAggregateInput = {
    maxPlayers?: SortOrder
  }

  export type MatchMaxOrderByAggregateInput = {
    id?: SortOrder
    maxPlayers?: SortOrder
    status?: SortOrder
    mode?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    threadTimeComplexity?: SortOrder
    threadSpaceComplexity?: SortOrder
    threadOriginality?: SortOrder
    threadRanking?: SortOrder
  }

  export type MatchMinOrderByAggregateInput = {
    id?: SortOrder
    maxPlayers?: SortOrder
    status?: SortOrder
    mode?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
    threadTimeComplexity?: SortOrder
    threadSpaceComplexity?: SortOrder
    threadOriginality?: SortOrder
    threadRanking?: SortOrder
  }

  export type MatchSumOrderByAggregateInput = {
    maxPlayers?: SortOrder
  }

  export type EnumMatchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchStatus | EnumMatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMatchStatusWithAggregatesFilter<$PrismaModel> | $Enums.MatchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMatchStatusFilter<$PrismaModel>
    _max?: NestedEnumMatchStatusFilter<$PrismaModel>
  }

  export type EnumGameModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameMode | EnumGameModeFieldRefInput<$PrismaModel>
    in?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    not?: NestedEnumGameModeWithAggregatesFilter<$PrismaModel> | $Enums.GameMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGameModeFilter<$PrismaModel>
    _max?: NestedEnumGameModeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumMatchOutcomeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchOutcome | EnumMatchOutcomeFieldRefInput<$PrismaModel> | null
    in?: $Enums.MatchOutcome[] | ListEnumMatchOutcomeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MatchOutcome[] | ListEnumMatchOutcomeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMatchOutcomeNullableFilter<$PrismaModel> | $Enums.MatchOutcome | null
  }

  export type MatchScalarRelationFilter = {
    is?: MatchWhereInput
    isNot?: MatchWhereInput
  }

  export type MatchPlayerMatchIdUserIdCompoundUniqueInput = {
    matchId: string
    userId: string
  }

  export type MatchPlayerCountOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    rank?: SortOrder
    score?: SortOrder
    result?: SortOrder
    xpDelta?: SortOrder
    joinedAt?: SortOrder
  }

  export type MatchPlayerAvgOrderByAggregateInput = {
    rank?: SortOrder
    score?: SortOrder
    xpDelta?: SortOrder
  }

  export type MatchPlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    rank?: SortOrder
    score?: SortOrder
    result?: SortOrder
    xpDelta?: SortOrder
    joinedAt?: SortOrder
  }

  export type MatchPlayerMinOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    rank?: SortOrder
    score?: SortOrder
    result?: SortOrder
    xpDelta?: SortOrder
    joinedAt?: SortOrder
  }

  export type MatchPlayerSumOrderByAggregateInput = {
    rank?: SortOrder
    score?: SortOrder
    xpDelta?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumMatchOutcomeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchOutcome | EnumMatchOutcomeFieldRefInput<$PrismaModel> | null
    in?: $Enums.MatchOutcome[] | ListEnumMatchOutcomeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MatchOutcome[] | ListEnumMatchOutcomeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMatchOutcomeNullableWithAggregatesFilter<$PrismaModel> | $Enums.MatchOutcome | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumMatchOutcomeNullableFilter<$PrismaModel>
    _max?: NestedEnumMatchOutcomeNullableFilter<$PrismaModel>
  }

  export type EnumDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyFilter<$PrismaModel> | $Enums.Difficulty
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type QuestionCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    mode?: SortOrder
    brokenCode?: SortOrder
    brokenLanguage?: SortOrder
    expectedOutput?: SortOrder
    testCases?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    mode?: SortOrder
    brokenCode?: SortOrder
    brokenLanguage?: SortOrder
    expectedOutput?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    mode?: SortOrder
    brokenCode?: SortOrder
    brokenLanguage?: SortOrder
    expectedOutput?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.Difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyFilter<$PrismaModel>
    _max?: NestedEnumDifficultyFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type QuestionScalarRelationFilter = {
    is?: QuestionWhereInput
    isNot?: QuestionWhereInput
  }

  export type MatchQuestionMatchIdQuestionIdCompoundUniqueInput = {
    matchId: string
    questionId: string
  }

  export type MatchQuestionCountOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    questionId?: SortOrder
    order?: SortOrder
  }

  export type MatchQuestionAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type MatchQuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    questionId?: SortOrder
    order?: SortOrder
  }

  export type MatchQuestionMinOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    questionId?: SortOrder
    order?: SortOrder
  }

  export type MatchQuestionSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type SubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    questionId?: SortOrder
    code?: SortOrder
    language?: SortOrder
    charCount?: SortOrder
    stdout?: SortOrder
    stderr?: SortOrder
    exitCode?: SortOrder
    execTimeMs?: SortOrder
    testsPassed?: SortOrder
    testsTotal?: SortOrder
    timeComplexity?: SortOrder
    timeScore?: SortOrder
    spaceComplexity?: SortOrder
    spaceScore?: SortOrder
    originalityScore?: SortOrder
    relevanceScore?: SortOrder
    submittedAt?: SortOrder
  }

  export type SubmissionAvgOrderByAggregateInput = {
    charCount?: SortOrder
    exitCode?: SortOrder
    execTimeMs?: SortOrder
    testsPassed?: SortOrder
    testsTotal?: SortOrder
    timeScore?: SortOrder
    spaceScore?: SortOrder
    originalityScore?: SortOrder
    relevanceScore?: SortOrder
  }

  export type SubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    questionId?: SortOrder
    code?: SortOrder
    language?: SortOrder
    charCount?: SortOrder
    stdout?: SortOrder
    stderr?: SortOrder
    exitCode?: SortOrder
    execTimeMs?: SortOrder
    testsPassed?: SortOrder
    testsTotal?: SortOrder
    timeComplexity?: SortOrder
    timeScore?: SortOrder
    spaceComplexity?: SortOrder
    spaceScore?: SortOrder
    originalityScore?: SortOrder
    relevanceScore?: SortOrder
    submittedAt?: SortOrder
  }

  export type SubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    questionId?: SortOrder
    code?: SortOrder
    language?: SortOrder
    charCount?: SortOrder
    stdout?: SortOrder
    stderr?: SortOrder
    exitCode?: SortOrder
    execTimeMs?: SortOrder
    testsPassed?: SortOrder
    testsTotal?: SortOrder
    timeComplexity?: SortOrder
    timeScore?: SortOrder
    spaceComplexity?: SortOrder
    spaceScore?: SortOrder
    originalityScore?: SortOrder
    relevanceScore?: SortOrder
    submittedAt?: SortOrder
  }

  export type SubmissionSumOrderByAggregateInput = {
    charCount?: SortOrder
    exitCode?: SortOrder
    execTimeMs?: SortOrder
    testsPassed?: SortOrder
    testsTotal?: SortOrder
    timeScore?: SortOrder
    spaceScore?: SortOrder
    originalityScore?: SortOrder
    relevanceScore?: SortOrder
  }

  export type MatchPlayerCreateNestedManyWithoutUserInput = {
    create?: XOR<MatchPlayerCreateWithoutUserInput, MatchPlayerUncheckedCreateWithoutUserInput> | MatchPlayerCreateWithoutUserInput[] | MatchPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MatchPlayerCreateOrConnectWithoutUserInput | MatchPlayerCreateOrConnectWithoutUserInput[]
    createMany?: MatchPlayerCreateManyUserInputEnvelope
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
  }

  export type QueueEntryCreateNestedManyWithoutUserInput = {
    create?: XOR<QueueEntryCreateWithoutUserInput, QueueEntryUncheckedCreateWithoutUserInput> | QueueEntryCreateWithoutUserInput[] | QueueEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QueueEntryCreateOrConnectWithoutUserInput | QueueEntryCreateOrConnectWithoutUserInput[]
    createMany?: QueueEntryCreateManyUserInputEnvelope
    connect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
  }

  export type MatchPlayerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MatchPlayerCreateWithoutUserInput, MatchPlayerUncheckedCreateWithoutUserInput> | MatchPlayerCreateWithoutUserInput[] | MatchPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MatchPlayerCreateOrConnectWithoutUserInput | MatchPlayerCreateOrConnectWithoutUserInput[]
    createMany?: MatchPlayerCreateManyUserInputEnvelope
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
  }

  export type QueueEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<QueueEntryCreateWithoutUserInput, QueueEntryUncheckedCreateWithoutUserInput> | QueueEntryCreateWithoutUserInput[] | QueueEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QueueEntryCreateOrConnectWithoutUserInput | QueueEntryCreateOrConnectWithoutUserInput[]
    createMany?: QueueEntryCreateManyUserInputEnvelope
    connect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumSkillTierFieldUpdateOperationsInput = {
    set?: $Enums.SkillTier
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MatchPlayerUpdateManyWithoutUserNestedInput = {
    create?: XOR<MatchPlayerCreateWithoutUserInput, MatchPlayerUncheckedCreateWithoutUserInput> | MatchPlayerCreateWithoutUserInput[] | MatchPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MatchPlayerCreateOrConnectWithoutUserInput | MatchPlayerCreateOrConnectWithoutUserInput[]
    upsert?: MatchPlayerUpsertWithWhereUniqueWithoutUserInput | MatchPlayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MatchPlayerCreateManyUserInputEnvelope
    set?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    disconnect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    delete?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    update?: MatchPlayerUpdateWithWhereUniqueWithoutUserInput | MatchPlayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MatchPlayerUpdateManyWithWhereWithoutUserInput | MatchPlayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MatchPlayerScalarWhereInput | MatchPlayerScalarWhereInput[]
  }

  export type QueueEntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<QueueEntryCreateWithoutUserInput, QueueEntryUncheckedCreateWithoutUserInput> | QueueEntryCreateWithoutUserInput[] | QueueEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QueueEntryCreateOrConnectWithoutUserInput | QueueEntryCreateOrConnectWithoutUserInput[]
    upsert?: QueueEntryUpsertWithWhereUniqueWithoutUserInput | QueueEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QueueEntryCreateManyUserInputEnvelope
    set?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    disconnect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    delete?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    connect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    update?: QueueEntryUpdateWithWhereUniqueWithoutUserInput | QueueEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QueueEntryUpdateManyWithWhereWithoutUserInput | QueueEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QueueEntryScalarWhereInput | QueueEntryScalarWhereInput[]
  }

  export type MatchPlayerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MatchPlayerCreateWithoutUserInput, MatchPlayerUncheckedCreateWithoutUserInput> | MatchPlayerCreateWithoutUserInput[] | MatchPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MatchPlayerCreateOrConnectWithoutUserInput | MatchPlayerCreateOrConnectWithoutUserInput[]
    upsert?: MatchPlayerUpsertWithWhereUniqueWithoutUserInput | MatchPlayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MatchPlayerCreateManyUserInputEnvelope
    set?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    disconnect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    delete?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    update?: MatchPlayerUpdateWithWhereUniqueWithoutUserInput | MatchPlayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MatchPlayerUpdateManyWithWhereWithoutUserInput | MatchPlayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MatchPlayerScalarWhereInput | MatchPlayerScalarWhereInput[]
  }

  export type QueueEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<QueueEntryCreateWithoutUserInput, QueueEntryUncheckedCreateWithoutUserInput> | QueueEntryCreateWithoutUserInput[] | QueueEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QueueEntryCreateOrConnectWithoutUserInput | QueueEntryCreateOrConnectWithoutUserInput[]
    upsert?: QueueEntryUpsertWithWhereUniqueWithoutUserInput | QueueEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QueueEntryCreateManyUserInputEnvelope
    set?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    disconnect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    delete?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    connect?: QueueEntryWhereUniqueInput | QueueEntryWhereUniqueInput[]
    update?: QueueEntryUpdateWithWhereUniqueWithoutUserInput | QueueEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QueueEntryUpdateManyWithWhereWithoutUserInput | QueueEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QueueEntryScalarWhereInput | QueueEntryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutQueueEntriesInput = {
    create?: XOR<UserCreateWithoutQueueEntriesInput, UserUncheckedCreateWithoutQueueEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutQueueEntriesInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutQueueEntriesNestedInput = {
    create?: XOR<UserCreateWithoutQueueEntriesInput, UserUncheckedCreateWithoutQueueEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutQueueEntriesInput
    upsert?: UserUpsertWithoutQueueEntriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQueueEntriesInput, UserUpdateWithoutQueueEntriesInput>, UserUncheckedUpdateWithoutQueueEntriesInput>
  }

  export type MatchPlayerCreateNestedManyWithoutMatchInput = {
    create?: XOR<MatchPlayerCreateWithoutMatchInput, MatchPlayerUncheckedCreateWithoutMatchInput> | MatchPlayerCreateWithoutMatchInput[] | MatchPlayerUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchPlayerCreateOrConnectWithoutMatchInput | MatchPlayerCreateOrConnectWithoutMatchInput[]
    createMany?: MatchPlayerCreateManyMatchInputEnvelope
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
  }

  export type MatchQuestionCreateNestedManyWithoutMatchInput = {
    create?: XOR<MatchQuestionCreateWithoutMatchInput, MatchQuestionUncheckedCreateWithoutMatchInput> | MatchQuestionCreateWithoutMatchInput[] | MatchQuestionUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchQuestionCreateOrConnectWithoutMatchInput | MatchQuestionCreateOrConnectWithoutMatchInput[]
    createMany?: MatchQuestionCreateManyMatchInputEnvelope
    connect?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
  }

  export type SubmissionCreateNestedManyWithoutMatchInput = {
    create?: XOR<SubmissionCreateWithoutMatchInput, SubmissionUncheckedCreateWithoutMatchInput> | SubmissionCreateWithoutMatchInput[] | SubmissionUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutMatchInput | SubmissionCreateOrConnectWithoutMatchInput[]
    createMany?: SubmissionCreateManyMatchInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type MatchPlayerUncheckedCreateNestedManyWithoutMatchInput = {
    create?: XOR<MatchPlayerCreateWithoutMatchInput, MatchPlayerUncheckedCreateWithoutMatchInput> | MatchPlayerCreateWithoutMatchInput[] | MatchPlayerUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchPlayerCreateOrConnectWithoutMatchInput | MatchPlayerCreateOrConnectWithoutMatchInput[]
    createMany?: MatchPlayerCreateManyMatchInputEnvelope
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
  }

  export type MatchQuestionUncheckedCreateNestedManyWithoutMatchInput = {
    create?: XOR<MatchQuestionCreateWithoutMatchInput, MatchQuestionUncheckedCreateWithoutMatchInput> | MatchQuestionCreateWithoutMatchInput[] | MatchQuestionUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchQuestionCreateOrConnectWithoutMatchInput | MatchQuestionCreateOrConnectWithoutMatchInput[]
    createMany?: MatchQuestionCreateManyMatchInputEnvelope
    connect?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutMatchInput = {
    create?: XOR<SubmissionCreateWithoutMatchInput, SubmissionUncheckedCreateWithoutMatchInput> | SubmissionCreateWithoutMatchInput[] | SubmissionUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutMatchInput | SubmissionCreateOrConnectWithoutMatchInput[]
    createMany?: SubmissionCreateManyMatchInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type EnumMatchStatusFieldUpdateOperationsInput = {
    set?: $Enums.MatchStatus
  }

  export type EnumGameModeFieldUpdateOperationsInput = {
    set?: $Enums.GameMode
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type MatchPlayerUpdateManyWithoutMatchNestedInput = {
    create?: XOR<MatchPlayerCreateWithoutMatchInput, MatchPlayerUncheckedCreateWithoutMatchInput> | MatchPlayerCreateWithoutMatchInput[] | MatchPlayerUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchPlayerCreateOrConnectWithoutMatchInput | MatchPlayerCreateOrConnectWithoutMatchInput[]
    upsert?: MatchPlayerUpsertWithWhereUniqueWithoutMatchInput | MatchPlayerUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: MatchPlayerCreateManyMatchInputEnvelope
    set?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    disconnect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    delete?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    update?: MatchPlayerUpdateWithWhereUniqueWithoutMatchInput | MatchPlayerUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: MatchPlayerUpdateManyWithWhereWithoutMatchInput | MatchPlayerUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: MatchPlayerScalarWhereInput | MatchPlayerScalarWhereInput[]
  }

  export type MatchQuestionUpdateManyWithoutMatchNestedInput = {
    create?: XOR<MatchQuestionCreateWithoutMatchInput, MatchQuestionUncheckedCreateWithoutMatchInput> | MatchQuestionCreateWithoutMatchInput[] | MatchQuestionUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchQuestionCreateOrConnectWithoutMatchInput | MatchQuestionCreateOrConnectWithoutMatchInput[]
    upsert?: MatchQuestionUpsertWithWhereUniqueWithoutMatchInput | MatchQuestionUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: MatchQuestionCreateManyMatchInputEnvelope
    set?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    disconnect?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    delete?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    connect?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    update?: MatchQuestionUpdateWithWhereUniqueWithoutMatchInput | MatchQuestionUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: MatchQuestionUpdateManyWithWhereWithoutMatchInput | MatchQuestionUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: MatchQuestionScalarWhereInput | MatchQuestionScalarWhereInput[]
  }

  export type SubmissionUpdateManyWithoutMatchNestedInput = {
    create?: XOR<SubmissionCreateWithoutMatchInput, SubmissionUncheckedCreateWithoutMatchInput> | SubmissionCreateWithoutMatchInput[] | SubmissionUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutMatchInput | SubmissionCreateOrConnectWithoutMatchInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutMatchInput | SubmissionUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: SubmissionCreateManyMatchInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutMatchInput | SubmissionUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutMatchInput | SubmissionUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type MatchPlayerUncheckedUpdateManyWithoutMatchNestedInput = {
    create?: XOR<MatchPlayerCreateWithoutMatchInput, MatchPlayerUncheckedCreateWithoutMatchInput> | MatchPlayerCreateWithoutMatchInput[] | MatchPlayerUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchPlayerCreateOrConnectWithoutMatchInput | MatchPlayerCreateOrConnectWithoutMatchInput[]
    upsert?: MatchPlayerUpsertWithWhereUniqueWithoutMatchInput | MatchPlayerUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: MatchPlayerCreateManyMatchInputEnvelope
    set?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    disconnect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    delete?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    connect?: MatchPlayerWhereUniqueInput | MatchPlayerWhereUniqueInput[]
    update?: MatchPlayerUpdateWithWhereUniqueWithoutMatchInput | MatchPlayerUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: MatchPlayerUpdateManyWithWhereWithoutMatchInput | MatchPlayerUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: MatchPlayerScalarWhereInput | MatchPlayerScalarWhereInput[]
  }

  export type MatchQuestionUncheckedUpdateManyWithoutMatchNestedInput = {
    create?: XOR<MatchQuestionCreateWithoutMatchInput, MatchQuestionUncheckedCreateWithoutMatchInput> | MatchQuestionCreateWithoutMatchInput[] | MatchQuestionUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchQuestionCreateOrConnectWithoutMatchInput | MatchQuestionCreateOrConnectWithoutMatchInput[]
    upsert?: MatchQuestionUpsertWithWhereUniqueWithoutMatchInput | MatchQuestionUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: MatchQuestionCreateManyMatchInputEnvelope
    set?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    disconnect?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    delete?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    connect?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    update?: MatchQuestionUpdateWithWhereUniqueWithoutMatchInput | MatchQuestionUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: MatchQuestionUpdateManyWithWhereWithoutMatchInput | MatchQuestionUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: MatchQuestionScalarWhereInput | MatchQuestionScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutMatchNestedInput = {
    create?: XOR<SubmissionCreateWithoutMatchInput, SubmissionUncheckedCreateWithoutMatchInput> | SubmissionCreateWithoutMatchInput[] | SubmissionUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutMatchInput | SubmissionCreateOrConnectWithoutMatchInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutMatchInput | SubmissionUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: SubmissionCreateManyMatchInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutMatchInput | SubmissionUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutMatchInput | SubmissionUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type MatchCreateNestedOneWithoutPlayersInput = {
    create?: XOR<MatchCreateWithoutPlayersInput, MatchUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: MatchCreateOrConnectWithoutPlayersInput
    connect?: MatchWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMatchPlayersInput = {
    create?: XOR<UserCreateWithoutMatchPlayersInput, UserUncheckedCreateWithoutMatchPlayersInput>
    connectOrCreate?: UserCreateOrConnectWithoutMatchPlayersInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumMatchOutcomeFieldUpdateOperationsInput = {
    set?: $Enums.MatchOutcome | null
  }

  export type MatchUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<MatchCreateWithoutPlayersInput, MatchUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: MatchCreateOrConnectWithoutPlayersInput
    upsert?: MatchUpsertWithoutPlayersInput
    connect?: MatchWhereUniqueInput
    update?: XOR<XOR<MatchUpdateToOneWithWhereWithoutPlayersInput, MatchUpdateWithoutPlayersInput>, MatchUncheckedUpdateWithoutPlayersInput>
  }

  export type UserUpdateOneRequiredWithoutMatchPlayersNestedInput = {
    create?: XOR<UserCreateWithoutMatchPlayersInput, UserUncheckedCreateWithoutMatchPlayersInput>
    connectOrCreate?: UserCreateOrConnectWithoutMatchPlayersInput
    upsert?: UserUpsertWithoutMatchPlayersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMatchPlayersInput, UserUpdateWithoutMatchPlayersInput>, UserUncheckedUpdateWithoutMatchPlayersInput>
  }

  export type MatchQuestionCreateNestedManyWithoutQuestionInput = {
    create?: XOR<MatchQuestionCreateWithoutQuestionInput, MatchQuestionUncheckedCreateWithoutQuestionInput> | MatchQuestionCreateWithoutQuestionInput[] | MatchQuestionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: MatchQuestionCreateOrConnectWithoutQuestionInput | MatchQuestionCreateOrConnectWithoutQuestionInput[]
    createMany?: MatchQuestionCreateManyQuestionInputEnvelope
    connect?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
  }

  export type MatchQuestionUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<MatchQuestionCreateWithoutQuestionInput, MatchQuestionUncheckedCreateWithoutQuestionInput> | MatchQuestionCreateWithoutQuestionInput[] | MatchQuestionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: MatchQuestionCreateOrConnectWithoutQuestionInput | MatchQuestionCreateOrConnectWithoutQuestionInput[]
    createMany?: MatchQuestionCreateManyQuestionInputEnvelope
    connect?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
  }

  export type EnumDifficultyFieldUpdateOperationsInput = {
    set?: $Enums.Difficulty
  }

  export type MatchQuestionUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<MatchQuestionCreateWithoutQuestionInput, MatchQuestionUncheckedCreateWithoutQuestionInput> | MatchQuestionCreateWithoutQuestionInput[] | MatchQuestionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: MatchQuestionCreateOrConnectWithoutQuestionInput | MatchQuestionCreateOrConnectWithoutQuestionInput[]
    upsert?: MatchQuestionUpsertWithWhereUniqueWithoutQuestionInput | MatchQuestionUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: MatchQuestionCreateManyQuestionInputEnvelope
    set?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    disconnect?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    delete?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    connect?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    update?: MatchQuestionUpdateWithWhereUniqueWithoutQuestionInput | MatchQuestionUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: MatchQuestionUpdateManyWithWhereWithoutQuestionInput | MatchQuestionUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: MatchQuestionScalarWhereInput | MatchQuestionScalarWhereInput[]
  }

  export type MatchQuestionUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<MatchQuestionCreateWithoutQuestionInput, MatchQuestionUncheckedCreateWithoutQuestionInput> | MatchQuestionCreateWithoutQuestionInput[] | MatchQuestionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: MatchQuestionCreateOrConnectWithoutQuestionInput | MatchQuestionCreateOrConnectWithoutQuestionInput[]
    upsert?: MatchQuestionUpsertWithWhereUniqueWithoutQuestionInput | MatchQuestionUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: MatchQuestionCreateManyQuestionInputEnvelope
    set?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    disconnect?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    delete?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    connect?: MatchQuestionWhereUniqueInput | MatchQuestionWhereUniqueInput[]
    update?: MatchQuestionUpdateWithWhereUniqueWithoutQuestionInput | MatchQuestionUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: MatchQuestionUpdateManyWithWhereWithoutQuestionInput | MatchQuestionUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: MatchQuestionScalarWhereInput | MatchQuestionScalarWhereInput[]
  }

  export type MatchCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<MatchCreateWithoutQuestionsInput, MatchUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: MatchCreateOrConnectWithoutQuestionsInput
    connect?: MatchWhereUniqueInput
  }

  export type QuestionCreateNestedOneWithoutMatchQuestionsInput = {
    create?: XOR<QuestionCreateWithoutMatchQuestionsInput, QuestionUncheckedCreateWithoutMatchQuestionsInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutMatchQuestionsInput
    connect?: QuestionWhereUniqueInput
  }

  export type MatchUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<MatchCreateWithoutQuestionsInput, MatchUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: MatchCreateOrConnectWithoutQuestionsInput
    upsert?: MatchUpsertWithoutQuestionsInput
    connect?: MatchWhereUniqueInput
    update?: XOR<XOR<MatchUpdateToOneWithWhereWithoutQuestionsInput, MatchUpdateWithoutQuestionsInput>, MatchUncheckedUpdateWithoutQuestionsInput>
  }

  export type QuestionUpdateOneRequiredWithoutMatchQuestionsNestedInput = {
    create?: XOR<QuestionCreateWithoutMatchQuestionsInput, QuestionUncheckedCreateWithoutMatchQuestionsInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutMatchQuestionsInput
    upsert?: QuestionUpsertWithoutMatchQuestionsInput
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutMatchQuestionsInput, QuestionUpdateWithoutMatchQuestionsInput>, QuestionUncheckedUpdateWithoutMatchQuestionsInput>
  }

  export type MatchCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<MatchCreateWithoutSubmissionsInput, MatchUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: MatchCreateOrConnectWithoutSubmissionsInput
    connect?: MatchWhereUniqueInput
  }

  export type MatchUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<MatchCreateWithoutSubmissionsInput, MatchUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: MatchCreateOrConnectWithoutSubmissionsInput
    upsert?: MatchUpsertWithoutSubmissionsInput
    connect?: MatchWhereUniqueInput
    update?: XOR<XOR<MatchUpdateToOneWithWhereWithoutSubmissionsInput, MatchUpdateWithoutSubmissionsInput>, MatchUncheckedUpdateWithoutSubmissionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumSkillTierFilter<$PrismaModel = never> = {
    equals?: $Enums.SkillTier | EnumSkillTierFieldRefInput<$PrismaModel>
    in?: $Enums.SkillTier[] | ListEnumSkillTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.SkillTier[] | ListEnumSkillTierFieldRefInput<$PrismaModel>
    not?: NestedEnumSkillTierFilter<$PrismaModel> | $Enums.SkillTier
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSkillTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SkillTier | EnumSkillTierFieldRefInput<$PrismaModel>
    in?: $Enums.SkillTier[] | ListEnumSkillTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.SkillTier[] | ListEnumSkillTierFieldRefInput<$PrismaModel>
    not?: NestedEnumSkillTierWithAggregatesFilter<$PrismaModel> | $Enums.SkillTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSkillTierFilter<$PrismaModel>
    _max?: NestedEnumSkillTierFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumMatchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchStatus | EnumMatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMatchStatusFilter<$PrismaModel> | $Enums.MatchStatus
  }

  export type NestedEnumGameModeFilter<$PrismaModel = never> = {
    equals?: $Enums.GameMode | EnumGameModeFieldRefInput<$PrismaModel>
    in?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    not?: NestedEnumGameModeFilter<$PrismaModel> | $Enums.GameMode
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumMatchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchStatus | EnumMatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMatchStatusWithAggregatesFilter<$PrismaModel> | $Enums.MatchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMatchStatusFilter<$PrismaModel>
    _max?: NestedEnumMatchStatusFilter<$PrismaModel>
  }

  export type NestedEnumGameModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameMode | EnumGameModeFieldRefInput<$PrismaModel>
    in?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameMode[] | ListEnumGameModeFieldRefInput<$PrismaModel>
    not?: NestedEnumGameModeWithAggregatesFilter<$PrismaModel> | $Enums.GameMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGameModeFilter<$PrismaModel>
    _max?: NestedEnumGameModeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumMatchOutcomeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchOutcome | EnumMatchOutcomeFieldRefInput<$PrismaModel> | null
    in?: $Enums.MatchOutcome[] | ListEnumMatchOutcomeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MatchOutcome[] | ListEnumMatchOutcomeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMatchOutcomeNullableFilter<$PrismaModel> | $Enums.MatchOutcome | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumMatchOutcomeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchOutcome | EnumMatchOutcomeFieldRefInput<$PrismaModel> | null
    in?: $Enums.MatchOutcome[] | ListEnumMatchOutcomeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MatchOutcome[] | ListEnumMatchOutcomeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMatchOutcomeNullableWithAggregatesFilter<$PrismaModel> | $Enums.MatchOutcome | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumMatchOutcomeNullableFilter<$PrismaModel>
    _max?: NestedEnumMatchOutcomeNullableFilter<$PrismaModel>
  }

  export type NestedEnumDifficultyFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyFilter<$PrismaModel> | $Enums.Difficulty
  }

  export type NestedEnumDifficultyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Difficulty | EnumDifficultyFieldRefInput<$PrismaModel>
    in?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Difficulty[] | ListEnumDifficultyFieldRefInput<$PrismaModel>
    not?: NestedEnumDifficultyWithAggregatesFilter<$PrismaModel> | $Enums.Difficulty
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDifficultyFilter<$PrismaModel>
    _max?: NestedEnumDifficultyFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MatchPlayerCreateWithoutUserInput = {
    id?: string
    rank?: number | null
    score?: number | null
    result?: $Enums.MatchOutcome | null
    xpDelta?: number
    joinedAt?: Date | string
    match: MatchCreateNestedOneWithoutPlayersInput
  }

  export type MatchPlayerUncheckedCreateWithoutUserInput = {
    id?: string
    matchId: string
    rank?: number | null
    score?: number | null
    result?: $Enums.MatchOutcome | null
    xpDelta?: number
    joinedAt?: Date | string
  }

  export type MatchPlayerCreateOrConnectWithoutUserInput = {
    where: MatchPlayerWhereUniqueInput
    create: XOR<MatchPlayerCreateWithoutUserInput, MatchPlayerUncheckedCreateWithoutUserInput>
  }

  export type MatchPlayerCreateManyUserInputEnvelope = {
    data: MatchPlayerCreateManyUserInput | MatchPlayerCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type QueueEntryCreateWithoutUserInput = {
    id?: string
    joinedAt?: Date | string
    active?: boolean
  }

  export type QueueEntryUncheckedCreateWithoutUserInput = {
    id?: string
    joinedAt?: Date | string
    active?: boolean
  }

  export type QueueEntryCreateOrConnectWithoutUserInput = {
    where: QueueEntryWhereUniqueInput
    create: XOR<QueueEntryCreateWithoutUserInput, QueueEntryUncheckedCreateWithoutUserInput>
  }

  export type QueueEntryCreateManyUserInputEnvelope = {
    data: QueueEntryCreateManyUserInput | QueueEntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MatchPlayerUpsertWithWhereUniqueWithoutUserInput = {
    where: MatchPlayerWhereUniqueInput
    update: XOR<MatchPlayerUpdateWithoutUserInput, MatchPlayerUncheckedUpdateWithoutUserInput>
    create: XOR<MatchPlayerCreateWithoutUserInput, MatchPlayerUncheckedCreateWithoutUserInput>
  }

  export type MatchPlayerUpdateWithWhereUniqueWithoutUserInput = {
    where: MatchPlayerWhereUniqueInput
    data: XOR<MatchPlayerUpdateWithoutUserInput, MatchPlayerUncheckedUpdateWithoutUserInput>
  }

  export type MatchPlayerUpdateManyWithWhereWithoutUserInput = {
    where: MatchPlayerScalarWhereInput
    data: XOR<MatchPlayerUpdateManyMutationInput, MatchPlayerUncheckedUpdateManyWithoutUserInput>
  }

  export type MatchPlayerScalarWhereInput = {
    AND?: MatchPlayerScalarWhereInput | MatchPlayerScalarWhereInput[]
    OR?: MatchPlayerScalarWhereInput[]
    NOT?: MatchPlayerScalarWhereInput | MatchPlayerScalarWhereInput[]
    id?: StringFilter<"MatchPlayer"> | string
    matchId?: StringFilter<"MatchPlayer"> | string
    userId?: StringFilter<"MatchPlayer"> | string
    rank?: IntNullableFilter<"MatchPlayer"> | number | null
    score?: FloatNullableFilter<"MatchPlayer"> | number | null
    result?: EnumMatchOutcomeNullableFilter<"MatchPlayer"> | $Enums.MatchOutcome | null
    xpDelta?: IntFilter<"MatchPlayer"> | number
    joinedAt?: DateTimeFilter<"MatchPlayer"> | Date | string
  }

  export type QueueEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: QueueEntryWhereUniqueInput
    update: XOR<QueueEntryUpdateWithoutUserInput, QueueEntryUncheckedUpdateWithoutUserInput>
    create: XOR<QueueEntryCreateWithoutUserInput, QueueEntryUncheckedCreateWithoutUserInput>
  }

  export type QueueEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: QueueEntryWhereUniqueInput
    data: XOR<QueueEntryUpdateWithoutUserInput, QueueEntryUncheckedUpdateWithoutUserInput>
  }

  export type QueueEntryUpdateManyWithWhereWithoutUserInput = {
    where: QueueEntryScalarWhereInput
    data: XOR<QueueEntryUpdateManyMutationInput, QueueEntryUncheckedUpdateManyWithoutUserInput>
  }

  export type QueueEntryScalarWhereInput = {
    AND?: QueueEntryScalarWhereInput | QueueEntryScalarWhereInput[]
    OR?: QueueEntryScalarWhereInput[]
    NOT?: QueueEntryScalarWhereInput | QueueEntryScalarWhereInput[]
    id?: StringFilter<"QueueEntry"> | string
    userId?: StringFilter<"QueueEntry"> | string
    joinedAt?: DateTimeFilter<"QueueEntry"> | Date | string
    active?: BoolFilter<"QueueEntry"> | boolean
  }

  export type UserCreateWithoutQueueEntriesInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    displayName?: string | null
    avatarUrl?: string | null
    title?: string
    skillTier?: $Enums.SkillTier
    elo?: number
    totalWins?: number
    totalMatches?: number
    totalXP?: number
    streak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    matchPlayers?: MatchPlayerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQueueEntriesInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    displayName?: string | null
    avatarUrl?: string | null
    title?: string
    skillTier?: $Enums.SkillTier
    elo?: number
    totalWins?: number
    totalMatches?: number
    totalXP?: number
    streak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    matchPlayers?: MatchPlayerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutQueueEntriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQueueEntriesInput, UserUncheckedCreateWithoutQueueEntriesInput>
  }

  export type UserUpsertWithoutQueueEntriesInput = {
    update: XOR<UserUpdateWithoutQueueEntriesInput, UserUncheckedUpdateWithoutQueueEntriesInput>
    create: XOR<UserCreateWithoutQueueEntriesInput, UserUncheckedCreateWithoutQueueEntriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQueueEntriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQueueEntriesInput, UserUncheckedUpdateWithoutQueueEntriesInput>
  }

  export type UserUpdateWithoutQueueEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    skillTier?: EnumSkillTierFieldUpdateOperationsInput | $Enums.SkillTier
    elo?: IntFieldUpdateOperationsInput | number
    totalWins?: IntFieldUpdateOperationsInput | number
    totalMatches?: IntFieldUpdateOperationsInput | number
    totalXP?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchPlayers?: MatchPlayerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQueueEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    skillTier?: EnumSkillTierFieldUpdateOperationsInput | $Enums.SkillTier
    elo?: IntFieldUpdateOperationsInput | number
    totalWins?: IntFieldUpdateOperationsInput | number
    totalMatches?: IntFieldUpdateOperationsInput | number
    totalXP?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchPlayers?: MatchPlayerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MatchPlayerCreateWithoutMatchInput = {
    id?: string
    rank?: number | null
    score?: number | null
    result?: $Enums.MatchOutcome | null
    xpDelta?: number
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutMatchPlayersInput
  }

  export type MatchPlayerUncheckedCreateWithoutMatchInput = {
    id?: string
    userId: string
    rank?: number | null
    score?: number | null
    result?: $Enums.MatchOutcome | null
    xpDelta?: number
    joinedAt?: Date | string
  }

  export type MatchPlayerCreateOrConnectWithoutMatchInput = {
    where: MatchPlayerWhereUniqueInput
    create: XOR<MatchPlayerCreateWithoutMatchInput, MatchPlayerUncheckedCreateWithoutMatchInput>
  }

  export type MatchPlayerCreateManyMatchInputEnvelope = {
    data: MatchPlayerCreateManyMatchInput | MatchPlayerCreateManyMatchInput[]
    skipDuplicates?: boolean
  }

  export type MatchQuestionCreateWithoutMatchInput = {
    id?: string
    order?: number
    question: QuestionCreateNestedOneWithoutMatchQuestionsInput
  }

  export type MatchQuestionUncheckedCreateWithoutMatchInput = {
    id?: string
    questionId: string
    order?: number
  }

  export type MatchQuestionCreateOrConnectWithoutMatchInput = {
    where: MatchQuestionWhereUniqueInput
    create: XOR<MatchQuestionCreateWithoutMatchInput, MatchQuestionUncheckedCreateWithoutMatchInput>
  }

  export type MatchQuestionCreateManyMatchInputEnvelope = {
    data: MatchQuestionCreateManyMatchInput | MatchQuestionCreateManyMatchInput[]
    skipDuplicates?: boolean
  }

  export type SubmissionCreateWithoutMatchInput = {
    id?: string
    userId: string
    questionId: string
    code: string
    language: string
    charCount?: number | null
    stdout?: string | null
    stderr?: string | null
    exitCode?: number | null
    execTimeMs?: number | null
    testsPassed?: number
    testsTotal?: number
    timeComplexity?: string | null
    timeScore?: number | null
    spaceComplexity?: string | null
    spaceScore?: number | null
    originalityScore?: number | null
    relevanceScore?: number | null
    submittedAt?: Date | string
  }

  export type SubmissionUncheckedCreateWithoutMatchInput = {
    id?: string
    userId: string
    questionId: string
    code: string
    language: string
    charCount?: number | null
    stdout?: string | null
    stderr?: string | null
    exitCode?: number | null
    execTimeMs?: number | null
    testsPassed?: number
    testsTotal?: number
    timeComplexity?: string | null
    timeScore?: number | null
    spaceComplexity?: string | null
    spaceScore?: number | null
    originalityScore?: number | null
    relevanceScore?: number | null
    submittedAt?: Date | string
  }

  export type SubmissionCreateOrConnectWithoutMatchInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutMatchInput, SubmissionUncheckedCreateWithoutMatchInput>
  }

  export type SubmissionCreateManyMatchInputEnvelope = {
    data: SubmissionCreateManyMatchInput | SubmissionCreateManyMatchInput[]
    skipDuplicates?: boolean
  }

  export type MatchPlayerUpsertWithWhereUniqueWithoutMatchInput = {
    where: MatchPlayerWhereUniqueInput
    update: XOR<MatchPlayerUpdateWithoutMatchInput, MatchPlayerUncheckedUpdateWithoutMatchInput>
    create: XOR<MatchPlayerCreateWithoutMatchInput, MatchPlayerUncheckedCreateWithoutMatchInput>
  }

  export type MatchPlayerUpdateWithWhereUniqueWithoutMatchInput = {
    where: MatchPlayerWhereUniqueInput
    data: XOR<MatchPlayerUpdateWithoutMatchInput, MatchPlayerUncheckedUpdateWithoutMatchInput>
  }

  export type MatchPlayerUpdateManyWithWhereWithoutMatchInput = {
    where: MatchPlayerScalarWhereInput
    data: XOR<MatchPlayerUpdateManyMutationInput, MatchPlayerUncheckedUpdateManyWithoutMatchInput>
  }

  export type MatchQuestionUpsertWithWhereUniqueWithoutMatchInput = {
    where: MatchQuestionWhereUniqueInput
    update: XOR<MatchQuestionUpdateWithoutMatchInput, MatchQuestionUncheckedUpdateWithoutMatchInput>
    create: XOR<MatchQuestionCreateWithoutMatchInput, MatchQuestionUncheckedCreateWithoutMatchInput>
  }

  export type MatchQuestionUpdateWithWhereUniqueWithoutMatchInput = {
    where: MatchQuestionWhereUniqueInput
    data: XOR<MatchQuestionUpdateWithoutMatchInput, MatchQuestionUncheckedUpdateWithoutMatchInput>
  }

  export type MatchQuestionUpdateManyWithWhereWithoutMatchInput = {
    where: MatchQuestionScalarWhereInput
    data: XOR<MatchQuestionUpdateManyMutationInput, MatchQuestionUncheckedUpdateManyWithoutMatchInput>
  }

  export type MatchQuestionScalarWhereInput = {
    AND?: MatchQuestionScalarWhereInput | MatchQuestionScalarWhereInput[]
    OR?: MatchQuestionScalarWhereInput[]
    NOT?: MatchQuestionScalarWhereInput | MatchQuestionScalarWhereInput[]
    id?: StringFilter<"MatchQuestion"> | string
    matchId?: StringFilter<"MatchQuestion"> | string
    questionId?: StringFilter<"MatchQuestion"> | string
    order?: IntFilter<"MatchQuestion"> | number
  }

  export type SubmissionUpsertWithWhereUniqueWithoutMatchInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutMatchInput, SubmissionUncheckedUpdateWithoutMatchInput>
    create: XOR<SubmissionCreateWithoutMatchInput, SubmissionUncheckedCreateWithoutMatchInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutMatchInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutMatchInput, SubmissionUncheckedUpdateWithoutMatchInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutMatchInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutMatchInput>
  }

  export type SubmissionScalarWhereInput = {
    AND?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    OR?: SubmissionScalarWhereInput[]
    NOT?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    id?: StringFilter<"Submission"> | string
    matchId?: StringFilter<"Submission"> | string
    userId?: StringFilter<"Submission"> | string
    questionId?: StringFilter<"Submission"> | string
    code?: StringFilter<"Submission"> | string
    language?: StringFilter<"Submission"> | string
    charCount?: IntNullableFilter<"Submission"> | number | null
    stdout?: StringNullableFilter<"Submission"> | string | null
    stderr?: StringNullableFilter<"Submission"> | string | null
    exitCode?: IntNullableFilter<"Submission"> | number | null
    execTimeMs?: IntNullableFilter<"Submission"> | number | null
    testsPassed?: IntFilter<"Submission"> | number
    testsTotal?: IntFilter<"Submission"> | number
    timeComplexity?: StringNullableFilter<"Submission"> | string | null
    timeScore?: FloatNullableFilter<"Submission"> | number | null
    spaceComplexity?: StringNullableFilter<"Submission"> | string | null
    spaceScore?: FloatNullableFilter<"Submission"> | number | null
    originalityScore?: FloatNullableFilter<"Submission"> | number | null
    relevanceScore?: FloatNullableFilter<"Submission"> | number | null
    submittedAt?: DateTimeFilter<"Submission"> | Date | string
  }

  export type MatchCreateWithoutPlayersInput = {
    id?: string
    maxPlayers?: number
    status?: $Enums.MatchStatus
    mode?: $Enums.GameMode
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    threadTimeComplexity?: string | null
    threadSpaceComplexity?: string | null
    threadOriginality?: string | null
    threadRanking?: string | null
    questions?: MatchQuestionCreateNestedManyWithoutMatchInput
    submissions?: SubmissionCreateNestedManyWithoutMatchInput
  }

  export type MatchUncheckedCreateWithoutPlayersInput = {
    id?: string
    maxPlayers?: number
    status?: $Enums.MatchStatus
    mode?: $Enums.GameMode
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    threadTimeComplexity?: string | null
    threadSpaceComplexity?: string | null
    threadOriginality?: string | null
    threadRanking?: string | null
    questions?: MatchQuestionUncheckedCreateNestedManyWithoutMatchInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutMatchInput
  }

  export type MatchCreateOrConnectWithoutPlayersInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutPlayersInput, MatchUncheckedCreateWithoutPlayersInput>
  }

  export type UserCreateWithoutMatchPlayersInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    displayName?: string | null
    avatarUrl?: string | null
    title?: string
    skillTier?: $Enums.SkillTier
    elo?: number
    totalWins?: number
    totalMatches?: number
    totalXP?: number
    streak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    queueEntries?: QueueEntryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMatchPlayersInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    displayName?: string | null
    avatarUrl?: string | null
    title?: string
    skillTier?: $Enums.SkillTier
    elo?: number
    totalWins?: number
    totalMatches?: number
    totalXP?: number
    streak?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    queueEntries?: QueueEntryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMatchPlayersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMatchPlayersInput, UserUncheckedCreateWithoutMatchPlayersInput>
  }

  export type MatchUpsertWithoutPlayersInput = {
    update: XOR<MatchUpdateWithoutPlayersInput, MatchUncheckedUpdateWithoutPlayersInput>
    create: XOR<MatchCreateWithoutPlayersInput, MatchUncheckedCreateWithoutPlayersInput>
    where?: MatchWhereInput
  }

  export type MatchUpdateToOneWithWhereWithoutPlayersInput = {
    where?: MatchWhereInput
    data: XOR<MatchUpdateWithoutPlayersInput, MatchUncheckedUpdateWithoutPlayersInput>
  }

  export type MatchUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threadTimeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadSpaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadOriginality?: NullableStringFieldUpdateOperationsInput | string | null
    threadRanking?: NullableStringFieldUpdateOperationsInput | string | null
    questions?: MatchQuestionUpdateManyWithoutMatchNestedInput
    submissions?: SubmissionUpdateManyWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threadTimeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadSpaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadOriginality?: NullableStringFieldUpdateOperationsInput | string | null
    threadRanking?: NullableStringFieldUpdateOperationsInput | string | null
    questions?: MatchQuestionUncheckedUpdateManyWithoutMatchNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutMatchNestedInput
  }

  export type UserUpsertWithoutMatchPlayersInput = {
    update: XOR<UserUpdateWithoutMatchPlayersInput, UserUncheckedUpdateWithoutMatchPlayersInput>
    create: XOR<UserCreateWithoutMatchPlayersInput, UserUncheckedCreateWithoutMatchPlayersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMatchPlayersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMatchPlayersInput, UserUncheckedUpdateWithoutMatchPlayersInput>
  }

  export type UserUpdateWithoutMatchPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    skillTier?: EnumSkillTierFieldUpdateOperationsInput | $Enums.SkillTier
    elo?: IntFieldUpdateOperationsInput | number
    totalWins?: IntFieldUpdateOperationsInput | number
    totalMatches?: IntFieldUpdateOperationsInput | number
    totalXP?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queueEntries?: QueueEntryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMatchPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    skillTier?: EnumSkillTierFieldUpdateOperationsInput | $Enums.SkillTier
    elo?: IntFieldUpdateOperationsInput | number
    totalWins?: IntFieldUpdateOperationsInput | number
    totalMatches?: IntFieldUpdateOperationsInput | number
    totalXP?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queueEntries?: QueueEntryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MatchQuestionCreateWithoutQuestionInput = {
    id?: string
    order?: number
    match: MatchCreateNestedOneWithoutQuestionsInput
  }

  export type MatchQuestionUncheckedCreateWithoutQuestionInput = {
    id?: string
    matchId: string
    order?: number
  }

  export type MatchQuestionCreateOrConnectWithoutQuestionInput = {
    where: MatchQuestionWhereUniqueInput
    create: XOR<MatchQuestionCreateWithoutQuestionInput, MatchQuestionUncheckedCreateWithoutQuestionInput>
  }

  export type MatchQuestionCreateManyQuestionInputEnvelope = {
    data: MatchQuestionCreateManyQuestionInput | MatchQuestionCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type MatchQuestionUpsertWithWhereUniqueWithoutQuestionInput = {
    where: MatchQuestionWhereUniqueInput
    update: XOR<MatchQuestionUpdateWithoutQuestionInput, MatchQuestionUncheckedUpdateWithoutQuestionInput>
    create: XOR<MatchQuestionCreateWithoutQuestionInput, MatchQuestionUncheckedCreateWithoutQuestionInput>
  }

  export type MatchQuestionUpdateWithWhereUniqueWithoutQuestionInput = {
    where: MatchQuestionWhereUniqueInput
    data: XOR<MatchQuestionUpdateWithoutQuestionInput, MatchQuestionUncheckedUpdateWithoutQuestionInput>
  }

  export type MatchQuestionUpdateManyWithWhereWithoutQuestionInput = {
    where: MatchQuestionScalarWhereInput
    data: XOR<MatchQuestionUpdateManyMutationInput, MatchQuestionUncheckedUpdateManyWithoutQuestionInput>
  }

  export type MatchCreateWithoutQuestionsInput = {
    id?: string
    maxPlayers?: number
    status?: $Enums.MatchStatus
    mode?: $Enums.GameMode
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    threadTimeComplexity?: string | null
    threadSpaceComplexity?: string | null
    threadOriginality?: string | null
    threadRanking?: string | null
    players?: MatchPlayerCreateNestedManyWithoutMatchInput
    submissions?: SubmissionCreateNestedManyWithoutMatchInput
  }

  export type MatchUncheckedCreateWithoutQuestionsInput = {
    id?: string
    maxPlayers?: number
    status?: $Enums.MatchStatus
    mode?: $Enums.GameMode
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    threadTimeComplexity?: string | null
    threadSpaceComplexity?: string | null
    threadOriginality?: string | null
    threadRanking?: string | null
    players?: MatchPlayerUncheckedCreateNestedManyWithoutMatchInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutMatchInput
  }

  export type MatchCreateOrConnectWithoutQuestionsInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutQuestionsInput, MatchUncheckedCreateWithoutQuestionsInput>
  }

  export type QuestionCreateWithoutMatchQuestionsInput = {
    id?: string
    title: string
    description: string
    difficulty?: $Enums.Difficulty
    mode?: $Enums.GameMode
    brokenCode?: string | null
    brokenLanguage?: string | null
    expectedOutput?: string | null
    testCases?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionUncheckedCreateWithoutMatchQuestionsInput = {
    id?: string
    title: string
    description: string
    difficulty?: $Enums.Difficulty
    mode?: $Enums.GameMode
    brokenCode?: string | null
    brokenLanguage?: string | null
    expectedOutput?: string | null
    testCases?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionCreateOrConnectWithoutMatchQuestionsInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutMatchQuestionsInput, QuestionUncheckedCreateWithoutMatchQuestionsInput>
  }

  export type MatchUpsertWithoutQuestionsInput = {
    update: XOR<MatchUpdateWithoutQuestionsInput, MatchUncheckedUpdateWithoutQuestionsInput>
    create: XOR<MatchCreateWithoutQuestionsInput, MatchUncheckedCreateWithoutQuestionsInput>
    where?: MatchWhereInput
  }

  export type MatchUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: MatchWhereInput
    data: XOR<MatchUpdateWithoutQuestionsInput, MatchUncheckedUpdateWithoutQuestionsInput>
  }

  export type MatchUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threadTimeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadSpaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadOriginality?: NullableStringFieldUpdateOperationsInput | string | null
    threadRanking?: NullableStringFieldUpdateOperationsInput | string | null
    players?: MatchPlayerUpdateManyWithoutMatchNestedInput
    submissions?: SubmissionUpdateManyWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threadTimeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadSpaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadOriginality?: NullableStringFieldUpdateOperationsInput | string | null
    threadRanking?: NullableStringFieldUpdateOperationsInput | string | null
    players?: MatchPlayerUncheckedUpdateManyWithoutMatchNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutMatchNestedInput
  }

  export type QuestionUpsertWithoutMatchQuestionsInput = {
    update: XOR<QuestionUpdateWithoutMatchQuestionsInput, QuestionUncheckedUpdateWithoutMatchQuestionsInput>
    create: XOR<QuestionCreateWithoutMatchQuestionsInput, QuestionUncheckedCreateWithoutMatchQuestionsInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutMatchQuestionsInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutMatchQuestionsInput, QuestionUncheckedUpdateWithoutMatchQuestionsInput>
  }

  export type QuestionUpdateWithoutMatchQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    brokenCode?: NullableStringFieldUpdateOperationsInput | string | null
    brokenLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    testCases?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionUncheckedUpdateWithoutMatchQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: EnumDifficultyFieldUpdateOperationsInput | $Enums.Difficulty
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    brokenCode?: NullableStringFieldUpdateOperationsInput | string | null
    brokenLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    expectedOutput?: NullableStringFieldUpdateOperationsInput | string | null
    testCases?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchCreateWithoutSubmissionsInput = {
    id?: string
    maxPlayers?: number
    status?: $Enums.MatchStatus
    mode?: $Enums.GameMode
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    threadTimeComplexity?: string | null
    threadSpaceComplexity?: string | null
    threadOriginality?: string | null
    threadRanking?: string | null
    players?: MatchPlayerCreateNestedManyWithoutMatchInput
    questions?: MatchQuestionCreateNestedManyWithoutMatchInput
  }

  export type MatchUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    maxPlayers?: number
    status?: $Enums.MatchStatus
    mode?: $Enums.GameMode
    startedAt?: Date | string | null
    endedAt?: Date | string | null
    createdAt?: Date | string
    threadTimeComplexity?: string | null
    threadSpaceComplexity?: string | null
    threadOriginality?: string | null
    threadRanking?: string | null
    players?: MatchPlayerUncheckedCreateNestedManyWithoutMatchInput
    questions?: MatchQuestionUncheckedCreateNestedManyWithoutMatchInput
  }

  export type MatchCreateOrConnectWithoutSubmissionsInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutSubmissionsInput, MatchUncheckedCreateWithoutSubmissionsInput>
  }

  export type MatchUpsertWithoutSubmissionsInput = {
    update: XOR<MatchUpdateWithoutSubmissionsInput, MatchUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<MatchCreateWithoutSubmissionsInput, MatchUncheckedCreateWithoutSubmissionsInput>
    where?: MatchWhereInput
  }

  export type MatchUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: MatchWhereInput
    data: XOR<MatchUpdateWithoutSubmissionsInput, MatchUncheckedUpdateWithoutSubmissionsInput>
  }

  export type MatchUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threadTimeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadSpaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadOriginality?: NullableStringFieldUpdateOperationsInput | string | null
    threadRanking?: NullableStringFieldUpdateOperationsInput | string | null
    players?: MatchPlayerUpdateManyWithoutMatchNestedInput
    questions?: MatchQuestionUpdateManyWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    mode?: EnumGameModeFieldUpdateOperationsInput | $Enums.GameMode
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    threadTimeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadSpaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    threadOriginality?: NullableStringFieldUpdateOperationsInput | string | null
    threadRanking?: NullableStringFieldUpdateOperationsInput | string | null
    players?: MatchPlayerUncheckedUpdateManyWithoutMatchNestedInput
    questions?: MatchQuestionUncheckedUpdateManyWithoutMatchNestedInput
  }

  export type MatchPlayerCreateManyUserInput = {
    id?: string
    matchId: string
    rank?: number | null
    score?: number | null
    result?: $Enums.MatchOutcome | null
    xpDelta?: number
    joinedAt?: Date | string
  }

  export type QueueEntryCreateManyUserInput = {
    id?: string
    joinedAt?: Date | string
    active?: boolean
  }

  export type MatchPlayerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    result?: NullableEnumMatchOutcomeFieldUpdateOperationsInput | $Enums.MatchOutcome | null
    xpDelta?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type MatchPlayerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    result?: NullableEnumMatchOutcomeFieldUpdateOperationsInput | $Enums.MatchOutcome | null
    xpDelta?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchPlayerUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    result?: NullableEnumMatchOutcomeFieldUpdateOperationsInput | $Enums.MatchOutcome | null
    xpDelta?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueEntryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QueueEntryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QueueEntryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MatchPlayerCreateManyMatchInput = {
    id?: string
    userId: string
    rank?: number | null
    score?: number | null
    result?: $Enums.MatchOutcome | null
    xpDelta?: number
    joinedAt?: Date | string
  }

  export type MatchQuestionCreateManyMatchInput = {
    id?: string
    questionId: string
    order?: number
  }

  export type SubmissionCreateManyMatchInput = {
    id?: string
    userId: string
    questionId: string
    code: string
    language: string
    charCount?: number | null
    stdout?: string | null
    stderr?: string | null
    exitCode?: number | null
    execTimeMs?: number | null
    testsPassed?: number
    testsTotal?: number
    timeComplexity?: string | null
    timeScore?: number | null
    spaceComplexity?: string | null
    spaceScore?: number | null
    originalityScore?: number | null
    relevanceScore?: number | null
    submittedAt?: Date | string
  }

  export type MatchPlayerUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    result?: NullableEnumMatchOutcomeFieldUpdateOperationsInput | $Enums.MatchOutcome | null
    xpDelta?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMatchPlayersNestedInput
  }

  export type MatchPlayerUncheckedUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    result?: NullableEnumMatchOutcomeFieldUpdateOperationsInput | $Enums.MatchOutcome | null
    xpDelta?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchPlayerUncheckedUpdateManyWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    result?: NullableEnumMatchOutcomeFieldUpdateOperationsInput | $Enums.MatchOutcome | null
    xpDelta?: IntFieldUpdateOperationsInput | number
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchQuestionUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    question?: QuestionUpdateOneRequiredWithoutMatchQuestionsNestedInput
  }

  export type MatchQuestionUncheckedUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type MatchQuestionUncheckedUpdateManyWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type SubmissionUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    charCount?: NullableIntFieldUpdateOperationsInput | number | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    exitCode?: NullableIntFieldUpdateOperationsInput | number | null
    execTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    testsPassed?: IntFieldUpdateOperationsInput | number
    testsTotal?: IntFieldUpdateOperationsInput | number
    timeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    timeScore?: NullableFloatFieldUpdateOperationsInput | number | null
    spaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    spaceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    originalityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    relevanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    charCount?: NullableIntFieldUpdateOperationsInput | number | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    exitCode?: NullableIntFieldUpdateOperationsInput | number | null
    execTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    testsPassed?: IntFieldUpdateOperationsInput | number
    testsTotal?: IntFieldUpdateOperationsInput | number
    timeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    timeScore?: NullableFloatFieldUpdateOperationsInput | number | null
    spaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    spaceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    originalityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    relevanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    charCount?: NullableIntFieldUpdateOperationsInput | number | null
    stdout?: NullableStringFieldUpdateOperationsInput | string | null
    stderr?: NullableStringFieldUpdateOperationsInput | string | null
    exitCode?: NullableIntFieldUpdateOperationsInput | number | null
    execTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    testsPassed?: IntFieldUpdateOperationsInput | number
    testsTotal?: IntFieldUpdateOperationsInput | number
    timeComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    timeScore?: NullableFloatFieldUpdateOperationsInput | number | null
    spaceComplexity?: NullableStringFieldUpdateOperationsInput | string | null
    spaceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    originalityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    relevanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchQuestionCreateManyQuestionInput = {
    id?: string
    matchId: string
    order?: number
  }

  export type MatchQuestionUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    match?: MatchUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type MatchQuestionUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type MatchQuestionUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}