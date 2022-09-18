import React , {useEffect, useState} from "react";
import { useParams} from 'react-router-dom';
import fb from "../firebase";
import useAuthState from "../hooks";
import {v4 as uuidv4} from "uuid";
import { CopyToClipboard } from 'react-copy-to-clipboard'
const DB =fb.firestore()
const Blogslist = DB.collection('blogs');


function LikeBlogButton({id, likes}) {
    const blogRef = DB.collection("blogs").doc(id)
    const {user} = useAuthState(fb.auth());
    const handleLikes=()=>{
        if (likes?.includes(user.uid)) {
            blogRef.update({
                likes: fb.firestore.FieldValue.arrayRemove(user.uid)
            });
        } else {
            blogRef.update({
                likes: fb.firestore.FieldValue.arrayUnion(user.uid)
            });
        }
    }
    return(
        <div>
            {likes ?
                likes.includes(user.uid) ?<button onClick={handleLikes}  className="bg-red-500 text-white p-4 rounded-lg">UnLike</button>:<button onClick={handleLikes} className="bg-green-500 text-white p-4 rounded-lg">Like</button>
                :null
            }
        </div>
    );
}

export const BlogViewPage=()=>{
    const {user} = useAuthState(fb.auth());
    const {id} = useParams();
    const[blogs, Setblogs] = useState([]);
    const[comment, setcomment]= useState("");
    const[commentList, setCommentList] = useState([]);
    useEffect(()=>{
        Blogslist.doc(id).get().then((snapshot) => {
            const data = snapshot.data()
            const commentdata = snapshot.data().comments
            Setblogs({...data, id: id,});
            setCommentList(commentdata);
        });
    })
    const handleComment=(e)=>{
        if (e.key === "Enter") {
            Blogslist.doc(id).update({
                comments: fb.firestore.FieldValue.arrayUnion({
                    userid: user.uid,
                    username: user.displayName,
                    userImg: user.photoURL,
                    comment: comment,
                    createdAt :fb.firestore.Timestamp.fromDate(new Date()),
                    commentId : uuidv4(),
                })
            }).then(()=>{
                setcomment("");
            });
        }
    };
    const handlecommentDelete=(comment)=>{
        Blogslist.doc(id).update({
            comments: fb.firestore.FieldValue.arrayRemove(comment)
    })}; 
    const url = window.location.href
    return(
        <div className="mt-24">
            <div className="max-w-screen-xl  mx-auto space-y-4">
                <div className="bg-white p-2">
                    <p className="text-xl font-bold">{ blogs.Title}</p>
                </div>
                <div className="bg-white p-2" >
                    <p dangerouslySetInnerHTML={{__html: blogs.Body}}></p>
                </div>
                <div className="bg-white p-2">
                    <div>
                        <span>Likes:</span>
                        <span>{blogs.likes
                            ?<span>{blogs.likes.length}</span>
                            :"0"
                        }</span>
                    </div>
                </div>
                <div className="bg-white p-2 flex space-x-6">
                    <div>
                        <div>
                            {user ?<LikeBlogButton
                            id={blogs.id}
                            likes={blogs.likes}
                            />:null}
                        </div>
                    </div>
                    <div>
                    <CopyToClipboard text={url}  onCopy={() => alert("Link Copied")}>
                        <button className="bg-blue-500 text-white p-4 rounded-lg">Copy URL to the clipboard</button>
                    </CopyToClipboard>
                    </div>
                </div>
                
                <div className="bg-white p-2">
                {user
                    ?<div className="flex space-x-4">
                        <div className="rounded-full overflow-hidden">
                            <img className="w-12 h-12" src={user.photoURL} alt="user"/>
                        </div>
                        <input
                            type="text"
                            classname="w-full h-16 py-2 pl-4 border-2 border-gray-100"
                            onChange={(e)=>{setcomment(e.target.value);}}
                            placeholder="type a comment..."
                            onKeyUp={(e)=>{handleComment(e);}}
                        />
                    </div>
                    :null}
                </div>
                <div className="p-2">
                <div className="space-y-4">
                {commentList!==undefined && commentList.map((item)=>(
                    <div key={item.commentId} class="w-full bg-white">
                        <div >
                            <div class="w-full flex p-2">
                                <div class="px-2">
                                    <img 
                                    src={item.userImg} alt="author" 
                                    class="w-10 h-10 rounded-full overflow-hidden"/>
                                </div>
                                <div class="pl-2 pt-2">
                                <p class="font-bold">{item.username}</p>
                                </div>
                            </div>
                            <div className="px-4 w-full">
                                <p>{item.comment}</p>       
                            </div>
                            <div className="px-4">
                            {user.uid===blogs.author || user.uid===item.userid
                            ?<button className="text-white bg-red-500 px-2 rounded-full" onClick={()=>handlecommentDelete(item)}>Delete</button>
                            :null}
                        </div>
                        </div>
                        
                    </div>
                )
                )}
            </div>
                </div>
            </div>
        </div>
    );
}