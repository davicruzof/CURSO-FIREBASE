function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert('usuario deslogou');
    });
}
