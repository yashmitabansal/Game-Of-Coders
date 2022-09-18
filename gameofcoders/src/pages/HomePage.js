import React , {useState, useEffect} from "react";
import fb from "../firebase";
import { BlogCard } from "../components/blogcard";
import '../css/ImageStyle.css'
const DB =fb.firestore()
const Blogslist = DB.collection('blogs');
const HomePage=()=>{
    const[blogs, Setblogs] = useState([]);
    useEffect(() =>{
        const unsubscribe = Blogslist.onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            Setblogs(data);
          });
          return unsubscribe;
    }, []);
    const SortPhotos = (sortdata, x, y)=>{
        if (sortdata && x && y) {
            const sortedData = [...blogs].sort((a,b)=>{
                return a[sortdata] > b[sortdata] ? x : y;
            })
            Setblogs(sortedData);  
        }
    }
    return(
        <div className="mt-24">
        <section class="h-96 bg-cover homeimg">
        <div class="flex h-full w-full items-center justify-center container mx-auto px-8">
          <div class="max-w-2xl text-center">
            <h1 class="text-3xl capitalize tracking-widest text-white lg:text-4xl">Publish your Passions, Your way</h1>
      
            <p class="mt-6 lg:text-lg text-white">create a unique and beautiful blog easily</p>
      
            <div class="mt-8 flex flex-col space-y-3 sm:-mx-2 sm:flex-row sm:justify-center sm:space-y-0">      
              <a href="/Create/" class="transform rounded-md bg-blue-700 px-8 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none sm:mx-2">Create new blog</a>
            </div>
          </div>
        </div>
      </section>
            <div > 
                <section class="text-gray-600 body-font">
                <div className="px-20">
                    <button className="bg-indigo-500 text-white  border-white m-2 p-2 rounded-lg" onClick={()=> {SortPhotos("likes.length","-1","1")}}>most liked</button>
                    <button className="bg-indigo-500 text-white  border-white m-2 p-2 rounded-lg" onClick={()=> {SortPhotos("likes.length","1","-1")}}>less liked</button>
                </div>
                    <div class="container px-5 py-5 mx-auto">
                    <div class="flex flex-wrap -m-4">
                    {blogs.map(blogItem=> (
                        <BlogCard blog={blogItem}/>
                    ))}
                    </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
export default HomePage;