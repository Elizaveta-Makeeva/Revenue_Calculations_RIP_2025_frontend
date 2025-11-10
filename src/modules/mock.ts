import type { Period, PeriodsResult } from "./periodsApi";

export const PERIODS_MOCK: PeriodsResult = {
  resultCount: 3,
  results: [
    {
      id: 1,
      title: "3 месяца",
      description: "Краткосрочный период для анализа трендов выручки. Идеально подходит для быстрого прогнозирования и оценки сезонных колебаний.",
      duration: "3 месяца",
      short_description: "Краткосрочный период анализа",
      detailed_description: "Подробный анализ выручки за 3 месяца с учетом сезонных факторов и краткосрочных трендов.",
      img: "http://127.0.0.1:9000/periods/12months.png",
      is_active: true
    },
    {
      id: 2,
      title: "6 месяцев",
      description: "Среднесрочный период для более точного прогнозирования выручки. Позволяет учитывать полугодовые циклы бизнеса.",
      duration: "6 месяцев",
      short_description: "Среднесрочный период анализа",
      detailed_description: "Комплексный анализ выручки за 6 месяцев с выявлением среднесрочных трендов и цикличности.",
      img: "http://127.0.0.1:9000/periods/12months.png",
      is_active: true
    },
    {
      id: 3,
      title: "12 месяцев",
      description: "Годовой период для комплексного анализа выручки. Учитывает все сезонные колебания и годовые тренды бизнеса.",
      duration: "12 месяцев",
      short_description: "Годовой период анализа",
      detailed_description: "Полный годовой анализ выручки с учетом всех сезонных факторов, трендов и бизнес-циклов.",
      img: "http://127.0.0.1:9000/periods/12months.png",
      is_active: true
    }
  ],
};