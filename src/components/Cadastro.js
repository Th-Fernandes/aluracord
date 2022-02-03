import React from 'react';
import {Box, Button, Text, TextField} from "@skynexui/components";
import appConfig from '../../config.json';
import { useRouter } from "next/router";

export default function Cadastro()  {
  const roteamento = useRouter()

    return(
      <Box
        as='form'
        onSubmit = {(el) => {
          el.preventDefault()
          //troca para a pagina de chat sem reload (spa)
          roteamento.push(`./chat?username=th-fernandes`)
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
            <Text styleSheet={{fontSize: '3.4rem', fontWeight: 'bold',  marginBottom: '1.5rem'}}>Criar conta</Text>

            <TextField placeholder='nome de usuário' textFieldColors='neutral' styleSheet={{backgroundColor: 'transparente'}}/>
            <TextField placeholder='senha' textFieldColors='neutral' type='password' styleSheet={{backgroundColor: 'transparente'}}/>

            <Button type='submit' label='cadastrar' colorVariant='dark' styleSheet={{width: '15rem', marginTop: '1.5rem'}}/>
         </Box>
      </Box>
    )
  
}