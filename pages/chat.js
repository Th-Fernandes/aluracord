import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/buttonSendSticker'

//ACESSO PELO NAVEGADOR SEM BACKEND
const SUPABASE_ANNON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5NzUwMSwiZXhwIjoxOTU4OTczNTAxfQ.JbwXi_cKElYn09Q31Pow6iecx6FRUnHuTQHq2UuQulk'
// FAZER REQUISIÇÃO PRO BANCO DE DADOS INTERMEDIADO PELA URL
const SUPABASE_URL = 'https://wlxwthigsrhywgfyglgd.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANNON_KEY)

function escutaMensagensRealTime(adicionaMensagem) {
  return supabaseClient
  .from('mensagens')
  .on('INSERT', (response) => {
    adicionaMensagem(response.new)
  }).subscribe()
}

export default function ChatPage() {
  const roteamento = useRouter()
  const usuarioLogado = roteamento.query.username
  // Sua lógica vai aqui
  const [mensagem, setMensagem] = React.useState()
  const [listaDeMensagens, setListaDeMensagens] = React.useState([])

  React.useEffect(() => {
    supabaseClient
      .from('mensagens') //a tabela criada no supabase
      .select('*') //todos os elementos da tabela
      .order('id', { ascending: false }) //METODO DA BIBLIOTECA DO SUPABASE
      .then((response) => {
        setListaDeMensagens(response.data)
      })

      escutaMensagensRealTime((novaMensagem) => {
        console.log(novaMensagem)
        //o react não diz para esse trecho de código que a lista de mensagens está sendo atualizada, para isso, no setListadeMensagens devemos passar uma função com retorno para contornar o problema
        setListaDeMensagens((listaDeMensagensAtual) => {
          return [
            novaMensagem,
            ...listaDeMensagensAtual,
          ]
        })
      })

      
  }, [])

  function handleNovaMensagem(novaMensagem) {
    // se a mensagem tiver ao menos um caracter, a lógica prossegue
    if (novaMensagem.length >= 1) {
      const mensagem = {
        //id: listaDeMensagens.length + 1,
        de: usuarioLogado,
        texto: novaMensagem
      }

      supabaseClient
        .from('mensagens')
        .insert([mensagem])
        .then((response) => {
          
        })
        setMensagem('')

        /* 
          supabaseClient
          .from('usuarios')
          .insert(
            usuarios.map((usuario) => {
              return {
                nick: usuario.nick,
                senha: usuario.senha
              }
            }))
        .then((response) =>{})
        */
    }
    else {
      console.error('não é possível enviar mensagem vazia')
    }
  }

  const [loading, setLoading] = React.useState(true)

  function Loading() {
    if (loading == false) {
      return (
        <Box
          styleSheet={{
            display: 'none',
            visibility: 'hidden',
            opacity: 0
          }}
        >
          <Image
            src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif'
            styleSheet={{
              width: '50px',
              opacity: 0.5
            }}
          />
        </Box>
      )
    }

    return (
      <Box
        styleSheet={{
          width: '100%',
          height: '100vh',
          position: 'fixed',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif'
          styleSheet={{
            width: '50px',
            opacity: 0.5
          }}
        />
      </Box>
    )
  }
  // ./Sua lógica vai aqui
  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: 'url(https://wallpapercave.com/wp/wp4341592.jpg)',
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.primary[400],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '1.5rem',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals['100'],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          <MessageList mensagens={listaDeMensagens} setLoading={setLoading} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* 
          listaDeMensagens.map((el) => {
            return (
              <li 
              key={el.id}>
                {el.de}:{el.texto}
              </li>
            )
          })
          */}
            <TextField
              value={mensagem}
              onChange={(event) => {
                //console.log(event)
                return setMensagem(event.target.value)
              }}
              onKeyPress={(event) => {
                if (event.key == 'Enter') {
                  //PRA CANCELAR A QUEBRA DE LINHA PADRÃO DO TEXTAREA
                  event.preventDefault()
                  console.log('enter')
                  //pega todos os valores anteriores ja gravadoes em listaDeMensagens, e acrescenta a nov amsg
                  handleNovaMensagem(mensagem)
                }
              }
              }
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals['000'],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[900],
              }}
            />

            <Box
              styleSheet={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >

              <ButtonSendSticker onStickerClick={(sticker) => handleNovaMensagem(`:sticker: ${sticker}`)} />

              <Image
                id='enviarMensagem'
                onClick={(event) => {
                  event.preventDefault()
                  //pega todos os valores anteriores ja gravadoes em listaDeMensagens, e acrescenta a nov amsg
                  handleNovaMensagem(mensagem)
                }}
                src='https://cdn-icons-png.flaticon.com/512/81/81799.png'
                styleSheet={{
                  Width: '30px',
                  Height: '30px',
                  padding: '2px',
                  backgroundColor: appConfig.theme.colors.primary[300],
                  borderRadius: '50%',
                  cursor: 'pointer',
                  marginLeft: '12px',
                  marginRight: '12px'
                }}
              />


            </Box>
          </Box>
        </Box>
      </Box>

      <Loading />
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading4' styleSheet={{color: appConfig.theme.colors.neutrals[999]}}>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  //console.log('MessageList', props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["900"],
        marginBottom: '1.6rem',
        overflowX: 'hidden',
      }}
      onChange={
        props.setLoading(false)
      }
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[200],
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Image
                styleSheet={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong" styleSheet={{ minWidth: '100px' }}>
                {mensagem.de}
              </Text>

              {/* data + deletar mensagem container */}
              <Box
                styleSheet={{
                  width: '100%',
                  display: 'flex',
                  alignItens: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Text
                  styleSheet={{
                    fontSize: '10px',
                    marginLeft: '8px',
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {(new Date().toLocaleTimeString())} - {(new Date().toLocaleDateString())}

                </Text>

                <Image
                  id={mensagem.id}
                  onClick={(event) => {
                    console.log(props.setter)
                    const filtrarMensagem = props.mensagens.filter((el) => el.id == event.target.id)
                    console.log(filtrarMensagem)
                  }}
                  src='https://cdn0.iconfinder.com/data/icons/controls-and-navigation-arrows-3/24/146-512.png'
                  styleSheet={{
                    width: '10px',
                    cursor: 'pointer'
                  }}
                />
              </Box>

            </Box>
            {mensagem.texto.startsWith(':sticker:')
            //if temario
              ? (
                <Image 
                  src={mensagem.texto.replace(':sticker:', '')} 
                  styleSheet={{width: '150px'}}
                  />
              )
              : (
                mensagem.texto
              )
            }            
          </Text>
        )
      })}

    </Box>
  )
}