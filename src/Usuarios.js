class Usuario {
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
  })
]