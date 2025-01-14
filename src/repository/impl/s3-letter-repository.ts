import { injectable } from "tsyringe";
import { LetterRepository } from "../letter-repository";
import { Letter } from "@/models";
import { CurrentEnvironment } from "@/environment";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fromUtf8 } from '@aws-sdk/util-utf8-node';
import { Result } from "@/common/utils";


@injectable()
export class S3LetterRepository implements LetterRepository {

    async save(letter: Letter): Promise<Result<void, string>> {
        try {
            const payload = {
                Bucket: CurrentEnvironment.letterBucket,
                Key: `${letter.filename}.json`,
                Body: fromUtf8(letter.toString()),
                ContentType: 'application/json'
            };

            const s3Client = new S3Client({
                region: CurrentEnvironment.region
            });
            const command = new PutObjectCommand(payload);

            await s3Client.send(command);

            return Result.ok(undefined);
        }
        catch (error: any) {
            switch (error?.name) {
                case 'NetworkingError':
                    return Result.failure('Estamos enfrentando dificuldades ao salvar a carta ...');
                case 'NoSuchKey':
                case 'NoSuchBucket':
                    return Result.failure('O buckedt informado não existe!');
                default: 
                    return Result.failure(`Não foi possível salvar a carta detalhe: ${error?.message || error}`);
            }
        }
    }

}