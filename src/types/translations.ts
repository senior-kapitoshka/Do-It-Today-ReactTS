export interface TranslationSet {
    placeholder: string;
    remaining: (count: number, word: string) => string;
    all: string;
    active: string;
    completed: string;
    clear: string;
    getTaskWord: (count: number) => string;
  }
  
  export const translations: Record<'ru' | 'en', TranslationSet> = {
    ru: {
      placeholder: "Какие планы на сегодня?",
      remaining: (count: number, word: string) => {
        const mod10 = count % 10;
        const mod100 = count % 100;
        const verb =
          mod10 === 1 && mod100 !== 11 ? "Осталась" : "Осталось";
        return `${verb} ${count} ${word}!`;
      },
      all: "все",
      active: "активные",
      completed: "завершенные",
      clear: "очистить",
      getTaskWord: (count: number) => {
        const mod10 = count % 10;
        const mod100 = count % 100;
        if (mod10 === 1 && mod100 !== 11) return "задача";
        if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "задачи";
        return "задач";
      },
    },    
    en: {
      placeholder: "What needs to be done?",
      remaining: (count, word) => `${count} ${word} left!`,
      all: "all",
      active: "active",
      completed: "completed",
      clear: "clear completed",
      getTaskWord: (count) => (count === 1 ? "item" : "items"),
    },
  };
  