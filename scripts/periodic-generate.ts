import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { deduplicate } from "@phanect/utils";
import { XMLParser } from "fast-xml-parser";

const generateCurrencyEnum = async () => {
  type SixGroupIsoCurrencyList = {
    ISO_4217: {
      CcyTbl: {
        CcyNtry: {
          CtryNm: string;
          CcyNm: string;
          Ccy: string;
          CcyNbr: string;
          CcyMnrUnts: number;
        }[];
      };
    };
  };

  const res = await fetch("https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml");
  const xmlText = await res.text();
  const xml = new XMLParser().parse(xmlText) as SixGroupIsoCurrencyList;

  const currencyCodes = deduplicate(
    xml.ISO_4217.CcyTbl.CcyNtry.map(({ CtryNm, CcyNm, Ccy }) => ({
      name: CcyNm,
      country: CtryNm,
      code: Ccy,
    })).map((currency) => currency.code)
      .filter((code) => code)
      .sort((codeA, codeB) => codeA > codeB ? 1 : -1)
  );

  const generatedSchema = `enum Currency {
    ${ currencyCodes.join("\n  ") }
  }`;

  const prismaSchemaPath = join(import.meta.dirname, "../prisma/schema.prisma");
  const separator = "// ↓ AUTO_GENERATED_DO_NOT_EDIT ↓";

  const prismaSchemaBefore = (await readFile(prismaSchemaPath)).toString();
  const [ prismaSchemaDeveloperModifiableSection ] = prismaSchemaBefore.split(separator);

  await writeFile(
    prismaSchemaPath,
    prismaSchemaDeveloperModifiableSection + separator + "\n\n" + generatedSchema + "\n",
  );
};

await generateCurrencyEnum();
