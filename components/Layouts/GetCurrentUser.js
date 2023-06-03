import { useDispatch } from 'react-redux'

function GetCurrentUser() {
  const dispatch = useDispatch()

  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     dispatch(updateUserDataAction(user))
  //     // if(router.pathname === "/"){
  //     //   router.push("/app/wallet/vionex-wallet");
  //     // }
  //   }
  // })
}

export default GetCurrentUser
