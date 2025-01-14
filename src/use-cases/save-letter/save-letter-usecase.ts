import { UseCase, UseCaseExecutor } from "@/common/decorators";
import { SaveLetterInput } from "./save-letter-input";
import { SaveLetterOutput } from "./save-letter-output";
import { inject, injectable } from "tsyringe";
import { HttpError } from "@/common/errors";
import { Result } from "@/common/utils";
import { AppLogger } from "@/common/app-logger";
import { LetterRepository } from "@/repository";
import { Letter } from "@/models";


@injectable()
@UseCase('POST', '/letter')
export class SaveLetterUseCase implements UseCaseExecutor<SaveLetterInput, SaveLetterOutput> {
    constructor(
       @inject("LetterRepository") private readonly letterRepository: LetterRepository
    ) { }

    async execute(input: SaveLetterInput): Promise<Result<SaveLetterOutput, HttpError | undefined>> {
        AppLogger.info('SaveLetter', JSON.stringify(input));

        const letter = Letter.build(input);
        const value = letter.value();

        if (letter.isFailure()) {
            return Result.failure(HttpError.badRequest(value as string));
        }

        const result = await this.letterRepository.save(value as Letter);

        if (result.isFailure()) {
            return Result.failure(HttpError.badRequest(result.value() as string))
        }

        return Result.ok({
            responseStatus: 201,
        } satisfies SaveLetterOutput);
    }

}