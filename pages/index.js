import React, { useEffect } from "react";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import Cadastro from '../src/components/Cadastro';
import { useRouter } from "next/router";
import appConfig from "../config.json";
import { usuarios } from "../src/Usuarios";

export default function PaginaInicial() {
  const [username, setUsername] = React.useState()
  const [loginPassword, setLoginPassword] = React.useState()
  const roteamento = useRouter()

  return (
    <>
      <Box
      as="section"
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.neutrals[100],
        backgroundImage: 'url(https://wallpapercave.com/wp/wp4341592.jpg)',
      }}
    >
      {/* main content */}
      <Box
        styleSheet={{
          width: { xs: '90%', sm: '90%', md: '80%', xl: '1200px' }, height: '80rem',
          display: 'flex',
        }}
      >
        {/*  login */}
        <Box
          styleSheet={{
            flexGrow: 0.2,
            backgroundColor: appConfig.theme.colors.primary[900],
            borderRadius: '3.2rem 0 0 3.2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <Box styleSheet={{ color: appConfig.theme.colors.neutrals['000'], textAlign: 'center' }}>
            <h1 style={{ fontSize: '6.2rem' }}>QUICK CHAT</h1>
            <p style={{ color: appConfig.theme.colors.neutrals[300], marginBottom: '0.4rem' }}> chat de forma Simples, rápido e fácil</p>
            <p style={{ color: appConfig.theme.colors.neutrals[300] }}> Faça login para aproveitar ao máximo a nossa ferramenta.</p>

            <Box
              as='form'
              onSubmit={(el) => {
                el.preventDefault()
                /*
                - fazer um map no array dos usuarios e fazer a verificação de ponta a ponta

                if(usuarios[0].nick == username && usuarios[0].senha == loginPassword) {
                  roteamento.push(`./chat?username=${username}`)
                }
                */

                usuarios.map((usuario) => {
                  if(usuario.nick == username && usuario.senha == loginPassword) {
                    roteamento.push(`./chat?username=${username}`)
                  }
                })

                
                              
              }}
              styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '0 3.2rem 3.2rem 0',
                textAlign: 'center',
                marginTop: '1.2rem'
              }}
            >
              {/* login user */}
              <Box>
                <TextField 
                onChange={(el) => {
                   const userInputValue = el.target.value
                   setUsername(userInputValue)
                   console.log(username)
                }}
                  placeholder='nome de usuário' 
                  textFieldColors='neutral' 
                  styleSheet={{ backgroundColor: 'transparente' }} />
                <TextField 
                  onChange={(el) => {
                    const passInputValue = el.target.value;
                    setLoginPassword(passInputValue)
                  }} 
                  placeholder='senha' 
                  textFieldColors='neutral' 
                  type='password' 
                  styleSheet={{ backgroundColor: 'transparente' }} />

                <Button type='submit' label='login' colorVariant='dark' styleSheet={{ width: '15rem', marginTop: '1.5rem' }} />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* formulario de cadastro */}
        <Cadastro/> 
      </Box>
    </Box>
    </>
  );
}