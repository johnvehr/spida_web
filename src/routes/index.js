import {
  Bell as Bellicon,
  BookOpen as BookOpenIcon,
  Calendar as CalendarIcon,
  CheckSquare as CheckSquareIcon,
  Grid as GridIcon,
  Heart as HeartIcon,
  Layout as LayoutIcon,
  List as ListIcon,
  MapPin as MapPinIcon,
  Monitor as MonitorIcon,
  PieChart as PieChartIcon,
  Sliders as SlidersIcon,
  Users as UsersIcon
} from "react-feather";

// Landing
import Landing from "../pages/landing/Landing";

//Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

//Team Auth
import TeamSignUp from "../pages/auth/TeamSignUp"
import TeamSignIn from "../pages/auth/TeamSignIn"

//Hub
import Hub from "../pages/hub/hub"
import Projects from "../pages/hub/projects"
import Project from "../pages/hub/project"
import Account from "../pages/hub/account"

//Intro
import IntroController from "../pages/intro/introController"

const landingRoutes = {
  path: "/",
  name: "Landing Page",
  component: Landing,
  children: null
}

const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: UsersIcon,
  badgeColor: "secondary",
  badgeText: "Special",
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/auth/:team/sign-up/:invitation",
      name: "Team Sign Up",
      component: TeamSignUp
    },
    {
      path: "/auth/:team/sign-in/:invitation",
      name: "Team Sign In",
      component: TeamSignIn
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    }
  ]
}

const introRoutes = {
  path: '/:subdomain',
  name: "Walkthrough",
  icon: UsersIcon,
  children: [
    {
      path: '/:subdomain/welcome',
      name: "Intro",
      component: IntroController
    }
  ]
}

const hubRoutes = {
  path: '/:subdomain',
  name: "Hub",
  icon: UsersIcon,
  children: [
    {
      path: '/:subdomain',
      name: "Hub",
      component: Hub
    },
    {
      path: '/:subdomain/projects',
      name: "Projects",
      component: Projects
    },
    {
      path: '/:subdomain/projects/:id',
      name: "Project",
      component: Project
    },
    {
      path: '/:subdomain/account',
      name: "Account",
      component: Account
    }
  ]
}

export const landing = [landingRoutes]
export const auth = [authRoutes]
export const hub = [hubRoutes]
export const intro = [introRoutes]

export default [
  landingRoutes,
  authRoutes,
  hubRoutes,
  introRoutes
]
