var currentUser;

/**
 * Função para cadastro com email e senha
 */
function createLogin() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('senha').value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('Usuario', user);
      alert('Logado');
    })
    .catch((err) => {
      console.log('🚀 ~ Erro ao criar conta', err);
    });
}

/**
 * Função para login
 */
function loginEmail() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('senha').value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      alert('usuario logado');
    })
    .catch((err) => {
      console.log('🚀 ~ Erro no login', err);
    });
}

/**
 * Listener de dom ready
 */
document.addEventListener('DOMContentLoaded', function () {
  /**
   *  Observa se há usuario e mudancas na autenticacao (login e logout)
   */
  firebase.auth().onAuthStateChanged((usuario) => {
    if (usuario) {
      console.log('Usuario', usuario);
      currentUser = usuario;

      // mundando o idioma do firebase
      firebase.auth().languageCode = 'pt';
      // muda o idioma para o mesmo usado no aparelho
      firebase.auth().useDeviceLanguage();

      if (!usuario.emailVerified) {
        // Envia um email para verificar de cadastro
        usuario.sendEmailVerification().then(() => {
          alert('Email de verificacão enviado!');
        });
      }
      // emaiul de mudança de senha
      firebase
        .auth()
        .sendPasswordResetEmail(usuario.email)
        .then(() => {
          console.log('Email de recuperação de senha enviado!');
        });
    } else {
      console.log('Não há usuario logado');
    }
  });

  currentUser = firebase.auth().currentUser;

  if (currentUser) {
    console.log('🚀 currentUser', currentUser);
    currentUser.updateProfile({
      displayName: 'Davi cruz',
      photoURL: '',
    });

    // currentUser.updateEmail('cruz@email.com');
    // currentUser.updatePassword('654321');
    // currentUser.updatePhoneNumber('+55XXXXXXXXXXX');
  }
});

/**
 *  deleta um usuario
 */

function deletaUsuario() {
  if (currentUser) {
    currentUser.delete().then(() => {
      alert('usuario excluido');
    });
  }
}
