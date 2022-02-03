import React from 'react';
import { Box, Button, Text, TextField } from "@skynexui/components";
import appConfig from '../../config.json';
import { useRouter } from "next/router";
import { usuarios } from '../Usuarios';
import {Usuario} from '../Usuarios'

export default function Cadastro() {
  const roteamento = useRouter()

  const [newUser, setNewUser] = React.useState()
  const [newPassword, setNewPassword] = React.useState()

  return (
    <Box
      as='form'
      onSubmit={(el) => {
        el.preventDefault()
        // vai no array de usuarios e verifica se o usuario criado ja existe
        const verificarExistenciaUser = usuarios.map((usuario) => {
          //se ja existe, retorna true
          if(usuario.nick == newUser) {
            return true
          }
        })
        // como o map retorna um array,procurei o index de true. se não houver true é pq a conta criada n existe, então ele permite a criação
        if(verificarExistenciaUser.indexOf(true) < 0 && newPassword != undefined) {
          const contaCriada = new Usuario({
            nick: newUser,
            senha: newPassword
          })

          usuarios.push(contaCriada)
          console.log(usuarios)
        }

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