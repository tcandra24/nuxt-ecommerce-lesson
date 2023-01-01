export default function({ $auth, redirect }) {

  //check loggedIn "false"
  if(!$auth.loggedIn) {
      return redirect('/admin/login')
  }

  //check admin role
  if($auth.strategy.name != "admin") {
      return redirect('/admin/login')
  } else {
      return
  }

}
