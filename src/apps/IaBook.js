import React, { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import { Box, Stack, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { styled } from '@mui/system';
import ChatInput from '../components/Chatinput';
import ColiaApi from '../apis/coliaApi';
import CircularProgress from '@mui/material/CircularProgress'
import loadingPan from '../assets/lotties/loading.json';
import PredefineMessage from '../components/PredefineMessage';

const BookImage = styled('img')({
  margin: '0 auto',
  display: 'block',
  padding: '10px'
});


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const predefinedPrompt = [
  {
    content: 'Qual o impacto da mudança de hábitos no bem-estar pessoal e profissional a longo prazo?',
    type: 'prompt',
  },
  {
    content: `Quais são os principais desafios que uma pessoa enfrenta ao tentar mudar um hábito?`,
    type: 'prompt',
  },
  {
    content: 'De que maneira o suporte social influencia o processo de mudança de hábitos?',
    type: 'prompt',
  },
];

export default function App() {
  const [sending, setSending] = useState(false);
  const inputRef = useRef(null);
  const [content, setContent] = useState(null);
  const [predefinedPrompted, setPredefinedPrompted] = useState(false);
  const coliaApi = new ColiaApi()

  const handleOnSendMsg = async question => {
    setSending(true);
    const response = await coliaApi.book('habitos_atomicos', question)
    console.log(response)
    const responseHtml = formatResponseToHtml(response['response'])
    const content = `<h2>${question}</h2>${responseHtml}`
    setContent(content)
    setSending(false)
  }

  const formatResponseToHtml = (response) => {
    // Escapa caracteres HTML para evitar injeção de HTML
    const escapeHtml = text => text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    // Converte Markdown **negrito** para HTML <strong>
    const convertBoldMarkdownToHtml = text => text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Dividir a resposta em parágrafos
    const paragraphs = response.split('\n\n');

    // Processar cada parágrafo
    const htmlParagraphs = paragraphs.map(paragraph => {
      // Tratar listas numeradas
      if (paragraph.match(/^\d\./)) {
        const listItems = paragraph.split('\n').map(item => `<li>${convertBoldMarkdownToHtml(escapeHtml(item.slice(3)))}</li>`).join('');
        return `<ol>${listItems}</ol>`;
      } else {
        // Converter Markdown para HTML e escapar caracteres HTML
        return `<p>${convertBoldMarkdownToHtml(escapeHtml(paragraph))}</p>`;
      }
    });

    // Juntar os parágrafos processados em um único string HTML
    return htmlParagraphs.join('');
  }

  const handleClickPredefinedPrompt = predefinedPrompt => {
    console.log(predefinedPrompt)
    predefinedPrompt.type === 'prompt' ? handleOnSendMsg(predefinedPrompt.content) : inputRef.current.focus();

    setPredefinedPrompted(true);
  };



  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'block', height: '90vh', overflowY: 'auto', }} >
        <Box sx={{ my: 4, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
          {!content ? (

            <BookImage
              srcSet={`https://m.media-amazon.com/images/I/81eT2pjx4jL._AC_UF1000,1000_QL80_.jpg?w=200&fit=crop&auto=format&dpr=2 2x`}
              src={`https://m.media-amazon.com/images/I/81eT2pjx4jL._AC_UF1000,1000_QL80_.jpg?w=200&fit=crop&auto=format`}
              alt="Livro Habitos atomicos"
              loading="lazy"
              width="100px"
            />
          ) : ("")}

          <Typography variant="h4" component="h1" sx={{ mb: 2, textAlign: 'center' }}>
            Hábitos Atômicos IA
          </Typography>
          <Typography component="p" sx={{textAlign: 'center' }}>Transforme sua vida com pequenas mudanças: encontre insights de 'Hábitos Atômicos' com uma simples pergunta direcionada</Typography>
        </Box>
        {sending && (
          <Stack
            direction="column"
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            mb={1}
            mt={1}
            sx={
              {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }
            }
          >
             <CircularProgress />
            <Typography fontFamily="Google Sans" fontWeight="300" fontSize="12px" color="#614646">
              carregando...
            </Typography>
          </Stack>)}
        {!predefinedPrompted && (
          <Stack direction="column-reverse" alignItems="center" justifyContent="center" width="100%" spacing={2}>
            {predefinedPrompt &&
              predefinedPrompt.map((prePrompt, index) => (
                <Box key={index} width="85%" marginBottom="25%">
                  <PredefineMessage
                    onClick={() => {
                      handleClickPredefinedPrompt(prePrompt);
                    }}
                    variant="extended"
                  >
                    <div dangerouslySetInnerHTML={{ __html: prePrompt.content }}></div>
                  </PredefineMessage>
                </Box>
              ))}
          </Stack>
        )}
        {content ? (
          <Typography
            variant="body"
            component='article'
            backgroundColor='rgba(28, 131, 225, 0.1)'
            padding='16px'
            paddingBottom="50px"
            borderRadius="15px"
            gutterBottom>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </Typography>
        ) : ("")}

      </Box>
      <Stack
        width="100%"
        direction="row"
        position="fixed"
        left="0"
        bottom="0"
        display="block"
      >
        <ChatInput sending={sending} inputRef={inputRef} onSendMessage={handleOnSendMsg} />

      </Stack>
    </Container >
  );
}
