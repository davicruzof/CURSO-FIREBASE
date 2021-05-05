function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert('usuario deslogou');
    });
}

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener('DOMContentLoaded', function () {
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  var config = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        console.log('🚀 ~ authResult ~', authResult);
        return false;
      },
    },
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    signInFlow: 'popup',
  };
  ui.start('#firebaseui-auth', config);
});
