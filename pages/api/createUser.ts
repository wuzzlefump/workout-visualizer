import type { NextApiRequest, NextApiResponse } from 'next'
import  sanityClient from "@sanity/client"

const config={
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.Node_ENV === "production",
    token: process.env.SANITY_API_TOKEN
}
const client = sanityClient(config)

export default async function createUser(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
  
      const {username,password}=JSON.parse(req.body)
  
      try{

        const query = `*[_type == "user" && username == ${username} && password == ${password}]{
            username,
            slug
        }
        `
        const user = await client.fetch(query);
        console.log(user)
        if(!user[0]){
              await client.create({
              _type: "user",
              username:username,
              password:password
          })
        }else{
            return res.status(500).json({message:"User Already Exists"})
        }
        
  
      }catch(e){
          return res.status(500).json({message:"Couldn't submit user",e})
          
      }
  
    return res.status(200).json({ message: 'User submitted' })
  }