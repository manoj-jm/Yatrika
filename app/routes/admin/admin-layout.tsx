import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { MobileSideBar, NavItems } from "../../../components";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";
//loader : is an async func tide to route that runs before the route components renders and provides the data to that component , so it can use it immediately once it appears , this makes app faster ( data fetching happens before render)

export async function clientLoader() {
  console.log("clientLoader at adminLayout...");
  try {
    const user = await account.get();
    if (!user.$id) return redirect("/sign-in");

    let existingUser = await getExistingUser(user.$id);
    if (existingUser?.status === "user") {
      return redirect("/");
    }

    if (!existingUser) {
      await storeUserData();
      existingUser = await getExistingUser(user.$id); // re-fetch to get all fields
    }

    if (!existingUser) {
      return redirect("/sign-in");
    }

    // Normalize the user object for the UI
    return {
      name: existingUser.name || "",
      email: existingUser.email || "",
      imgUrl: existingUser.imageUrl || "",
      id: existingUser.accountId || existingUser.$id || "",
      joinedAt: existingUser.joinedAt || "",
      status: existingUser.status || "user",
    };
  } catch (e) {
    console.log("Error in clientLoader", e);
    return redirect("/sign-in");
  }
}

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSideBar />

      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>

      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};
export default AdminLayout;

// import { Outlet, redirect } from "react-router";
// import { SidebarComponent } from "@syncfusion/ej2-react-navigations"; // <-- Add this line
// import { MobileSideBar, NavItems } from "components";
// import { account } from "~/appwrite/client";
// import { getExistingUser, storeUserData } from "~/appwrite/auth";

// export async function clientLoader() {
//   if (typeof window === "undefined") return null; // Prevent SSR call
//   try {
//     const user = await account.get();
//     console.log("client Loader in admin-layout and user : ", user);

//     if (!user.$id) {
//       console.log("User session is invalid or missing. Redirecting to sign-in.");
//       return redirect("/sign-in");
//     }

//     const existingUser = await getExistingUser(user.$id);

//     if (!existingUser) {
//       console.log("User not found in database. Storing user data.");
//       await storeUserData();
//     }

//     if (existingUser?.status !== "admin") {
//       console.log("User is not an admin. Redirecting to home.");
//       return redirect("/");
//     }

//     return existingUser;
//   } catch (e) {
//     console.log("Error in clientLoader", e);
//     return redirect("/sign-in");
//   }
// }

// const AdminLayout = () => {
//   return (
//     <div className="admin-layout border-2">
//       <MobileSideBar />
//       <aside className="w-full max-w-[270px] hidden lg:block">
//         <SidebarComponent width={270} enableGestures={false} id="sidebar">
//           <NavItems />
//         </SidebarComponent>
//       </aside>
//       <aside className="children">
//         <Outlet /> // all-users or dashboard
//       </aside>
//     </div>
//   );
// };

// export default AdminLayout;
