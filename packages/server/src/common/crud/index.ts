import { ObjectLiteral, Repository } from 'typeorm';

export async function baseCreate<
  T extends Repository<U>,
  U extends ObjectLiteral,
  K
>(repository: T, input: K) {
  const [result] = await repository
    .createQueryBuilder()
    .insert()
    .values({ ...input })
    .returning('*')
    .execute()
    .then(
      results =>
        results.identifiers.map((idObject, i) => ({
          ...idObject,
          ...results.generatedMaps[i]
        })) as U[]
    );
  return result;
}
