// import * as Function from "@lib/fp-ts/Function.js";
// import * as IO from "@lib/fp-ts/IO.js";
// import * as IOEither from "@lib/fp-ts/IOEither.js";
// import * as from "@lib/fp-ts/Random.js";

import { pipe } from "fp-ts/function";
import { execute } from "fp-ts-std/IO";
import {
  map,
  type IOEither,
  fromIO,
  Do,
  flatMap,
  left,
  right,
  apSW,
} from "fp-ts/IOEither";
import { random } from "fp-ts/Random";

const SYMBOL_NAME: unique symbol = Symbol("name");

type Name = {
  first: string;
  last: string;
  [SYMBOL_NAME]: "name";
};

function name({ first, last }: Record<"first" | "last", string>): Name {
  return { first, last, [SYMBOL_NAME]: "name" };
}

function getNameFirst(): IOEither<"ErrorNameFirst", string> {
  return pipe(
    fromIO(random),
    flatMap((random) => {
      return random < 0.9 ? right("Jesuseun") : left("ErrorNameFirst" as const);
    }),
  );
}

function getNameLast(): IOEither<"ErrorNameLast", string> {
  return pipe(
    fromIO(random),
    flatMap((random) => {
      return random < 0.9 ? right("Olatunde") : left("ErrorNameLast" as const);
    }),
  );
}

{
  const first = getNameFirst();
  const last = getNameLast();

  const result = pipe(
    Do,
    apSW("first", first),
    apSW("last", last),
    map(name),
    execute,
  );

  console.log(result);
  console.log(result);
}
