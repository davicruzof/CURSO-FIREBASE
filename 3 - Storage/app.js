/**
 * Variáveis com referencias dos inputs
 */
var fileInput = document.getElementById('file-input');
var stringInput = document.getElementById('string-input');
/**
 *  referencia para storage do firebase aqui vai ser criado uma pasta chamada files
 */
var ref = firebase.storage().ref('files');
var taskUpload;
/**
 * Metodo que observa mudanças no input de arquivo
 */
fileInput.onchange = function (event) {
  let file = event.target.files[0];
  let uid = firebase.database().ref().push().key;
  /**
   * .child('file'): caminho onde deve ser iserido o arquivo
   * .put(file): arquivo que vai ser enviado
   */
  // ref
  //   .child(uid)
  //   .put(file, {
  //     customMetadata: {
  //       nome: 'curriculo',
  //       descricao: 'curriculo atualizado',
  //     },
  //   })
  //   .then((snapshot) => {
  //     console.log('snapshot', snapshot);
  //     /**
  //      * .child('file'): caminho onde deve ser iserido o arquivo
  //      * .getDownloadURL(): retorna a url para acessar o arquivo
  //      */
  //     ref
  //       .child(uid)
  //       .getDownloadURL()
  //       .then((url) => {
  //         console.log('url:', url);
  //       });
  //   });

  // ref
  //   .child(uid)
  //   .getMetadata()
  //   .then((metadata) => {
  //     console.log('🚀 metadata', metadata);
  //   });

  // ref.child('files').put(file, {
  //   contentType: '',
  //   customMetadata: {
  //     nome: 'curriculo',
  //     descricao: 'curriculo atualizado',
  //   },
  // });

  /**
   *  getMetadata(): retorna os metadados do file
   */

  // ref
  //   .child('file')
  //   .getMetadata()
  //   .then((metadata) => {
  //     console.log('🚀 metadata', metadata);
  //   });
  /**
   *  atribui a tarfea de upload a uma variavel
   */
  taskUpload = ref.child(uid).put(file);

  /**
   *  on('state_changed',obsevavel_upload, error, completou)
   */
  taskUpload.on(
    'state_changed',
    (upload) => {
      console.log('🚀 upload - ', upload);
      /**
       *  running | paused | success
       */
      if (upload.state == 'running') {
        var progresso = Math.round(
          /**
           *  bytesTransferred: bytes tranferidos
           *  totalBytes : bytes totais do arquivo
           */
          (upload.bytesTransferred / upload.totalBytes) * 100,
        );
        console.log('🚀 progresso', progresso, '%');
      }
    },
    (error) => {
      console.log('🚀 error', error);
    },
    () => {
      console.log('Tarefa completa');
      ref
        .child(uid)
        .getDownloadURL()
        .then((url) => {
          console.log('🚀 url', url);
        });
    },
  );

  // taskUpload
  //   .then((snapshot) => {
  //     console.log('🚀 snapshot', snapshot);
  //   })
  //   .catch((err) => console.log(err));
};

/**
 *
 * Deleta um arquivo
 */

function deletar() {
  ref
    .child('-MZvdno27xS3wnrXFI9T')
    .delete()
    .then(() => {
      console.log('Deletado com sucesso');
    })
    .catch((err) => console.log(err));
}

/**
 * Metodo que observa mudanças no input de string
 */
stringInput.onchange = function (event) {
  let file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    console.log('🚀 ~ file: app.js ~ line 49 ~ metadata', metadata);
    console.log('🚀 ~ file: app.js ~ line 49 ~ metadata', metadata);
    const base64 = reader.result.split('base64,')[1];
    /**
     * putString(string,formato, metadado): Salva uma string no firebase e eu posso colocar um formato de imagem para que ele automaticamente converta a ele.
     */
    ref
      .child('image')
      .putString(base64, 'base64', { contentType: 'image/jpg' })
      .then(() => {
        console.log('🚀 ~ file: app.js ~ line 94 ~ err', err);
        ref
          .child('image')
          .getDownloadURL()
          .then((url) => {
            console.log('url:', url);
          });
      });
  };
};

/**
 *  pausa a tarefa de upload
 */
pausar = () => {
  taskUpload.pause();
  console.log('Pause a task');
};
/**
 *  continua a tarefa de upload pausada
 */
continuar = () => {
  taskUpload.resume();
  console.log('Continuou a task');
};
/**
 *  cancela a tarefa de upload
 */
cancelar = () => {
  taskUpload.cancel();
  console.log('Cancelou a task');
};
