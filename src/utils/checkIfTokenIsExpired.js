import { jwtDecode } from "jwt-decode"
import { getLocalStorageItem } from "./localStorageUtils"

export const checkIfTokenIsExpired = () => {
  const token = getLocalStorageItem("bearerToken")

  if (!token) return true

  const decodedToken = jwtDecode(token)
  return decodedToken.exp < Date.now() / 1000
}
