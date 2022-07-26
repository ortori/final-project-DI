import style from "./FoodCard.module.css";
import Button from "../UI/Form/Button";
import { AiFillSave } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import {
  saveFood,
  deleteFood,
  setFoodIdForDeletion,
} from "../../features/nutritionSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setModal,
  setModalTitle,
  setModalBody,
  resetModal,
} from "../../features/modalSlice";
import Modal from "../UI/modal/Modal";

const FoodCard = (props) => {
  const { foodIdForDeletion } = useSelector((state) => state.nutrition);
  const dispatch = useDispatch();
  const saveHandler = () => {
    dispatch(saveFood(props.foodData));
  };
  const deleteHandler = () => {
    dispatch(setFoodIdForDeletion(props.food_id));
    dispatch(setModal(true));
    dispatch(setModalTitle("Are you sure? ⚠️"));
    dispatch(setModalBody("This will delete the food data from the Database"));
  };
  const onDelete = () => {
    dispatch(deleteFood(foodIdForDeletion));
    dispatch(resetModal());
  };
  return (
    <>
      {props.del && (
        <Modal twoButtons btn1Label="NO" btn2Label="YES" onClick={onDelete} />
      )}
      <div className={style.container}>
        <h4 className={style.heading}>{`${props.name
          .at(0)
          .toUpperCase()}${props.name.slice(1)}`}</h4>
        <img className={style.img} src={props.imgSrc} alt="delicious food" />
        <div className={style["details-container"]}>
          <p className={style.detail}>
            <span className={style.bold}>Weight:</span> {props.grams} Grams
          </p>
          <p className={style.detail}>
            <span className={style.bold}>Calories:</span> {props.calories}
          </p>
          <p className={style.detail}>
            <span className={style.bold}>Protein:</span> {props.protein} grams
          </p>
          <p className={style.detail}>
            <span className={style.bold}>Fats:</span> {props.fat} grams
          </p>
        </div>
        <Button
          width="50px"
          color="#94B49F"
          margin="0"
          onClick={props.del ? deleteHandler : saveHandler}
        >
          {props.del ? (
            <BsFillTrashFill size="1.5em" color="#B25068" />
          ) : (
            <AiFillSave size="1.7em" />
          )}
        </Button>
      </div>
    </>
  );
};

export default FoodCard;
