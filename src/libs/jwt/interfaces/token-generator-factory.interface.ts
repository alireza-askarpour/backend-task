import { TokenTypeEnum } from '../enums/token-type.enum';
import { ITokenGenerator } from './token-generator.interface';

/**
 * Creates and returns an appropriate token generator based on the specified token type.
 *
 * @param type - The type of the token to generate. This should be a value from the TokenTypeEnum,
 *               representing the desired token type (e.g., ACCESS, REFRESH, CONFIRMATION, etc.).
 * @returns An instance of a token generator capable of creating tokens of the specified type.
 */
export interface ITokenGeneratorFactory {
  createTokenGenerator(tokenType: TokenTypeEnum): ITokenGenerator;
}
