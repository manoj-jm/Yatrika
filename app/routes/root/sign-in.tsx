import { ButtonComponent } from "@syncfusion/ej2-react-buttons"
import { Link, redirect } from "react-router"
import { loginWithGoogle } from "~/appwrite/auth"
import { account } from "~/appwrite/client"

//loader : is an async func tide to route that runs before the route components renders and provides the data to that component , so it can use it immediately once it appears , this makes app faster ( data fetching happens before render)

export async function clientLoader() {
  try {
    const user = await account.get();
    if(user.$id) return redirect('/')
  } catch (error) {
    console.log('error fetching user ' , error)
  }
}

const SignIn = () => {

  return (
    <main className="auth">
      <section className="size-full glassmorphism flex-center px-6">

        <div className="sign-in-card">
          <header className="header ">
            <Link to='/'>
            <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]"/>
            </Link>
            <h1 className="p-28-bold text-dark-100">Yatri<span className="text-[#211dff]">k</span>a</h1>
          </header>
          <article>
            <h2 className="p-28-semibold text-dark-100 text-center">Start your Travel Jouney</h2>
            <p className="p-28-regular text-center text-gray-100 !leading-7 ">Sign in with Google to manage destinations, itineraries, and user activity with ease.</p>
          </article>

          <ButtonComponent 
            type="button" 
            iconCss="e-search-icon"
            className="button-class !h-11 !w-full !hover:bg-blue-400"
            onClick={loginWithGoogle}
            >
            <img
            src="/assets/icons/google.svg" 
            alt="btn-img" 
            className="size-6 "
             />
             <span className="p-18-semibold text-white ">
              sign in with Google
             </span>
          </ButtonComponent>
        </div>
      </section> 
    </main >
  )
}

export default SignIn
