
import { useContext } from "react"
import Context from "../context/context"
import Menu from "../Navigation/Menu"
import LoadingComponent from "../UI/LoadingComponent"
import HeaderComponent from "./Header"
import LoadingContext from "../context/loadingContext"
import UserContext from "../context/userContext"

const Layout = ({children}) => {

  const {isLoading} = useContext(LoadingContext)
  const {activeUser} = useContext(UserContext)

  return(
    !isLoading && activeUser ?
      <>
      <HeaderComponent />
      <div className="wrapper">
      {children}
      </div>
      <Menu />
      </>
      :
      <LoadingComponent />
  )

}

export default Layout