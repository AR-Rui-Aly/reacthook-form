interface Props {
  onSelected: (category: string) => void;
}

const ExpenseFilter = ({onSelected} : Props) => {
  return (
    <select className="form-select" onChange={(event => onSelected(event.target.value))}>
      <option value="">All Categories</option>
      <option value="Utilities">Utilities</option>
      <option value="Groceries">Groceries</option>
      <option value="Furniture">Furniture</option>
    </select>
  )
}

export default ExpenseFilter