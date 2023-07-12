import './RepeatExpensesPopup.scss';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import Tabs from '../Tabs/Tabs';
import { arrCategoriesDate, arrCategoriesWeek } from '../../utils/consts';
import Radio from '../../ui/Radio/Radio';
import InputData from '../InputData/InputDate';
import { addRepeatSpendBox } from '../../store/slices/repeatSpendSlice';
import SelectButtonWrapper from '../SelectButtonWrapper/SelectButtonWrapper';
import Checkbox from './checkbox';

export default function RepeatExpensesPopup({ onClose }) {
  const dispatch = useDispatch();

  const [arrActiveDay, setArrActiveDay] = useState([]);
  const [activeType, setActiveType] = useState('Ежедневно');
  const [selected, setSelected] = useState('Бесконечно');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    created: '',
    // 0 Day, 1 Week, 2 Month
    repeat_type: 0,
    // 0-Endlessy 1-Date
    repeat_period: 0,
    type_week: [],
    to_date: '',
  });

  const { name, amount, category } = formData;

  // выбираем только расходные
  const { userCategories } = useSelector((state) => state.userFinanceAndCategories);
  const expenseCategories = userCategories.filter((cat) => cat.category_type === 1);

  useMemo(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-nested-ternary
    const type = activeType === 'Ежедневно' ? 0 : activeType === 'Еженедельно' ? 1 : 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const period = selected === 'Указать дату окончания' ? 1 : 0;

    if (type === 1) {
      setFormData({
        ...formData,
        repeat_type: type,
        repeat_period: period,
        type_week: arrActiveDay,
      });
      console.log(arrActiveDay);
    } else {
      setFormData({ ...formData, repeat_type: type, repeat_period: period });
    }
  }, [activeType, selected, arrActiveDay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(formData);
    dispatch(addRepeatSpendBox(formData)).then(() => {
      console.log('2', formData);
      onClose();
    });
  };

  const handleChangeDay = (e) => {
    const { checked } = e.target;
    const checkedName = e.target.name;
    if (checked === true) {
      setArrActiveDay((prev) => [...prev, checkedName]);
    } else {
      setArrActiveDay(arrActiveDay?.filter((i) => i !== checkedName));
    }
  };

  const handleDateClick = (tab) => {
    setActiveType(tab);
  };

  const handleСancel = (evt) => {
    evt.preventDefault();
    onClose();
  };

  const handleRadio = (evt) => {
    setSelected(evt.target.value);
  };

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleDateChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      created: value,
    }));
  };

  const handleToDateChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      to_date: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: value,
    }));
  };

  return (
    <Popup onClose={onClose} popupSize="popup_repeat" title="Создать повторяющийся расход">
      <form className="form repeat-expenses" onSubmit={handleSubmit}>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="repeat-expenses-name">
            Название
            <input
              className="form__input"
              type="text"
              name="name"
              id="repeat-expenses-name"
              placeholder="Название транзакции"
              value={name}
              onChange={handleChange}
            />
          </label>
        </div>

        <SelectButtonWrapper
          label="Категория"
          options={expenseCategories}
          value={category}
          name="category"
          imageKey="image"
          nameKey="name"
          altText="Иконка категории"
          handleOptionChange={handleCategoryChange}
        />

        <InputData
          labelTitle="Дата"
          inputStyleName="repeat-expenses-startDate"
          inputName="created"
          value={startDate}
          onChange={handleDateChange}
          setValueDate={setStartDate}
        />

        <div className="form__input-block">
          <label
            className="form__input-label form__input-label_divider"
            htmlFor="repeat-expenses-amount"
          >
            Сумма
            <input
              className="form__input form__input_sum"
              type="number"
              name="amount"
              id="repeat-expenses-amount"
              placeholder="0"
              value={amount}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form__text-content">
          <p className="form__text-bold">Как часто повторять расход?</p>
        </div>

        <div className="repeat-expenses__tab">
          <Tabs
            arr={arrCategoriesDate}
            size="tab-size_l"
            activeInit={activeType}
            onClick={handleDateClick}
          />
        </div>
        {activeType === 'Еженедельно' && (
          <div className="repeat-expenses__tab">
            {arrCategoriesWeek.map((item) => {
              return (
                <li className="repeat-expenses__week-day" key={item.id}>
                  <Checkbox name={item.title} handleChangeDay={handleChangeDay}>
                    {item.title}
                  </Checkbox>
                </li>
              );
            })}
          </div>
        )}

        <div className="repeat-expenses__container">
          <p className="repeat-expenses__text-bold">Как долго повторять расход?</p>
          <Radio
            value="Бесконечно"
            isChecked={selected === 'Бесконечно'}
            onChange={handleRadio}
            text="Бесконечно"
          />
          <Radio
            value="Указать дату окончания"
            isChecked={selected === 'Указать дату окончания'}
            onChange={handleRadio}
            text="Указать дату окончания"
          />
          {selected === 'Указать дату окончания' && (
            <InputData
              labelTitle="Дата"
              inputStyleName="repeat-expenses-endDate"
              inputName="to_date"
              value={endDate}
              onChange={handleToDateChange}
              setValueDate={setEndDate}
            />
          )}
        </div>

        <div className="form__button-wrapper form__button-wrapper_add-operation">
          <Button
            variant="secondary"
            content="text"
            text="Отменить"
            size="medium"
            onClick={handleСancel}
          />
          <Button type="submit" variant="primary" content="text" text="Сохранить" size="medium" />
        </div>
      </form>
    </Popup>
  );
}
