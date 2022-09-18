import { Link } from "react-router-dom";

export const BlogCard=(props)=>{
    return(
        <div class="p-4 md:w-1/3" key={props.blog.id}>
    <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white">
        <div class="w-full">
            <div class="w-full flex p-2">
                <div class="p-2 ">
                  <img 
                    src={props.blog.AuthorImg} alt="author" 
                    class="w-10 h-10 rounded-full overflow-hidden"/>
                </div>
                <div class="pl-2 pt-2 ">
                  <p class="font-bold">{props.blog.Authorname}</p>
                </div>
              </div>
        </div>
        {props.blog.CoverImg?<img class="lg:h-48 md:h-36 w-full object-cover object-center" src={props.blog.CoverImg} alt="blog cover"/>:null}
      <div class="p-4">
        <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{props.blog.Title}</h1>
        <div class="flex items-center flex-wrap ">
            <Link to={"/show/"+props.blog.id} class="text-green-800  md:mb-2 lg:mb-0">
                <p class="inline-flex items-center">Read Blog
                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                    </svg>
                </p>
            </Link>
          <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-gray-200">
            <svg class="w-4 h-4 mr-1"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {props.blog.likes
                ?<span>{props.blog.likes.length}</span>
                :"0"
            }
          </span>
          
        </div>
        
        
      </div>
    </div>
  </div>
    );
}