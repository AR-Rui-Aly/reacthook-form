
import { useState } from 'react'
import './App.css'
import ListExpenses from './Expense Tracker/Components/ListExpenses'
import Form from './components/Form'
import ExpenseFilter from './Expense Tracker/Components/ExpenseFilter'
import ExpenseForm from './Expense Tracker/Components/ExpenseForm'




function App() {
 
  const [selectedCategory, setSelectedCategory] = useState('');

  const [expenses, setExpenses] = useState([
    { id: 1, description: 'aaa', amount: 9, category: 'Furniture' },
    { id: 2, description: 'bba', amount: 9, category: 'Groceries' },
    
  ])

  const visibleCategory = selectedCategory ?
    expenses.filter((e) => e.category === selectedCategory) : expenses;



  return (
    <div className="App">

      <ExpenseForm onSubmit={(expense) => setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])}/>

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
