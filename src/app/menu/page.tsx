"use client";
import axios from "axios";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const jwt = require("jsonwebtoken")

export default function Menu(){
    const [recipies, setRecipies] = useState<any>([]);
    const [user, setUser] = useState<any>({});
    const [token, setToken] = useState<any>("")
    const router = useRouter()
    function getRecipies(token: any){
        axios.get(`${process.env.NEXT_PUBLIC_APIURL}/recipie`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'  
            }
        })
        .then((response: { data: any; }) => {
            console.log("Fetched recipies successfully:", response.data);
            setRecipies(response.data.recipies);
        })
        .catch((error: any) => {
            console.error("Error signing in:", error);
            alert(error)
        });
    }
    // useEffect(()=>{
    //     var token = localStorage.getItem("token")
    //     console.log(token)
    //     try{
    //         console.log("Token:", token)
    //         const user = jwt.verify(token, process.env.NEXT_PUBLIC_JWTSECRET, { algorithm: 'HS256', allowInsecureKeySizes: true, allowInvalidAsymmetricKeyTypes: true });
    //         setUser(user)
    //         setToken(token)
    //         getRecipies(token);
    //     } catch(error) {
    //         console.log(error)
    //         //router.push('/signin')
    //     }
    //     // get recipies
    // })
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found, redirecting to sign-in...");
            router.push('/signin'); // Redirect if no token is found
            return;
        }
    
        console.log("Token found:", token);
        try {
            const u = jwt.decode(token);
            setUser(u);
            setToken(token);
            getRecipies(token);
        } catch (error) {
            console.error("Error verifying token:", error);
            router.push('/signin'); // Redirect on token verification error
        }
    }, []);
    
    return(
        <div className="container items-start">  
            <div className=" ml-10 mt-10 font-bold text-3xl">Hello! {user.email}</div> 
            <div className=" ml-10 mt-10 font-bold text-3xl">Logged in as: {user.role}</div>
            <div className=" ml-10 mt-10 font-bold text-3xl">Menu</div>
            <div className=" flex "></div>
            <div className="mx-auto">{
                recipies.length != 0 ? <div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {recipies.map((recipie: any) => (
                    <div
                        key={recipie._id}
                        className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                    >
                        <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={recipie.image} alt="" />
                        </div>
                        <div className="min-w-0 flex-1">
                        <a href="#" className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            <p className="text-sm font-medium text-gray-900">{recipie.name}</p>
                            <p className="truncate text-sm text-gray-500">{recipie.description}</p>
                            <p className="truncate text-sm text-gray-500">
                                Ingredients: {recipie.ingredients.map((ingredient: { name: any; }) => ingredient.name).join(', ')}
                            </p>
                        </a>
                        </div>
                    </div>
                    ))}
                    
                </div>
                </div>:<div>No recipies to show</div>
            }
            </div>
        </div>
    );
}
  
