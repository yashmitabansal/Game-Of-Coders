import fb from "../firebase";
import useAuthState from "../hooks";


export const ProfilePage=()=>{
    const {user, initializing} = useAuthState(fb.auth());
    console.log(user)
    const signout=()=>{
        fb.auth().signOut();
      };
    if (initializing) {
        return (<div className="mt-24">
        <p>loading profile page please wait . server is slow...</p>
    </div>);
    }
    return(
        <div className="mt-24">
            <div className="space-y-5">
                <div className="mt-12 flex max-w-xl mx-auto p-12 space-x-5 bg-white">
                <div className="rounded-full overflow-hidden">
                    <img src={user.photoURL} alt="user" className="w-24 h-24"/>
                </div>
                <div className="p-4">
                    <p className="font-bold text-xl">{user.displayName}</p>
                    <p className="text-lg">{user.email}</p>
                </div>
            </div>
            <div className="max-w-xl mx-auto p-6 bg-white">
                <button className="border-2 w-full bg-red-600 p-2 text-white border-none rounded-lg"
            onClick={signout}
            >sign out</button>
            </div>
            </div>

            
            
        </div>
    );
}