export enum WordStatus {
    Learning = 1,
    Reviewing = 2,
    Mastered = 3,
}

export const WORD_STATUS_OPTIONS = [
    { value: WordStatus.Learning, label: "Learning" },
    { value: WordStatus.Reviewing, label: "Reviewing" },
    { value: WordStatus.Mastered, label: "Mastered" },
];

export const WORD_STATUS_LABEL_MAP: Record<WordStatus, string> =
    WORD_STATUS_OPTIONS.reduce((acc, cur) => {
        acc[cur.value] = cur.label;
        return acc;
    }, {} as Record<WordStatus, string>);

export const WORD_STATUS_BADGE_VARIANT_MAP: Record<WordStatus, "default" | "secondary" | "outline" | "destructive"> = {
    [WordStatus.Learning]: "secondary",
    [WordStatus.Reviewing]: "outline",
    [WordStatus.Mastered]: "default",
};

