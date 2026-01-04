export enum WordType {
    Noun = "noun",
    Verb = "verb",
    Adjective = "adjective",
    Adverb = "adverb"
}

export enum WordStatus {
    Learning = "learning",
    Reviewing = "reviewing",
    Mastered = "mastered"
}
export interface VocabularyCard {
    id: number;
    type: WordType;
    word: string;
    phonetic: string;
    definition: string;
    example: string;
    status: WordStatus;
}

export const VocabularyCardWord: VocabularyCard[] = [
    {
        id: 1,
        type: WordType.Noun,
        word: "Serendipity",
        phonetic: "/ˌser.ənˈdɪp.ə.ti/",
        definition: "The occurrence of events by chance in a happy or beneficial way.",
        example: "It was pure serendipity that we met at the coffee shop.",
        status: WordStatus.Mastered
    },
    {
        id: 2,
        type: WordType.Adjective,
        word: "Ephemeral",
        phonetic: "/ɪˈfem.ər.əl/",
        definition: "Lasting for a very short time.",
        example: "Fashion trends are often ephemeral.",
        status: WordStatus.Reviewing
    },
    {
        id: 3,
        type: WordType.Adjective,
        word: "Ubiquitous",
        phonetic: "/juːˈbɪk.wə.təs/",
        definition: "Present, appearing, or found everywhere.",
        example: "Smartphones are ubiquitous in modern society.",
        status: WordStatus.Learning
    },
    {
        id: 4,
        type: WordType.Noun,
        word: "Resilience",
        phonetic: "/rɪˈzɪl.jəns/",
        definition: "The capacity to recover quickly from difficulties.",
        example: "Her resilience helped her overcome many obstacles.",
        status: WordStatus.Mastered
    },
    {
        id: 5,
        type: WordType.Verb,
        word: "Mitigate",
        phonetic: "/ˈmɪt.ɪ.geɪt/",
        definition: "To make something less severe or serious.",
        example: "New policies were introduced to mitigate the risks.",
        status: WordStatus.Learning
    }
];
