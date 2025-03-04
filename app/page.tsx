import Home from "@/components/Homepage";
import React from "react";
import  authOptions  from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"


export default async function Page() {
    const session:any = await getServerSession(authOptions);
    const email = session?.user?.email;
    console.log("sessionsdfgfthfdx", session);
    return <Home />;
}
