import { Outlet } from 'react-router'
import { SidebarComponent } from '@syncfusion/ej2-react-navigations' // <-- Add this line
import { MobileSideBar, NavItems } from 'components'

const AdminLayout = () => {
  return (
    <div className="admin-layout border-2">
      <MobileSideBar />
      <aside className="w-full max-w-[270px] hidden lg:block">   
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
