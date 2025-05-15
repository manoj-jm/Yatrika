import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout('routes/admin/admin-layout.tsx',[
    route('dashboard','routes/admin/dashboard.tsx'),
    route('alluserview','routes/admin/all-user.tsx')
  ])
] satisfies RouteConfig;