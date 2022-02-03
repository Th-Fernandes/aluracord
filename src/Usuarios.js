export class Usuario {
  constructor({nick, senha}) {
    this.nick = nick;
    this.senha = senha;
  }
}

export const usuarios = [
  new Usuario({
    nick: 'th-fernandes',
    senha: '123'
  }),

  new Usuario({
    nick: 'paimisto',
    senha: '789'
  }),

  new Usuario ({
    nick: 'mandinha',
    senha: '321'
  })
]

/* 
  - [x] coletar os dados do formulario de criar conta
  - [x] verificar se ja existe um usuario com os mesmo credenciais 
  - [x] criar uma nova instancia de Usuario com os dados
  - [x] puxar o novo Usuario pro array de usuarios
*/