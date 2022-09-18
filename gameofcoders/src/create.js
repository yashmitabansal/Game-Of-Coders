import React , {useState} from "react";
import { Editor } from '@tinymce/tinymce-react';
import fb from "./firebase";

import useAuthState from "./hooks";

const DB =fb.firestore();
const FBStorage = fb.storage();
const storageRef = FBStorage.ref();
const Blogslist = DB.collection('blogs');


const CreateBlog = () => {
    const {user, initializing} = useAuthState(fb.auth());
    const[title, SetTitle] = useState("");
    const[body, SetBody] = useState("");
    const[cover, SetCover] = useState(null);

    const handleCoverImgChange=(e)=>{
        if (e.target.files[0]) {
            SetCover(e.target.files[0]);
        }
    };
    const submit =(e)=> {
        e.preventDefault();
        const uploadTask = storageRef.child('images/' + cover.name).put(cover);
        uploadTask.on(
            'state_changed', 
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                //uploadTask.snapshot.ref.getDownloadURL()
                storageRef.child('images/' + cover.name).getDownloadURL().then(url=>{
                    console.log("img url:", url)
                    Blogslist.add ({
                        Title: title,
                        Body: body,
                        CoverImg: url,
                        Authorid: user.uid,
                        Authorname: user.displayName,
                        AuthorImg: user.photoURL,
                    }).then((docRef)=> {
                        alert("data successfully submit")
                    }).catch((error) => {
                        console.error("error:", error);
                    });

                })
            }
        )
        }
    if (initializing) {
        return 'loading...';
    }
    return(
        <div className="mt-28">
            <form onSubmit={(event) => {submit(event)}} className="max-w-screen-xl mx-auto p-4 space-y-4">    
            <input type="text" placeholder="Title" 
            onChange={(e)=>{SetTitle(e.target.value)}} required className="w-full p-2 "/><br/>
            <input type="file" name="coverimg" accept="image/*" onChange={(e)=>handleCoverImgChange(e)} /><br/>

            <Editor 
             textareaName="content"
             initialValue="write your content here" 
             onEditorChange={(newText)=>{SetBody(newText)}} 
             init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            /><br/>

            

            <button type="submit" className="bg-green-500 p-4 text-white rounded-lg">Submit</button>
        </form>
        </div>
    );
};

export default CreateBlog;