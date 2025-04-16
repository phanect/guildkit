import { mkdir, writeFile } from "fs/promises";
import currencies from "currency-codes/data.json" with { type: "json" };
import { join } from "path";

const schema = `enum Currency {
  ${ currencies.map((currency) => currency.code).join("\n  ") }
}`;

await mkdir(join(import.meta.dirname, "../prisma/schema"), { recursive: true });
await writeFile(join(import.meta.dirname, "../prisma/schema/generated.prisma"), schema);
