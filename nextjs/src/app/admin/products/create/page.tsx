import { Suspense } from "react"
import Form from "./form"
import Loading from "@/components/ui/loading"


export default function Create() {
    return (
        <>
            <h1>Create Product</h1>
            <Suspense fallback={<Loading />}>
                <Form />
            </Suspense>
        </>
    )
}






// export default Create;
