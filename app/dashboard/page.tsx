import { auth } from "../../auth"

export default async function Dashboard() {
    const session = await auth()
    if (session) {
        console.log(session)
    }
 
return <div>Hello this is dashboard  </div>
}