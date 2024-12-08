import { TokenTypeEnum } from '../enums/token-type.enum';
import { ITokenGenerator } from './token-generator.interface';

export interface ITokenGeneratorFactoryConfig {
  addTokenGenerator(tokenType: TokenTypeEnum, tokenGenerator: ITokenGenerator): void;
}
