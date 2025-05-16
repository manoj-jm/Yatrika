import { Link, NavLink } from 'react-router'
import { sidebarItems } from '~/constants'
import { cn } from '~/lib/utils'

const NavItems = () => {

  const user = {
    name : "manoj",
    email : "jmanjjmvr@gmail.com",
    imgUrl : "/assets/images/david.webp"
  }
  return (
    <section className='nav-items'>
      <Link to='/' className='link-logo'>
      <img src="/assets/icons/logo.svg" alt="logo" className='size-[30px]' />
      <h1>Yatrika</h1>
      </Link>  

      <div className="container">
        <nav>
          {sidebarItems.map(({id,href,label,icon})=>(
            <NavLink to={href} key={id} >
              {
                ({isActive}:{isActive : boolean})=>
                  (
                    <div className={cn('group nav-item',{'bg-primary-100 !text-white':isActive})}>
                      <img src={icon} alt={label} className={`group-hover:brightness-0 size-5 group-hover:invert ${isActive ? 'brightness-0 invert' : 'text-dark-200'}`} />
                      {label}
                    </div>
                  )
              }
            </NavLink>
          ))}
        </nav>
        <footer className='nav-footer'>
            <img src={user?.imgUrl} alt={user?.imgUrl || "/assets/images/david.webp"} />
            <article>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </article>

            <button onClick={()=>(
              console.log("log out")
            )} className='cursor-pointer'>

              <img src="/assets/icons/logout.svg" alt="logout" className='size-8' title='logout' />
            </button>
        </footer>
      </div>  
    </section>
  )
}

export default NavItems
