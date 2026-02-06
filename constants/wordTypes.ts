
export enum WordTypes {
    Noun = 10,
    Verb = 11,
    Adjective = 12,
    Adverb = 13
}

export const WORD_TYPES_OPTIONS = [
    { value: WordTypes.Noun, label: "Noun" },
    { value: WordTypes.Verb, label: "Verb" },
    { value: WordTypes.Adjective, label: "Adjective" },
    { value: WordTypes.Adverb, label: "Adverb" }
]

export const WORD_TYPES_LABEL_MAP: Record<WordTypes, string> =
    WORD_TYPES_OPTIONS.reduce((acc, cur) => {
        acc[cur.value] = cur.label;
        return acc;
    }, {} as Record<WordTypes, string>);

export const WORD_TYPES_BADGE_VARIANT_MAP: Record<WordTypes, "default" | "secondary" | "outline" | "destructive"> = {
    [WordTypes.Noun]: "secondary",
    [WordTypes.Verb]: "outline",
    [WordTypes.Adjective]: "destructive",
    [WordTypes.Adverb]: "default",
};
