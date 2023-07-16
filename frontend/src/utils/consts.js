import imgProfile from '../Images/image-profile.svg';
import imgBudget from '../Images/image-budget.svg';
import imgStatistics from '../Images/image-statistics.svg';

import categories from '../Images/categories.svg';
import statistics from '../Images/statistics.svg';
import money from '../Images/money.svg';
import moneyenvelope from '../Images/moneyenvelope.svg';

export const RegExLogin = '[da-zA-Zа-яА-ЯЁё/_.+-]+';
export const RegExEmail = '[da-zA-Z_.@-]+';
export const RegExName = '[^d!@#$%|^&*\\/()_+\n\t]+';
export const RegExSurname = '[^d!@#$%|^&*\\/()_+\n\t]+';
export const RegExPassword = '[da-zA-Z_ .!"#$%&,-]+';
export const RegExPhone = '[d+()]+';
export const RegExSpendOperationName = '[a-zA-Zа-яА-ЯЁё]+';
export const RegExEarnOperationName = '[a-zA-Zа-яА-ЯЁё‐— -]+';
export const RegExOperationAmount = '[d]+';

export const RequirementsLogin =
  'Имя пользователя должно состоять только из латинских букв (в верхнем или нижнем регистре), цифр, символов(_ . + -) и иметь длину от 2 до 25 символов. Пожалуйста, не используйте пробелы или другие символы. Регистр букв не учитывается.';
export const RequirementsEmail =
  'Адрес электронной почты может содержать только цифры, латинские буквы и специальные символы (@ - _ .) и должен иметь длину от 7 до 129 символов.';
export const RequirementsPassword =
  'Длина пароля должна быть от 8 до 40 символов. Используйте как минимум одну прописную (заглавную) латинскую букву, строчную латинскую букву, цифру (но не только цифры) и специальные символы (пробел ! " # $ % & . ,). Пароль чувствителен к регистру.';
export const RequirementsNameAndSurname =
  'Личные данные пользователя могут содержать прописные и строчные буквы, пробел в середине, дефис и тире и должны иметь длину от 0 до 50 символов. Регистр букв не учитывается.';

export const arrCategoriesСommon = [
  {
    title: 'Общие',
    id: '1',
  },
  {
    title: 'Расходы',
    id: '2',
  },
  {
    title: 'Доходы',
    id: '3',
  },
];

export const arrCategoriesDate = [
  {
    title: 'Ежедневно',
    number: 0,
    id: '1',
  },
  {
    title: 'Еженедельно',
    number: 1,
    id: '2',
  },
  {
    title: 'Ежемесячно',
    number: 2,
    id: '3',
  },
];

export const arrCategoriesWeek = [
  {
    title: 'Пн',
    id: '1',
    isActive: false,
  },
  {
    title: 'Вт',
    id: '2',
    isActive: false,
  },
  {
    title: 'Ср',
    id: '3',
    isActive: false,
  },
  {
    title: 'Чт',
    id: '4',
    isActive: false,
  },
  {
    title: 'Пт',
    id: '5',
    isActive: false,
  },
  {
    title: 'Сб',
    id: '6',
    isActive: false,
  },
  {
    title: 'Вс',
    id: '7',
    isActive: false,
  },
];

export const arrInitFQA = [
  {
    id: '1',
    question: 'Как добавить доход?',
    answer:
      'По кнопке «+ Расход» в фильтрации на странице Бюджет. Нужно заполнить все необходимые поля, выбрать счёт с которого была проведена транзакция и подходящую категорию. Останется лишь нажать на кнопку «Готово» и транзакция отразится в таблице, а также на графиках.',
  },
  {
    id: '2',
    question: 'Где отслеживать динамику?',
    answer:
      'Отслеживать соотношение расходов и доходов можно на странице «Бюджет» исходя из вашего баланса. На странице «Статистика» предоставлено полное отслеживание динамики ваших расходов и доходов на разных графиках.',
  },
  {
    id: '3',
    question: 'Как добавлять свои категории?',
    answer:
      'В отображаемых категориях нужно нажать на кнопку «Добавить/Редактировать», после чего можно будет добавить свою категорию. Задайте ей название, выберите иконку и к чему она будет прикреплена, к расходам или доходам.',
  },
  {
    id: '4',
    question: 'Как пользоваться конвертом на накопления?',
    answer:
      'Он нужен, чтобы задавать цель, на которую вы хотите накопить и откладывать туда ваши накопления. Добавьте туда новую цель, задайте ей название и заполните все необходимые поля. По клику на цель вы можете каждый раз пополнять конверт и быть ближе к своей цели. Когда вы накопите желаемую сумму, вы сможете потратить ее и она сразу отобразится в таблице.',
  },
  {
    id: '5',
    question: 'Как занести повторяющиеся расходы?',
    answer:
      'Нажмите на кнопку «Добавить» и заполните необходимые поля. Обязательно выберите дату и длительность повторяющихся расходов, чтобы они повторялись тогда, когда вам это нужно и с нужной периодичностью. После того, как вы настроите повторяющиеся расходы, вам больше не придется заносить их в таблицу каждый раз.',
  },
  {
    id: '6',
    question: 'Как пользоваться фильтрацией?',
    answer:
      'В фильтрации можно выбирать конкретный период, в который вы хотите посмотреть осуществленные транзакции, а также выбирать конкретные даты в календаре. ',
  },
  {
    id: '7',
    question: 'Как работают отображаемые категории?',
    answer:
      'В отображаемых категориях можно выбрать, что вы хотите видеть в своей таблице. Можно как расходы и доходы, так и все транзакции вместе. Помимо этого можно выбирать определенные категории, которые вас интересуют в данный момент.',
  },
];

export const arrInitFQAHome = [
  {
    id: '1',
    question: 'Как учитывать бюджет, если у меня несколько карт или я использую наличку?',
    answer: 'Будет значок с общим приходом и расходом',
  },
  {
    id: '2',
    question: 'Зарплату надо заносить каждый месяц вручную?',
    answer:
      'В отображаемых категориях нужно нажать на кнопку «Добавить/Редактировать», после чего можно будет добавить свою категорию. Задайте ей название, выберите иконку и к чему она будет прикреплена, к расходам или доходам.',
  },
  {
    id: '3',
    question: 'Можно ли отслеживать статистику расходов?',
    answer:
      'Отслеживать соотношение расходов и доходов можно на странице «Бюджет» исходя из вашего баланса. На странице «Статистика» предоставлено полное отслеживание динамики ваших расходов и доходов на разных графиках.',
  },
];

export const arrAdvantages = [
  {
    id: '1',
    title: 'Категории',
    description:
      'Используй стандартные категории, такие как транспорт, продукты, здоровье и другие, или создавай свои',
    icon: categories,
  },
  {
    id: '2',
    title: 'Статистика',
    description:
      'Отслеживай статистику и определяй, какие категории занимают большую часть в твоем бюджете',
    icon: statistics,
  },
  {
    id: '3',
    title: 'Повторяющиеся расходы',
    description:
      'Настрой повторние расходов и приложение будет автоматически добавлять расходы и доходы',
    icon: money,
  },
  {
    id: '4',
    title: 'Конверт накоплений',
    description: 'Создавай и достигай цели накоплений с помощью InCoin',
    icon: moneyenvelope,
  },
];

export const arrCardWorks = [
  {
    id: '1',
    title: 'Создай аккаунт',
    description:
      'Процесс регистрации у нас максимально простой -  всего несколько полей, чтобы создать вашу учетную запись. Вы сразу сможете начать использовать все функции приложения. Одно из главных преимуществ регистрации заключается в том, что ваши финансовые данные становятся доступными с любого устройства, где бы вы ни находились.',
    img: imgProfile,
    number: '01',
  },
  {
    id: '2',
    title: 'Заполняй расходы и доходы по категориям',
    description:
      'Система категоризации расходов помогает вам классифицировать траты по различным областям, таким как питание, транспорт, развлечения, медицина и многие другие. Благодаря этому, вы сможете отследить, на что именно уходят ваши деньги и какие категории занимают большую долю в вашем бюджете.',
    img: imgBudget,
    number: '02',
  },
  {
    id: '3',
    title: 'Следи за динамикой',
    description:
      'Кроме того, анализ расходов по категориям помогает вам установить финансовые цели и следить за их достижением. Например, если вашей целью является сокращение расходов на развлечения, вы сможете отслеживать, насколько успешно вы справляетесь с этой задачей и насколько близко вы подходите к достижению желаемого уровня трат.',
    img: imgStatistics,
    number: '03',
  },
];

export const timeIntervals = [
  { id: 'today', name: 'Сегодня' },
  { id: 'week', name: 'Неделя' },
  { id: 'month', name: 'Месяц' },
  { id: 'year', name: 'Год' },
  { id: 'all', name: 'Вся история' },
];

// export const arrCalendar = [
//   [1, 2, 3, 4, 5, 6, 7][(8, 9, 10, 11, 12, 13, 14)][(15, 16, 17, 18, 19, 20, 21)][
//     (22, 23, 24, 25, 26, 27, 28)
//   ][(29, 30, 31)],
// ];
