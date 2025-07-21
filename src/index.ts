import * as Function from "fp-ts/function";
import * as IOEither from "fp-ts/IOEither";
import * as Random from "fp-ts/Random";

const SYMBOL_NAME: unique symbol = Symbol("name");

type Name = {
  first: string;
  last: string;
  [SYMBOL_NAME]: "name";
};

function name({ first, last }: Record<"first" | "last", string>): Name {
  return { first, last, [SYMBOL_NAME]: "name" };
}

function getNameFirst(): IOEither.IOEither<"ErrorNameFirst", string> {
  return Function.pipe(
    IOEither.fromIO(Random.random),
    IOEither.flatMap((random) => {
      return random < 0.9
        ? IOEither.right("Jesuseun")
        : IOEither.left("ErrorNameFirst" as const);
    }),
  );
}

function getNameLast(): IOEither.IOEither<"ErrorNameLast", string> {
  return Function.pipe(
    IOEither.fromIO(Random.random),
    IOEither.flatMap((random) => {
      return random < 0.9
        ? IOEither.right("Olatunde")
        : IOEither.left("ErrorNameLast" as const);
    }),
  );
}

{
  const first = getNameFirst();
  const last = getNameLast();

  const result = Function.pipe(
    IOEither.Do,
    IOEither.apSW("first", first),
    IOEither.apSW("last", last),
    IOEither.map(name),
  );
}
