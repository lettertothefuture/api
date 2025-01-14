import { registry } from "tsyringe";
import { S3LetterRepository } from '@/repository/impl';

@registry([
    { token: 'LetterRepository', useClass: S3LetterRepository }
])
export class Registry {

}