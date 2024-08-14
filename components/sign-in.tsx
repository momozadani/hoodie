import {Button} from "@nextui-org/react";
import { signIn } from "@/auth";



export default function SignIn() {
  return (
     <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <Button variant="ghost" color="primary" type="submit">Sign in</Button>
    </form>
     
  )
} 