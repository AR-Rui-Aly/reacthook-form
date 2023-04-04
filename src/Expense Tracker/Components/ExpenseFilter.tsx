import Categories from "../Categories";

interface Props {
  onSelected: (category: string) => void;
}



const ExpenseFilter = ({onSelected} : Props) => {
  return (
    <select className="form-select" onChange={(event => onSelected(event.target.value))}>
      <option value="">All Categories</option>
      {Categories.map(category => <option key={category}>{category}</option>)}
    </select>
  )
}

export default ExpenseFilter