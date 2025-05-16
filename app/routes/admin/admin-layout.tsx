import { Outlet } from 'react-router'
import { SidebarComponent } from '@syncfusion/ej2-react-navigations' // <-- Add this line
import { NavItems } from 'components'

const AdminLayout = () => {
  return (
    <div className="admin-layout border-2">
      mobileview
      <aside className="w-full max-w-[270px] hidden lg:block">   
        {/* sidebarcomponent from synchfusion  */}
        <SidebarComponent width={270} enableGestures={false} id='sidebar'>
        <NavItems />
        </SidebarComponent>
      </aside>
      <aside className='children'> 
        <Outlet />  
      </aside>
    </div>
  )
}

export default AdminLayout
