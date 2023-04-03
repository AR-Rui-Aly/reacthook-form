
import { useState } from 'react'
import './App.css'
import ListExpenses from './Expense Tracker/Components/ListExpenses'
import Form from './components/Form'
import ExpenseFilter from './Expense Tracker/Components/ExpenseFilter'

function App() {
 
  const [selectedCategory, setSelectedCategory] = useState('');

  const [expenses, setExpenses] = useState([
    { id: 1, description: 'aaa', amount: 9, category: 'Furniture' },
    { id: 2, description: 'bba', amount: 9, category: 'Groceries' },
    { id: 3, description: 'cca', amount: 9, category: 'Furniture' },
    { id: 4, description: 'eea', amount: 9, category: 'Utilities' },
  ])

  const visibleCategory = selectedCategory ?
    expenses.filter((e) => e.category === selectedCategory) : expenses;



  return (
    <div className="App">

      <div className="mb-3">
        <ExpenseFilter onSelected={(category) => setSelectedCategory(category)}/>
      </div>
      <ListExpenses expenses={visibleCategory} onDelete={(id) =>
        setExpenses(expenses.filter(e => e.id !== id))
        
      } />
    </div>
  )
}

export default App
