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
import { arrCalendar, toISOString } from '../../utils/helpers';

export default function RepeatExpensesPopup({ onClose }) {
  const dispatch = useDispatch();

  const [arrActiveDay, setArrActiveDay] = useState([]);
  const [activeType, setActiveType] = useState('Ежедневно');
  const [selected, setSelected] = useState('Бесконечно');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // выбираем только расходные
  const { userCategories } = useSelector((state) => state.userFinanceAndCategories);
  const expenseCategories = userCategories.filter((cat) => cat.category_type === 1);
  const arrDay = arrCalendar();

  const [formData, setFormData] = useState({
    category: expenseCategories[0].id,
    created: '',
    repeat_type: 0,
    repeat_period: 0,
    type_week: [],
    to_date: '',
  });

  useMemo(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-nested-ternary
    const type = activeType === 'Ежедневно' ? 0 : activeType === 'Еженедельно' ? 1 : 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const period = selected === 'Указать дату окончания' ? 2 : 0;

    if (type === 1) {
      setFormData({
        ...formData,
        repeat_type: type,
        repeat_period: period,
        type_week: arrActiveDay,
      });
    } else if (type === 2) {
      setFormData({
        ...formData,
        repeat_type: type,
        repeat_period: period,
        type_day: arrActiveDay,
      });
    } else {
      setFormData({
        ...formData,
        repeat_type: type,
        repeat_period: period,
      });
    }
  }, [activeType, selected, arrActiveDay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRepeatSpendBox(formData)).then(() => {
      // console.log(formData);
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

  const handleDateChange = (value) => {
    const date = Date(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      created: toISOString(date),
    }));
  };

  const handleToDateChange = (value) => {
    const date = Date(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      to_date: toISOString(date),
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
              onChange={(evt) => {
                setFormData({ ...formData, [evt.target.name]: evt.target.value });
              }}
            />
          </label>
        </div>

        <SelectButtonWrapper
          label="Категория"
          options={expenseCategories}
          initialValue={formData.category}
          imageKey="image"
          nameKey="name"
          altText="Иконка категории"
          handleOptionChange={(value) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              category: value,
            }))
          }
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
              onChange={(evt) => setFormData({ ...formData, [evt.target.name]: +evt.target.value })}
            />
          </label>
        </div>

        <InputData
          labelTitle="Дата"
          inputStyleName="repeat-expenses-startDate"
          inputName="created"
          value={startDate}
          onChange={handleDateChange}
          setValueDate={setStartDate}
        />

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
                <Checkbox name={item.title} handleChangeDay={handleChangeDay}>
                  {item.title}
                </Checkbox>
              );
            })}
          </div>
        )}

        {activeType === 'Ежемесячно' && (
          <>
            <div className="form__text-content">
              <p className="form__text-bold">Укажите дни месяца:</p>
            </div>
            <div className="repeat-expenses__monthly-box">
              {arrDay.map((item) => {
                return (
                  <div className="repeat-expenses__monthly-week">
                    {item.map((elem) => {
                      return (
                        <Checkbox name={elem} handleChangeDay={handleChangeDay} title="caledar">
                          {elem}
                        </Checkbox>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="form__text-content">
              <p className="form__text_confirm-register">
                *При отсутствии в месяце крайних дат, платежи переносятся на последний день месяца.
              </p>
            </div>
          </>
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
