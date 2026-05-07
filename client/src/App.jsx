import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {
  ErrorPage,
  HomeLayout,
  InstructorChatPage,
  LandingPage,
  HomeStatsPage,
  WorkoutListPage,
  RecipeListPage,
  RoutineListPage,
  FoodListPage,
  FoodDisplayPage,
  WorkoutDisplayPage,
  DailyLogPage,
  RegisterPage,
  LoginPage,
  DashboardLayout,
  AdminPage,
  AddWorkoutPage,
  AddFoodPage, 
  RoutineDisplayPage,
  RecipeDisplayPage,
  FitnessNewsPage,
  AllFoodPage, 
  AllWorkoutPage, 
  EditFoodPage, 
  EditWorkoutPage

} from './Pages'



import UserSettingsPage from './Pages/UserSettingsPage'
import { loader as dailyLogLoader } from './Pages/DailyLogPage';




const router = createBrowserRouter([
  {
    path:"/",
    element:<HomeLayout/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        index:true,
        element:<LandingPage/>

      },
      {
        path:"register",
        element: <RegisterPage/>,

      
      },
      {
        path:"login",
        element:<LoginPage/>,
      },
      {
        path:"home",
        element:<DashboardLayout/>,
        children:[
          {
            index:true,
            element: <HomeStatsPage/>,

          },
          {
            path: "virtual-instructor",
            element:<InstructorChatPage/>
          },
          {
            path: "workout-list",
            element:<WorkoutListPage/>

          },
          {
            path:"recipe-list",
            element:<RecipeListPage/>,

          },
          {
            path: "recipe/:recipeId",
            element: <RecipeDisplayPage/>,

          },
          {
            path:"routine-list",
            element:<RoutineListPage/>,

          },
          {
            path:"routine/:routineId",
            element: <RoutineDisplayPage/>,
   
          },
          {
            path:"food-list",
            element:<FoodListPage/>

          },
          {
            path: "food/:foodId",
            element:<FoodDisplayPage/>,
          },
          {
            path: "workout/:workoutId",
            element:<WorkoutDisplayPage/>,

          },
          {
            path:"daily-log",
            element:<DailyLogPage/>,
            loader: dailyLogLoader,
          },
          {
            path: "fitness-news",
            element: <FitnessNewsPage/>
          },
          {
            path: "user-settings",
            element:<UserSettingsPage/>,

          },
          {
            path:"admin",
            children:[
              {
                index: true,
                element: <AdminPage/>
              },
              {
                path: "all-workout",
                element: <AllWorkoutPage/>
              },
              {
                path:"all-food",
                element: <AllFoodPage/>
              },
              { path: "edit-workout/:workoutId", 
                element: <EditWorkoutPage/> 
              },
              { path: "edit-food/:foodId", 
                element: <EditFoodPage/> },
              {
                path:"add-workout",
                element:<AddWorkoutPage/>,
              },
              {
                path:"add-food",
                element: <AddFoodPage/>,
              },
              {
                path:"edit-workout/:workoutId"
              },
              {
                path:"edit-food/:foodId"
              }
            ]
          }
        ]
      },

    ]

  }

]);


const App = () => {
  return (
    <RouterProvider router = { router }/>
  )
}

export default App
