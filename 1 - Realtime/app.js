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
 * firebase objeto global
 * database metodo de acesso ao realtimedatase
 * ref url em string para o nome onde vai ser manipulado os dados
 */
var ref = firebase.database().ref('card');

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
   * firebase objeto global
   * database metodo de acesso ao realtimedatase
   * ref url em string para o nome onde vai ser manipulado os dados
   * set metodos de inserir os dados
   * 
    firebase
      .database()
      .ref(`card/${card.name}`)
      .set(card)
      .then(() => {
        adicionaCardATela(card);
      });

  */

  /**
   * ref url em string para o nome onde vai ser manipulado os dados
   * child acesando um no filho passado por parametro
   
   ref
   .child(card.name)
   .set(card)
   .then(() => {
       adicionaCardATela(card);
    });
    */

  /**
   *  push cria um id unico e insere os dados dentro desse id
   */
  //   ref.push(card).then((snapshot) => {
  // adicionaCardATela(card, snapshot.key);
  //   });

  /**
   * usando fetch para adicionar dados
   */

  fetch('https://pj-teste.firebaseio.com/card.json', {
    body: JSON.stringify(card),
    method: 'POST',
    mode: 'no-cors',
  }).catch((err) => {
    console.log('Erro ao adicionar:', err);
  });
}

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
  /**
   *  remove(): excluir o nó do rtdb e seus filhos
   
  ref
    .child(id)
    .remove()
    .then(() => {
      document.getElementById(id).remove();
    });

  
   *  set(null): exclui o nó no firebase
   */
  ref
    .child(id)
    .set(null)
    .then(() => {
      document.getElementById(id).remove();
    });
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
   *  set(): acessar o valor que vai ser alterado e setado um novo valor
   */
  ref
    .child(id + '/followers')
    .set(countNumber)
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
     * @param {Object} update: acessar o objeto qual vai ser acessado e atribui o valor que vai ser alterado
     */
    ref
      .child(id)
      .update({ followers: countNumber })
      .then(() => {
        count.innerText = countNumber;
      })
      .catch((err) => {
        console.log('Erro ao descustir:', err);
      });
  }
}

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener('DOMContentLoaded', function () {
  /**
   *  Log dos status da chamadas no firebase
   */
  //   firebase.database.enableLogging((message) => {
  //     console.log('Firebase', message);
  //   });
  /**
   *  once retorna os dados lidos de uma url
   * snapshot e um objeto retornado pela leitura
   
  ref.once('value').then((snapshot) => {
    
     *  acessa um nó filho
    
    console.log('Filhos:', snapshot.child('-MZt0Xb1W0CQHrHmihaK'));
    
     *  chega se existe algo no snaphot
    
    console.log('Exite resposta:', snapshot.exists());
    
     *  hasChild - retorna um boolean caso o filho passado por parametro existe
     
    console.log(
      'Atributo name existe:',
      snapshot.hasChild('-MZt0Xb1W0CQHrHmihaK/name'),
    );
    console.log(
      'Atributo site existe:',
      snapshot.hasChild('-MZt0Xb1W0CQHrHmihaK/site'),
    );
    
     *  hasChildren - retorna um boolean se tem algum filho dento desse nó passado por parametro
     
    console.log(
      'Filhos do nó',
      snapshot.child('-MZt0Xb1W0CQHrHmihaK').hasChildren(),
    );

     *  numChildren retorna os numero de filhos
    console.log('Numero de filhos:', snapshot.numChildren());

    console.log('Chaves:', snapshot.key);
     

    snapshot.forEach((value) => {
      adicionaCardATela(value.val(), value.key);
    });

  // ORDENCAÇÃO: apenas um metodo de ordenação por vez

  /**
   *  orderByChild('filho'): ordena pela propriedade filho passado por parametro
   */

  //   ref.orderByChild('age').on('child_added', (snapshot) => {
  //     adicionaCardATela(snapshot.val(), snapshot.key);
  //   });

  /**
   *  orderByKey('filho'): ordena pela key
   */
  //   ref.orderByKey().on('child_added', (snapshot) => {
  //     adicionaCardATela(snapshot.val(), snapshot.key);
  //   });

  /**
   *  orderByValue('filho'): ordena pelo valor de cada propriedade dentro do nó
   */
  //   ref
  //     .child('-MZt7hG-0G5xoj2eT-7U')
  //     .orderByValue()
  //     .on('child_added', (snapshot) => {
  //       console.log(snapshot.val(), snapshot.key);
  //     });

  /**
   *  Filtra a busca por proriedade
   *  orderByChild('propriedade')
   *  startAt(parametro): valor incial a qual deve ser buscado
   *  endtAt(parametro): valor final a qual deve ser buscado
   *  equalTo(parametro): valor igaual ao qual está sendo buscado
   */
  //   ref
  //     .orderByChild('age')
  //     .startAt(30)
  //     .endAt(36)
  //     .on('child_added', (snapshot) => {
  //       adicionaCardATela(snapshot.val(), snapshot.key);
  //     });

  /**
   *  Limites
   *  limitToFirst(Number): Retorna apenas a quantidade de dados desde o primeiro ate o tamanho do limite
   *  limitToLast(Number): Retorna apenas a quantidade de dados do tamanho até o ultimo do limite
   *  obs: usar para criar paginacão
   */

  //   ref
  //     .orderByChild('age')
  //     .startAt(0)
  //     .limitToFirst(2)
  //     .on('child_added', (snapshot) => {
  //       adicionaCardATela(snapshot.val(), snapshot.key);
  //     });

  /**
   *  child_added: retorna todos os nós um por vez
   
  ref.on('child_added', (snapshot) => {
    adicionaCardATela(snapshot.val(), snapshot.key);
  });
  
   *  child_changed: é diparado se algum dado foi modifiado na referencia, retorna o id modificado e seu uid antecessor
   
  ref.on('child_changed', (snapshot, uid) => {
    adicionaCardATela(snapshot.val(), uid);
  });

  
   *  child_changed: é diparado se algum dado foi modifiado na referencia, retorna o id modificado e seu uid antecessor
   
  ref.on('child_removed', (snapshot, uid) => {
    adicionaCardATela(snapshot.val(), uid);
  });
  
   */

  /**
   *  usando fetch no lugar da lib do firebase
   */
  fetch('https://pj-teste.firebaseio.com/card.json')
    .then((res) => res.json())
    .then((res) => {
      for (var key in res) {
        adicionaCardATela(res[key], key);
      }
    });
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
