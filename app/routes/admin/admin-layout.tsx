import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations"; // <-- Add this line
import { MobileSideBar, NavItems } from "components";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

//loader : is an async func tide to route that runs before the route components renders and provides the data to that component , so it can use it immediately once it appears , this makes app faster ( data fetching happens before render)

export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser(user.$id);

    if (existingUser?.status !== "admin") {
      return redirect("/");
    }

    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (e) {
    console.log("Error in clientLoader", e);
    return redirect("/sign-in");
  }
}

const AdminLayout = () => {
  return (
    <div className="admin-layout border-2">
      <MobileSideBar />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false} id="sidebar">
          <NavItems />
        </SidebarComponent>
      </aside>
      <aside className="children">
        <Outlet /> // all-users or dashboard
      </aside>
    </div>
  );
};

export default AdminLayout;
