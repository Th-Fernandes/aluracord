import React, { useEffect } from "react";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useRouter } from "next/router";
import appConfig from "../config.json";

function Titulo(props) {
    const Tag = props.tag || 'h1'

    return (
      <>
        <Tag>{props.children}</Tag>

        <style jsx>
          {`
            ${Tag} {
              color: ${appConfig.theme.colors.neutrals['000']};
              font-size: 24px;
              font-weight: 600;
            }
          `}
        </style>
      </>
    );
}

//class HomePage extends React.Component {
//render() {
//return(
//<div>
//<GlobalStyle />
//<Title tag='h1'>Boas vindas de volta</Title>
//<h2>Discord - aluraTrix</h2>
//</div>
//)
//}
//}
//export default HomePage

export let userValue;


export default function PaginaInicial() {
  //const username = 'th-fernandes';
  const [username, setUsername] = React.useState()
  const roteamento = useRouter()

  const [githubInfo, setgithubInfo] = React.useState()

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])

  return (
    <>     
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://wallpapercave.com/wp/wp4341592.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            onSubmit = {(el) => {
            el.preventDefault()
            //troca para a pagina de chat sem reload (spa)
            roteamento.push('./chat')
          }}
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2" >Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '16px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            {/* <input value={username} onChange={(el) => setUsername(el.target.value)}/> */}

            <TextField
              id='user'
              value={username}
              onChange={(el) => {
                const inputValue = el.target.value
                if(inputValue.length > 2) {
                  userValue = inputValue
                  console.log(userValue)
                  return setUsername(inputValue)
                }  
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[900],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
              styleSheet={{
                marginTop: '8px',
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '280px',
              padding: '16px',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                border: 'none',
                borderRadius: '50%',
                marginBottom: '16px',
                width: '248px',
                height: '248px',
              }}
              src={`https://github.com/${username}.png`}

            />
            <Text
              variant="body4"
              styleSheet={{
                backgroundImage:"url(http://cdn.onlinewebfonts.com/svg/img_212716.png)" ,
                width: '80%',
                minHeight: '33px',
                margin: '0 auto',
                textAlign: 'center',
                fontSize: '20px',
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px',
                textTransform: 'uppercase'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}

        </Box>

        
      </Box>

    </>
  );
}