import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
  title: z.string().min(3).max(50),
  content: z.string().min(3).max(500),
})

const Form = () => {
  return (
    <div></div>
  )
}

export default Form;