function loginFacebook() {
  let provider = new firebase.auth.FacebookAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((response) => {
      console.log('🚀 User:', response.user);
      console.log('🚀 Token:', response.credential.accessToken);
    })
    .catch((err) => {
      console.log('🚀 ~ Erro login do facebook', err);
    });
}
