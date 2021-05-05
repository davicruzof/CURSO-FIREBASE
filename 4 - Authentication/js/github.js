function loginGithub() {
  let provider = new firebase.auth.GithubAuthProvider();

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
