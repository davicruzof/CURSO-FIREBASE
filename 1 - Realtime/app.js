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
 * database(): metodo de acesso ao realtimedatase
 * ref('url'): url de manipulação do banco com o parametro do nó
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
   * database(): metodo de acesso ao realtimedatase
   * ref('url'): url de manipulação do banco com o parametro do nó
   * set({key: value}): metodos para inserir os dados no banco apartir de uma referencia do nó
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
   * ref('url'): url de manipulação do banco com o parametro do nó
   * child('key'): acesando um nó através de uma propriedade
   * set({key: value}): metodos para inserir os dados no banco apartir de uma referencia do nó
   ref
   .child(card.name)
   .set(card)
   .then(() => {
       adicionaCardATela(card);
    });
    */

  /**
   * ref('url'): url de manipulação do banco com o parametro do nó
   * push({key:value}): cria um id único e insere os dados dentro desse id
   * 
   ref.push(card).then((snapshot) => {
     adicionaCardATela(card, snapshot.key);
    });
   *
  */

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
   * child(''): nó filho o qual vai ser manipulado
   * remove(): excluir o nó do banco como tambem seus filhos
   * 
   
  ref
    .child(id)
    .remove()
    .then(() => {
      document.getElementById(id).remove();
    });

  
   * set(null): exclui o nó no firebase como tambem seus filhos
   *
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
   * child(id + '/key'): propriedade que vai ser modificada
   * set(value): valor que vai ser inserido na propriedade
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
     * child(id): filho que vai ser modificado
     * upadte({propriedade: value}): valor que vai ser inserido na propriedade
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
    Log dos status da chamadas no firebase
  
    firebase.database.enableLogging((message) => {
      console.log('Firebase', message);
    });
  
   * tipo: "value" | "child_added" | "child_changed" | "child_moved" | "child_removed"
   * once(tipo): retorna os dados lidos de uma url
   * snapshot: retorna um objeto com dados 
     * metodos:
        * snapshot.child('id'): acessa um nó filho especifico
        * snapshot.exists(): verifica se existe algo na resposta do snapshot
        * hasChild('idNo/key'): retorna um boolean se o filho passado por parametro existe
        * hasChild('keyNo'): retorna um boolean se o filho passado por parametro existe
        * hasChildren(): retorna um boolean se tem algum filho dento desse nó passado por parametro
        * numChildren: retorna os numero de filhos
        * key: retorna as chaves
        * forEach((value) => { value.val(), value.key })
   
  ref.once('value').then((snapshot) => {
    
    console.log('Filhos:', snapshot.child('-MZt0Xb1W0CQHrHmihaK'));
    console.log('Exite resposta:', snapshot.exists()); 
    console.log('Atributo name existe:', snapshot.hasChild('-MZt0Xb1W0CQHrHmihaK/name'));
    console.log('Atributo site existe:',snapshot.hasChild('-MZt0Xb1W0CQHrHmihaK/site'));     
    console.log('Filhos do nó',snapshot.child('-MZt0Xb1W0CQHrHmihaK').hasChildren());
    console.log('Numero de filhos:', snapshot.numChildren());
    console.log('Chaves:', snapshot.key);
    snapshot.forEach((value) => {adicionaCardATela(value.val(), value.key);});

  /**
   ORDENCAÇÃO: apenas um metodo de ordenação por vez

   *  orderByChild('key|filho'): ordena pela propriedade filho passado por parametro
   *  orderByKey('filho'): ordena pela key
   *  orderByValue('filho'): ordena pelo valor de cada propriedade dentro do nó
   *  startAt(parametro): valor incial a qual deve ser buscado
   *  endtAt(parametro): valor final a qual deve ser buscado
   *  equalTo(parametro): valor igaual ao qual está sendo buscado

     ref.orderByChild('age').on('child_added', (snapshot) => {
       adicionaCardATela(snapshot.val(), snapshot.key);
     });

     ref.orderByKey().on('child_added', (snapshot) => {
       adicionaCardATela(snapshot.val(), snapshot.key);
     });
      
     ref.child('-MZt7hG-0G5xoj2eT-7U').orderByValue().on('child_added', (snapshot) => {console.log(snapshot.val(), snapshot.key)});

     ref.orderByChild('age').startAt(30).endAt(36).on('child_added', (snapshot) => {adicionaCardATela(snapshot.val(), snapshot.key)});

  
   Limites
   *  limitToFirst(Number): Retorna apenas a quantidade de dados desde o primeiro ate o tamanho do limite
   *  limitToLast(Number): Retorna apenas a quantidade de dados do tamanho até o ultimo do limite
   *  #DICA: usar para criar paginacão

     ref.orderByChild('age').startAt(0).limitToFirst(2).on('child_added', (snapshot) => {adicionaCardATela(snapshot.val(), snapshot.key)});
  

  Observables
   *  child_added: retorna todos os nós um por vez
   *  child_changed: é diparado se algum dado foi modifiado na referencia, retorna o id modificado e seu uid antecessor
   *  child_changed: é diparado se algum dado foi modifiado na referencia, retorna o id modificado e seu uid antecessor
   
      ref.on('child_added', (snapshot) => {adicionaCardATela(snapshot.val(), snapshot.key)});
      ref.on('child_changed', (snapshot, uid) => {adicionaCardATela(snapshot.val(), uid)});
      ref.on('child_removed', (snapshot, uid) => {adicionaCardATela(snapshot.val(), uid)});


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
