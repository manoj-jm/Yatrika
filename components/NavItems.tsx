import { Link } from 'react-router'

const NavItems = () => {
  return (
    <section className='nav-items'>
      <Link to='/' className='link-logo'>
      <img src="/assets/icons/logo.svg" alt="logo" className='size-[30px]' />
      <h1>Yatrika</h1>
      </Link>
      
    </section>
  )
}

export default NavItems
