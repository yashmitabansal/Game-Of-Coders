import React , {useState, useEffect} from "react";
import fb from "../firebase";
import { BlogCard } from "../components/blogcard";
const DB = fb.firestore();
const Blogslist = DB.collection('blogs');


const SearchPage = () => {
    const[blogs, Setblogs] = useState([]);
    const[search, setSearch] = useState('');
    const[Searchblogs, SetSearchblogs] = useState([]);
    useEffect(() =>{
        const unsubscribe = Blogslist.limit(100).onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            Setblogs(data);
          });
          return unsubscribe;
    }, []);

    const SearchBlog=(e)=>{
        e.preventDefault();
        
        SetSearchblogs(blogs.filter((blogs)=>
            blogs.Title.toLowerCase().includes(search.toLowerCase())||
            blogs.Body.toLowerCase().includes(search.toLowerCase())
        ));
    };


    return(
        <div className="mt-24">
            <div className="max-w-screen-xl mx-auto bg-white p-4">
                <form onSubmit={(e) => {SearchBlog(e)}} className="flex space-x-4">
                    <input
                    onChange={(e)=>{setSearch(e.target.value)}} className="w-full p-2 border-2 border-gray-200 rounded-lg" placeholder="search blog" />
                    <button type="submit" className="bg-green-500 rounded-lg px-2 text-white">Search</button>
                </form>
            </div>
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-5 mx-auto">
                    <div class="flex flex-wrap -m-4">
                    {Searchblogs.map(blogs=> (
                        <BlogCard blog={blogs}/>
                    ))}
                    </div>
                </div>
          </section>
            
        </div>
    );
};

export default SearchPage;