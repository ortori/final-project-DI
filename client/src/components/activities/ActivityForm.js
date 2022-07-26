import Input from "../UI/Form/Input";
import Button from "../UI/Form/Button";
import style from "./ActivityForm.module.css";
import {
  addUserActivity,
  setAddInputValues,
  resetAddInputValues,
} from "../../features/userDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { setClickedLocation } from "../../features/mapSlice";
import { BiMessageSquareAdd } from "react-icons/bi";

const ActivityForm = (props) => {
  const dispatch = useDispatch();
  const { addActivityFormInputValues } = useSelector((state) => state.userData);
  const changeHandler = (e) => {
    dispatch(setAddInputValues({ name: e.target.name, value: e.target.value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addUserActivity(addActivityFormInputValues));
    dispatch(resetAddInputValues());
    dispatch(setClickedLocation(null));
  };
  return (
    <div className={style.container}>
      <h3 className={style.heading}>Add new activity</h3>
      <form className={style.form} onSubmit={submitHandler}>
        <div className={style["input-container"]}>
          <label htmlFor="activity">Select Activity</label>
          <select
            onChange={changeHandler}
            id="activity"
            name="activity"
            className={style.select}
            required
            value={addActivityFormInputValues.activity}
          >
            <option value="" disabled>
              Activity
            </option>
            <option value="running">Running</option>
            <option value="cycling">Cycling</option>
          </select>
        </div>
        <div className={style["input-container"]}>
          <label htmlFor="duration">Workout Duration (mins)</label>
          <Input
            onChange={changeHandler}
            value={addActivityFormInputValues.duration}
            required
            name="duration"
            id="duration"
            placeholder="30"
            type="number"
            margin="0"
            width="200px"
          />
        </div>
        <div className={style["input-container"]}>
          <label htmlFor="date">Workout Date and Time</label>
          <Input
            onChange={changeHandler}
            value={addActivityFormInputValues.date}
            required
            name="date"
            id="date"
            placeholder="Date"
            type="datetime-local"
            margin="0"
            width="200px"
          />
        </div>
        <div className={style.btn}>
          <Button
            width="100px"
            margin="20px auto"
            type="submit"
            color="#2B7A0B"
          >
            ADD <BiMessageSquareAdd size="1.3em" className={style.icon} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
