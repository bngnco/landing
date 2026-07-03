---
title: "Como saber se um vídeo foi gerado por IA (guia 2026)"
description: "Modelos classe Sora já criam vídeo a partir de texto. Aprenda a saber se um vídeo foi gerado por IA: falhas de física, artefatos de textura, checagem de procedência e ferramentas forenses."
slug: how-to-tell-if-a-video-is-ai-generated
date: 2026-07-02
updated: 2026-07-03
author: "Equipe Verifyco"
tags:
  - Detecção de IA
  - Guias
image: ''
imageAlt: "Análise de um vídeo no iPhone para saber se foi gerado por IA"
---

Deepfake significava uma coisa só: um vídeo real com o rosto trocado. Essa era acabou. Os modelos de texto-para-vídeo — Sora, Veo e seus sucessores de código aberto — agora geram **cenas inteiras a partir de um prompt**: as pessoas, a sala, a luz, o movimento de câmera… nada disso jamais existiu. Esses vídeos totalmente sintéticos falham de um jeito diferente dos face swaps, então merecem sua própria lista de checagem.

É exatamente este guia. (Se você está checando um vídeo de uma *pessoa real específica* dizendo algo, veja também os sinais de troca de rosto em [como identificar um vídeo deepfake](/pt/blog/how-to-spot-a-deepfake-video) — os casos reais misturam os dois.)

## Primeiro, os sinais fáceis no quadro

Baixe o clipe se puder (gravação de tela recomprime e esconde evidências), reproduza devagar, em tela cheia, com brilho alto. Procure:

- **Texto e placas.** Mundos gerados ainda estropiam a escrita — letreiros, camisas, placas de carro e rótulos que parecem certos de relance e se dissolvem em pseudo-letras na pausa. Texto legível e consistente ao longo do clipe continua genuinamente difícil de falsificar.
- **Mãos, dedos e trocas de objetos.** Dedos que se fundem, talheres que derretem na comida, objetos que atravessam as mãos. A interação entre coisas segue sendo o ponto fraco.
- **Pessoas ao fundo.** Figurantes saem baratos para o modelo, mas são mal supervisionados: repare em pedestres que deslizam, se repetem ou se fundem uns nos outros.
- **Simetria e física dos reflexos.** Espelhos, vidraças, água e óculos escuros frequentemente refletem uma cena *plausível* em vez *da* cena. Se um reflexo contradiz o mundo, é decisivo.
- **Movimento liso demais.** Vídeo gerado costuma ter câmera flutuante, onírica, e sujeitos levemente desacelerados, sem peso — nada trepida, nada treme de forma crível.

## Depois, cheque a permanência dos objetos

É a classe de sinais mais confiável para vídeo totalmente gerado. Objetos reais persistem; os gerados apenas *tendem a* persistir.

Percorra o clipe acompanhando um único objeto — uma xícara, um botão, uma tatuagem, um brinco. Em vídeo de IA ele pode **mudar de forma, pular de posição, sumir ou virar outra coisa** entre planos ou até entre segundos. Conte coisas: dedos, rodas, pés de cadeira, folhas de janela. Reconte cinco segundos depois. Vídeo real nunca se contradiz; modelos generativos ainda se contradizem — principalmente depois dos dez segundos, e é também por isso que tantos clipes sintéticos são suspeitosamente curtos e cheios de cortes.

[[cta]]

## Cheque a procedência, não só os pixels

- **Fonte primeiro.** Quem postou, onde mais existe, algum veículo confiável publicou? Um clipe dramático que só existe numa conta anônima é bandeira vermelha antes de olhar um único quadro.
- **Content Credentials.** Algumas ferramentas de IA (incluindo modelos classe Sora) anexam metadados C2PA declarando o conteúdo como sintético — e algumas plataformas os exibem. A ausência não prova nada (metadados somem com prints e re-uploads), mas a presença é uma resposta rápida e honesta. Explicamos o sistema inteiro em [Content Credentials (C2PA), explicado](/pt/blog/content-credentials-c2pa-explained).
- **Marcas-d'água.** Vários geradores embutem marcas visíveis ou invisíveis (como o SynthID). As invisíveis exigem o verificador do próprio fornecedor — útil quando acusa, mudo sobre todos os outros geradores.

## Quando os olhos não bastam: análise forense

Cada sinal acima desbota a cada versão dos modelos, e a pesquisa mostra repetidamente que humanos identificam vídeo sintético de alta qualidade em taxas pouco melhores que o acaso. A abordagem robusta é a das ferramentas forenses: **combinar sinais independentes em vez de confiar em um só.**

O **[Verifyco](https://apps.apple.com/app/id6772592963)** executa essa fusão direto no seu iPhone: consistência temporal e fluxo óptico (as coisas se movem e persistem como objetos reais?), análise no domínio da frequência (a impressão estatística que os modelos de difusão deixam), forense de metadados e codificação, checagem de procedência e análise facial neural quando há rostos. Você recebe uma pontuação de confiança de 0 a 100 com o detalhamento por camada — e honestidade quando a evidência é inconclusiva, o que é comum em clipes sociais muito recomprimidos. Também dá para colar um link de uma plataforma social em vez de baixar o arquivo. Tudo roda **no dispositivo**: o clipe nunca sai do telefone ([por que isso importa](/pt/blog/on-device-verification-explained)).

### Checklist rápido

1. Baixe o arquivo original; reproduza a 0,25×.
2. Pause em **texto, mãos, reflexos, pessoas ao fundo**.
3. Acompanhe um objeto pelo clipe — ele **persiste**?
4. Cheque **quem postou** e se existe em algum lugar confiável.
5. Procure **Content Credentials / marcas-d'água**.
6. Rode a **análise forense no dispositivo** e leia o detalhamento por camada, não só o veredicto.

## Perguntas frequentes

**Dá para detectar vídeo gerado por IA de forma confiável em 2026?**
Nenhum método isolado é confiável. Combinar inspeção visual, procedência e forense multissinal dá evidência forte na maioria dos casos — mas espere "inconclusivo" em re-uploads muito comprimidos, e trate a saída de qualquer ferramenta como evidência, não como prova.

**Qual é a checagem única mais rápida?**
Pause em qualquer texto da cena e depois confira os reflexos. Os dois continuam errando de forma consistente em vídeo gerado e levam menos de um minuto.

**Por que tantos vídeos de IA são curtos?**
Gerações longas acumulam erros de consistência — objetos derivam, rostos mutam, cenas se contradizem. Muitos clipes sintéticos ficam abaixo de ~10–15 segundos ou se escondem atrás de cortes rápidos justamente para não se entregarem.

**Marca-d'água ou credencial é prova em algum sentido?**
A presença de uma credencial de IA é evidência forte de que é sintético. A ausência não prova absolutamente nada — a maioria dos clipes reais *e* falsos da internet já teve os metadados removidos pelas plataformas.

## Conclusão

O vídeo totalmente gerado por IA quebrou a velha regra do "ver para crer", mas não quebrou a verificação: física, permanência, procedência e forense continuam pegando o que o olho perde. Crie o hábito — **verifique antes de compartilhar** — e mantenha à mão o guia irmão para imagens estáticas: [como saber se uma imagem foi gerada por IA](/pt/blog/how-to-tell-if-an-image-is-ai-generated).
