import React from 'react';
import ReactDOM from 'react-dom';
import { Box, Button, Text, TextField } from "@skynexui/components";
import appConfig from '../../config.json';
import { useRouter } from "next/router";
import {Usuario} from '../Usuarios';
import { createClient } from '@supabase/supabase-js'
import CadastroEfetuado from './CadastroEfetuado';

//ACESSO PELO NAVEGADOR SEM BACKEND
const SUPABASE_ANNON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5NzUwMSwiZXhwIjoxOTU4OTczNTAxfQ.JbwXi_cKElYn09Q31Pow6iecx6FRUnHuTQHq2UuQulk'
// FAZER REQUISIÇÃO PRO BANCO DE DADOS INTERMEDIADO PELA URL
const SUPABASE_URL = 'https://wlxwthigsrhywgfyglgd.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANNON_KEY)

export default function Cadastro() {
  const roteamento = useRouter()

  const [newUser, setNewUser] = React.useState()
  const [newPassword, setNewPassword] = React.useState()

  return (
    <Box
      as='form'
      onSubmit={(el) => {
        el.preventDefault()
      
        supabaseClient
          .from('usuarios')
          .select()
          .then((response) => {
            //pega o array de objects com o cadastro os usuarios
            const usuarios = response.body
            //verifica se o usuario cadastrado ja existe no banco
            let verificarExistenciaUser = usuarios.map((usuario) => {
              if(usuario.nick == newUser) {
                alert('usuario ja existe no nosso sistema. Tente outro nick')
                return true
              }
            })
            // procura pelo valor 'true' no array retornado pelo map. Se não houver, ele guarda no banco o novo cadastro
            if(verificarExistenciaUser.indexOf(true) < 0 && newPassword != undefined) {
              supabaseClient
                .from('usuarios')
                .insert({
                  nick: newUser,
                  senha: newPassword
                })
                .then(() => {
                  // !!!GAMBIARRA ALERT!!! ARRUMA UMA SOLUÇÃO MELHOR EM BREVE
                  //ReactDOM.render(<CadastroEfetuado/>, document.getElementById('__next'));
                })
            }
           
            console.log(verificarExistenciaUser)
          })
      }}
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 'min(100%, 60rem)',
        height: {sm: '40rem', md: '50%', lg: '50%', xl: '100%'},
        backgroundColor: appConfig.theme.colors.neutrals['000'],
        borderRadius: {sm:'0 0 1.6rem 1.6rem' ,xl: '0 3.2rem 3.2rem 0'},
        textAlign: 'center'
      }}
    >
      {/* dados cadastro usuario */}
      <Box>
        <Text styleSheet={{ fontSize: '3.4rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Criar conta</Text>

        <TextField
          onChange={(el) => {
            const newUserInput = el.target.value;
            setNewUser(newUserInput)
          }}
            placeholder='nome de usuário' 
            textFieldColors='neutral' 
            styleSheet={{ backgroundColor: 'transparente' }} />
        <TextField
          onChange={(el) => {
            const newPassInput = el.target.value;
            setNewPassword(newPassInput)
          }} 
          placeholder='senha' 
          textFieldColors='neutral' 
          type='password' 
          styleSheet={{ backgroundColor: 'transparente' }} />

        <Button type='submit' label='cadastrar' colorVariant='dark' styleSheet={{ width: '15rem', marginTop: '1.5rem' }} />
      </Box>
    </Box>
  )

}