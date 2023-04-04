import zod from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from "zod"
import Categories from "../Categories";


const schema = z.object({
  description: z.string().min(3, {message: "Description must be greater than 3 chars"}),
  amount: z.number({invalid_type_error: "Amount must be a number"}).min(1,{message:"at least one unit"}),
  category: z.enum(Categories, { errorMap: () => ({ message: "Category is required." }) })

})

export type FormData = z.infer<typeof schema>;

interface Props{
  onSubmit: (data: FormData) => void;
}


const ExpenseForm = ({onSubmit}: Props) => {
  const { register, handleSubmit, formState:{errors, isValid}, reset } = useForm<FormData>({resolver: zodResolver(schema)});

  return (
    <form onSubmit={handleSubmit(data => {
      onSubmit(data);
      reset();
    })}>
      <div className="mb-3">
        <label htmlFor="Description" className="form-label">Description</label>
        <input {...register("description")} id="Description" type="text" className="form-control" />
        {errors.description && <p className="text-danger">{errors.description.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="Amount" className="form-label">Amount</label>
        <input {...register("amount", { valueAsNumber: true })} id="Amount" type="number" className="form-control" />
        {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">Categories</label>
        <select {...register("category")} className="form-control">
          <option></option>
          {Categories.map(category => <option key={category}>{category}</option>)}
        </select>
         {errors.category && <p className="text-danger">{errors.category.message}</p>}
        
      </div>

      <div className="mb-5">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  )
}

export default ExpenseForm;