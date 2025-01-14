import { Result } from "@/common/utils";
import { isBefore } from 'date-fns';

export interface LetterProps {
    title: string;
    body: string;
    signature: string;
    date: Date;
    to: string;
}

export class Letter { 

    readonly data: LetterProps;

    public get filename(): string {
        return this.data.date.toISOString();
    }

    public toString(): string {
        return JSON.stringify(this.data);
    }

    private constructor(data: LetterProps) {
        this.data = data;
    }

    static build(data: LetterProps): Result<Letter, string> {
        if (!data.date) {
            return Result.failure('Você Precisa informar uma data!');
        }

        if (isBefore(data.date, new Date())) {
            return Result.failure('Você precisa informar uma data futura!');
        }

        if (!data.title) {
            return Result.failure('Você precisa informar um titulo');
        }

        if (!data.body) {
            return Result.failure('Você precisa informar um corpo de email');
        }

        return Result.ok(new Letter({
            ...data,
            date: new Date(data.date)
        }));
    }
}