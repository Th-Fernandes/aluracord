import React from 'react';
import { Box, Button, Text, TextField } from "@skynexui/components";
import appConfig from '../../config.json';
import { useRouter } from "next/router";
import { usuarios } from '../Usuarios';
import {Usuario} from '../Usuarios';
import { createClient } from '@supabase/supabase-js'

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
            const usuarios = response.body
            let verificarExistenciaUser = usuarios.map((usuario) => {
              if(usuario.nick == newUser) {
                return true
              }
            })

            if(verificarExistenciaUser.indexOf(true) < 0 && newPassword != undefined) {
              const contaCriada = new Usuario({
                nick: newUser,
                senha: newPassword
              })
    
              supabaseClient
                .from('usuarios')
                .insert({
                  nick: newUser,
                  senha: newPassword
                })
                .then((response) => {})
            }
            
            console.log(verificarExistenciaUser)
          })
        //roteamento.push(`./chat?username=th-fernandes`)
      }}
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexGrow: 1,
        backgroundColor: appConfig.theme.colors.neutrals['000'],
        borderRadius: '0 3.2rem 3.2rem 0',
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