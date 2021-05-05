/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName('card-container')[0];
var NOMES = [
  'Anderson',
  'Beatriz',
  'Caio',
  'Davi',
  'Everton',
  'Fabiana',
  'Gabriel',
  'Hortencia',
  'Igor',
  'Joana',
];

/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
  let card = {
    name: NOMES[Math.floor(Math.random() * NOMES.length - 1)],
    age: Math.floor(Math.random() * 22 + 18),
    followers: 0,
  };

  /**
   * collection('name collection'): criar a colecao
   * doc('uid'): o documento da colecao
   * set({key: value}): dados que vão ser inseridos no banco
   

  firebase
    .firestore()
    .collection('cards')
    .doc('1')
    .set(card)
    .then(() => {
      console.log('Dados Adicionados');
      adicionaCardATela(card, 1);
    });

   *  add({key: value}): criar um uid e coloca um registro dentro dele
   */

  // firebase.firestore().collection('cards').add(card);

  /**
   *  Gravar em lote
   *  primeiro criar um batch()
   * - Esse batch serve para armazenar as operações que serão executadas
   * - operacões disponiveis: set | update | delete
   * - Para criar um set precisa criar um a referencia do docuemtno e os dados que deseja inserir
   * - Ao criar todos os metodos e necessario executar o metodo commit para executar as operações
   *  - cokm o batch ou todas são armazenadas ou nem é armazenada
   */

  var batch = firebase.firestore().batch();
  var cards = [];
  for (let i = 0; i < 3; i++) {
    let doc = {
      name: NOMES[Math.floor(Math.random() * NOMES.length - 1)],
      age: Math.floor(Math.random() * 22 + 18),
      followers: 0,
    };

    cards.push(doc);
    let ref = firebase.firestore().collection('cards').doc(String(i));
    batch.set(ref, doc);
  }

  batch.commit(() => {
    for (let i = 0; i < cards.length; i++) {
      adicionaCardATela(card[i], i);
    }
  });
}

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
  /**
   *  delete():deleta o documento da coleção usado apenas em documentos
   */
  firebase
    .firestore()
    .collection('cards')
    .doc(id)
    .delete()
    .then(() => {
      document.getElementById(id).remove();
    });

  /**
   *  update({ propriedade: firebase.firestore.FieldValue.delete() }):deletendo uma propriedade do documento no firestone
   */
  // firebase
  //   .firestore()
  //   .collection('cards')
  //   .doc(id)
  //   .update({ followers: firebase.firestore.FieldValue.delete() })
  //   .then(() => {
  //     console.log('Removido Curtidas');
  //   });
}

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {
  let card = document.getElementById(id);
  let count = card.getElementsByClassName('count-number')[0];
  let countNumber = +count.innerText;
  countNumber = countNumber + 1;

  /**
   *  update({key: value}): Atualiza todos os dados no parametro: OBS: só pode ser usado apenas em docs
   */
  firebase
    .firestore()
    .collection('cards')
    .doc(id)
    .update({ followers: countNumber })
    .then(
      () => {
        count.innerText = countNumber;
      },
      (err) => {
        console.log('Erro ao curtir:', err);
      },
    );
}

/**
 * Decrementa o numero de curtidas
 * @param {String} id Id do card
 */
function descurtir(id) {
  let card = document.getElementById(id);
  let count = card.getElementsByClassName('count-number')[0];
  let countNumber = +count.innerText;
  if (countNumber > 0) {
    countNumber = countNumber - 1;
    /**
     *  update({key: value}): Atualiza todos os dados no parametro: OBS: só pode ser usado apenas em docs
     */
    firebase
      .firestore()
      .collection('cards')
      .doc(id)
      .update({ followers: countNumber })
      .then(
        () => {
          count.innerText = countNumber;
        },
        (err) => {
          console.log('Erro ao curtir:', err);
        },
      );
  }
}

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener('DOMContentLoaded', function () {
  /**
   * get(): busca dados uma vez
   

  firebase
    .firestore()
    .collection('cards')
    .get()
    .then((snapshot) => {
      
       *  Uma propriedade que retorna um boolean se o snapshot estiver vazio
       * snapshot.empty
      
       *  Retorna a query uilizada no filtro para esse get
       * snapshot.metadata

       *  Retorna o total de documentos dentro da coleção
       * snapshot.size
     
       *  Retorna um array com as mudanças que essa coleç˜åo sofreu desde a ultima leitura
       * snapshot.docChanges
       
       * os documentos dentro da coleção , retorna um objeto para usar com forEach(()=>{})
       *  snapshot.docs()
       
      snapshot.docs.forEach((card) => {
        
         * Retorna os dados documento
         * card.data()
         
         * Retorna o UID do meu documento
         * card.id()
         
         * Retorna um boolean caso o documento passado seja igual ao documento utilizado, serve para docs e colletions
         * card.isEqual(doc)
        
         adicionaCardATela(card.data(), card.id);
      });

      
       *  Observando em tempo real
       

      firebase
        .firestore()
        .collection('cards')
        .onSnapshot((snapshot) => {
          
           *  Usar dessa forma é equivalente ao .on('value') do Realtime Database
           * snapshot.docs.forEach(element => {});
          

          snapshot.docChanges().forEach((card) => {
            
             *  tras todos os documentos com o evento de added na primeira chamada e depois
             * traz apenas os novos documentos ou documentos que sofreram alterações
            

            if (card.type == 'added') {
              adicionaCardATela(card.doc.data(), card.doc.id);
            }

            if (card.type == 'modified') {
              console.log(card.doc.data(), card.doc.id);
            }

            if (card.type == 'removed') {
              console.log(card.doc.data(), card.doc.id);
            }
          });
        });
    });

    */
  /**
   *  Consultas
   *  operador: > | < | >= | <= | ==
   * where(propriedade,operador, value): retorna os dados que atedem a condição passada. OBS =  não aceita || ou && ou !=
   */
  // firebase
  //   .firestore()
  //   .collection('cards')
  //   .where('age', '>', 25)
  //   .where('age', '<', 30)
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((card) => {
  //       adicionaCardATela(card.data(), card.id);
  //     });
  //   });
  /**
   *  Ordenação
   *  orderBy(propriedade, 'desc | asc'): ordena pelo campo e pleo tipo de ordenacão passado, tipo não obrigatorio
   * Obs: usando junto com o where deve usar a mesma propriedade em ambos
   */
  // firebase
  //   .firestore()
  //   .collection('cards')
  //   .where('followers', '>', 3)
  //   .orderBy('followers', 'desc')
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((card) => {
  //       adicionaCardATela(card.data(), card.id);
  //     });
  //   });
  /**
   *  Limites
   * limit(number): retorna apenas os numero de resultado passado por parametro
   */
  // firebase
  //   .firestore()
  //   .collection('cards')
  //   .limit(3)
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((card) => {
  //       adicionaCardATela(card.data(), card.id);
  //     });
  //   });
  /**
   *  Filtros
   * startAt(value): Comecar a filtar apartir do valor passado >=
   * startAfter(value): Comecar a filtar apos o valor passado >
   * endBefore(value): Comecar a filtar menor do que o valor passado <
   * endAt(value): Comecar a filtar ate o valor passado <=
   * cursores aceitam um documento para iniciar o filtro
   */
  var startAt;
  firebase
    .firestore()
    .collection('cards')
    .limit(3)
    .get()
    .then((snapshot) => {
      startAt = snapshot.docs[snapshot.docs.length - 1];
      firebase
        .firestore()
        .collection('cards')
        .startAfter(startAt)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((card) => {
            adicionaCardATela(card.data(), card.id);
          });
        });
    });
  // firebase
  //   .firestore()
  //   .collection('cards')
  //   .orderBy('age')
  //   .startAfter(25)
  //   .endAt(40)
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((card) => {
  //       adicionaCardATela(card.data(), card.id);
  //     });
  //   });
});

/**
 * Adiciona card na tela
 * @param {Object} informacao Objeto contendo dados do card
 * @param {String} id UID do objeto inserido/consultado
 */
function adicionaCardATela(informacao, id) {
  /**
   * HEADER DO CARD
   */
  let header = document.createElement('h2');
  header.innerText = informacao.name;
  header.classList.add('card-title');
  // ===================================

  /**
   * CONTENT DO CARD
   */
  let content = document.createElement('p');
  content.classList.add('card-text');
  content.innerText = informacao.age + ' anos.';
  // ===================================

  /**
   * BOTÕES DO CARD
   */
  let inner = document.createElement('div');
  inner.classList.add('row');
  // Botão adicionar
  let button_add = document.createElement('button');
  button_add.classList.add('btn', 'btn-link', 'col-3');
  button_add.setAttribute('onclick', "curtir('" + id + "')");
  button_add.innerText = '+';
  inner.appendChild(button_add);

  // Contador de curtidas
  let counter = document.createElement('span');
  counter.innerHTML = informacao.followers;
  counter.classList.add('col-3', 'text-center', 'count-number');
  inner.appendChild(counter);

  // Botão de subtrair
  let button_sub = document.createElement('button');
  button_sub.classList.add('btn', 'btn-link', 'col-3');
  button_sub.setAttribute('onclick', "descurtir('" + id + "')");
  button_sub.innerText = '-';
  inner.appendChild(button_sub);
  // ===================================

  // Botão de excluir
  let button_del = document.createElement('button');
  button_del.classList.add('btn', 'btn-danger', 'col-3');
  button_del.setAttribute('onclick', "deletar('" + id + "')");
  button_del.innerText = 'x';
  inner.appendChild(button_del);
  // ===================================

  /**
   * CARD
   */
  let card = document.createElement('div');
  card.classList.add('card');
  card.id = id;
  let card_body = document.createElement('div');
  card_body.classList.add('card-body');
  // ===================================

  // popula card
  card_body.appendChild(header);
  card_body.appendChild(content);
  card_body.appendChild(inner);
  card.appendChild(card_body);

  // insere no container
  CARD_CONTAINER.appendChild(card);
}
