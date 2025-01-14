import { Result } from "@/common/utils";
import { Letter } from "@/models";

export interface LetterRepository {
    save(letter: Letter): Promise<Result<void, string>>;
}