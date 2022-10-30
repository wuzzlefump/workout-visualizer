import  CredentialsProvider  from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import  sanityClient from "@sanity/client"

const config={
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.Node_ENV === "production",
    token: process.env.SANITY_API_TOKEN
}
const client = sanityClient(config)

export default NextAuth({
    session:{
    strategy:"jwt",
    maxAge:3000000
},

    providers:[
    CredentialsProvider({
        type:'credentials',
        name:"Credentials",
        credentials:{
            username:{
                label:"Username", type:"text", placeholder:"name..."
            },
            password:{
                label:"Password", type:"password"
            }
        },

        async authorize({username,password},req){
            // logic to look up user

        const query = `*[ _type == "user" && username == $username && password == $password]{
            username,
            password,
            _id,
            slug
        }`

         
            const user = await client.fetch(query,{username:username,password:password})
            console.log(user)
             if(user[0]){
               
                     return {name:user[0].username, id:user[0]._id}
                
               
            } else {
                return null
            }
      
          
           
            
        }
    })
],
callbacks:{
    jwt: async ({token,user})=>{
        if(user){
            token.name = user.name
            token.sub = user.id
        }
        return token
    },
    session:({session,token})=>{
        if(token){
            session.name = token.name
            session.user = token.sub
        }
        return session
    }
},
secret:process.env.NEXTAUTH_SECRET,
jwt:{
    secret: process.env.NEXTAUTH_SECRET,
    encryption:true,
}

})


