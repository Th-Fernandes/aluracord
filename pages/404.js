import { Box, Button, Text, Image } from "@skynexui/components";
import appConfig from "../config.json";

export default function HomePage() {
  return(
      <Box
        as="section"
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',       
          backgroundColor: appConfig.theme.colors.neutrals[700],
          
        }}
      >
      {/* error content */}
      <Box
        styleSheet={{
          width: 'min(90%, 700px)',
          backgroundColor: appConfig.theme.colors.neutrals[999],
          borderRadius: '16px',
          padding: '16px',
        }}
      >
        <Image
        styleSheet={{
          margin: '0 auto',
        }}
          src={`https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e2027a5b-c927-4cec-a2dc-679654061840/da15qfv-dec0f001-dc7b-4d34-9fb1-40f51ab5283d.png/v1/crop/w_247,h_350,x_0,y_0,scl_0.085724161769789,strp/crazy_diamond_by_frizzylizzy98_da15qfv-350t.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ0OSIsInBhdGgiOiJcL2ZcL2UyMDI3YTViLWM5MjctNGNlYy1hMmRjLTY3OTY1NDA2MTg0MFwvZGExNXFmdi1kZWMwZjAwMS1kYzdiLTRkMzQtOWZiMS00MGY1MWFiNTI4M2QucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.4RbiTGDDubTvYb10R6Smzv8SyY17RQXDXvm-B5ZBUTc`}
          />

          <Box
            styleSheet={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
            styleSheet={{
              width: '80px',
              marginRight: '32px'
            }}
              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-L6EiNhCVmE6zieg053mRwsPzFXsSG7jKd3AKRHqKFNWaoEPkqpMtFcx67GYr4J2k0bI&usqp=CAU`}
            />

            <Text
              styleSheet={{
                color: appConfig.theme.colors.neutrals['000']
              }}
            >
              Não foi possível encontrar sua página. Sinto muito :(
            </Text>
          </Box>
      </Box>

      </Box>
  )
}