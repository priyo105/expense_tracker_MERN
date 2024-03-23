import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../Apis/FetchCategories";
import { updateCategoryTransactionFilter } from "../../redux/CategoryFilterForTransactionSlice";

const CategoryCollapsedElements = React.memo(() => {
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const dispatch = useDispatch();

  async function fetchCategoryData() {
    let categories = await fetchCategories();
    setCategories(categories);
    //sepeate category names from category array
    let categoryNames = [];
    categories.map((item) => {
      categoryNames.push(item.name);
    });

    dispatch(updateCategoryTransactionFilter(categoryNames)); //initialize redux with all category names to view all data
  }

  function handleCheckBoxInput(event, item) {
    const checked = event.target.checked;
    const updatedCategories = checked
      ? [...checkedCategories, item.name] //push
      : checkedCategories.filter((category) => category !== item.name); //delete
    setCheckedCategories(updatedCategories);
    dispatch(updateCategoryTransactionFilter(updatedCategories)); //update redux
  }

  useEffect(() => {
    fetchCategoryData().then(() => {});
  }, []);

  return (
    <div>
      {categories.map((item) => (
        <div className="mt-4" key={item.id}>
          <input
            type="checkbox"
            id={item.id}
            name={item.name}
            onChange={(event) => handleCheckBoxInput(event, item)}
            checked={checkedCategories.includes(item.name)}
            style={{ padding: 10, marginRight: 10, width: 15, height: 15 }}
          />
          <span className="text-sm">{item.name}</span>
        </div>
      ))}
    </div>
  );
});

export default CategoryCollapsedElements;
