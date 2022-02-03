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

/* 
  # MANDAR OS DADOS DE USUARIO PRO BANCO DA SUPABASE
  - [] fazer uma nova tabela no supabase que recebe o nick e a senha
  - [] mandar pro banco de dados, os novos usuários que forem criados
*/

/* 
  ao inves de verificar pelo array usuarios, pegar diretamente do banco da supabase
  
*/