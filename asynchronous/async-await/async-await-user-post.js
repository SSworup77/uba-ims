//for users
async function fetchUser(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data=await response.json()
        console.log(data)
        return data

    }catch(err){
        console.log(err.message)
    }
}
// for posts
async function fetchPost(){
    try{
        const response=await fetch('https://jsonplaceholder.typicode.com/posts')
        const data=await response.json()
        console.log(data)
        return data
    }catch(err){
        console.log(err.message)
    }
}

//for sequential execution 
// async function getData(){
//     const users = await fetchUser()
//     const posts = await fetchPost()
//     console.log(users)
//     console.log(posts)
// }

// for parallel execution
async function getData(){
    const usersFetch = fetchUser()
    const postFetch = fetchPost()
    const users = await usersFetch
    const posts = await postFetch
    console.log(users)
    console.log(posts)
}

getData()