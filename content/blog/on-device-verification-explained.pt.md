---
title: "A verificação no dispositivo, explicada (nada sai do seu iPhone)"
description: "Por que o Verifyco roda inteiramente no seu iPhone: como funciona a análise forense no dispositivo, o que o Neural Engine faz, nuvem vs dispositivo — e por que nada é enviado, nunca."
slug: on-device-verification-explained
date: 2026-06-08
updated: 2026-07-01
author: "Equipe Verifyco"
tags: ["iOS", "Pesquisa", "Guias"]
image: /uploads/blog/1000012581.png
imageAlt: "Verifyco executando uma análise privada no dispositivo num iPhone"
---

A maioria das ferramentas de checagem de mídia funciona igual: você envia seu
arquivo a um servidor, os modelos deles o analisam na nuvem e você recebe um
resultado. O Verifyco não. Cada sinal roda **localmente no seu iPhone**, e suas
fotos e vídeos nunca saem do aparelho. Veja o que isso significa, como é
possível e por que importa — principalmente para o material sensível que as
pessoas mais precisam checar.

## Por que "no dispositivo" importa

- **Privacidade.** O que você mais quer verificar costuma ser o mais sensível —
  uma foto privada, um clipe vazado, uma imagem íntima que te mandaram. Análise
  no dispositivo significa que nada disso toca o servidor de terceiros, nunca
  fica num log e não pode vazar de uma violação que não é sua.
- **Velocidade.** Sem upload, sem fila, sem ida e volta. A análise começa no
  instante em que você escolhe o arquivo — e isso importa quando é um vídeo 4K,
  não uma miniatura.
- **Funciona offline.** No avião, com sinal ruim ou num ambiente seguro sem
  rede — funciona do mesmo jeito, porque não há chamada de rede a fazer.
- **Sem conta, sem rastro.** Nada para cadastrar, nada ligando um arquivo
  checado à sua identidade.

> Não há servidor. Não há upload. Não há conta. Sua mídia fica no seu celular,
> ponto final.

## O que "no dispositivo" significa de verdade

Os iPhones modernos trazem um **Neural Engine** dedicado — silício construído
especificamente para rodar modelos de aprendizado de máquina com rapidez e
eficiência. Os frameworks **Core ML** e **Vision** da Apple permitem que um app
execute redes neurais direto nesse hardware.

O Verifyco usa isso para fazer localmente o que outras ferramentas mandam para
uma GPU num datacenter: análise neural de rostos e cenas, transformadas de
frequência, leitura de metadados e hash do arquivo — tudo na memória do próprio
telefone, em segundos, sem transmitir um único byte da sua mídia.

## Os cinco sinais, rodando localmente

O Verifyco funde **cinco sinais forenses independentes** numa única pontuação de
confiança de 0 a 100:

1. **Content Credentials** — a procedência C2PA, o "recibo" assinado da câmera.
2. **Forense de metadados** — EXIF, consistência de codificação e anomalias de
   taxa de quadros.
3. **Análise facial neural** — Apple Vision, quadro a quadro, atrás dos
   artefatos que os geradores deixam.
4. **Análise de movimento** — fluxo óptico e consistência temporal entre quadros.
5. **Análise de frequência** — a impressão espectral DCT dos modelos de difusão
   e GAN, invisível ao olho.

Nenhuma camada é decisiva sozinha — essa é a questão. É a fusão de vários sinais
independentes que torna o veredicto robusto: enganar um é fácil, enganar todos ao
mesmo tempo é difícil. (O que cada camada pega na prática:
[como saber se uma imagem foi gerada por IA](/pt/blog/how-to-tell-if-an-image-is-ai-generated)
e [5 sinais de que um vídeo foi deepfakado](/pt/blog/5-signs-a-video-has-been-deepfaked).)

## Nuvem vs dispositivo: a comparação

| | Verificação na nuvem | No dispositivo (Verifyco) |
| --- | --- | --- |
| Sua mídia | Enviada a um servidor | Nunca sai do seu celular |
| Velocidade | Upload + fila + download | Começa na hora |
| Offline | Não | Sim |
| Conta necessária | Geralmente | Não |
| Exposição de privacidade | Logs de servidor, violações | Nenhuma além do seu aparelho |

A única coisa que a nuvem pode oferecer é um modelo central gigante. Mas para a
verificação forense, os sinais que importam — procedência, metadados, padrões de
frequência, consistência temporal — rodam perfeitamente no dispositivo, e o
ganho de privacidade é enorme.

## Perguntas frequentes

**No dispositivo é tão preciso quanto na nuvem?** Para esses sinais forenses,
sim — a análise é a mesma matemática; só muda o *lugar*. A detecção é sempre um
alvo móvel (os geradores melhoram), e por isso o Verifyco funde vários sinais e
melhora com as atualizações do app.

**Acaba com a minha bateria?** Uma análise é uma rajada curta de trabalho do
Neural Engine — comparável a aplicar um filtro de foto pesado, e pronto.

**Quais iPhones?** Qualquer iPhone moderno com Neural Engine (iOS 17+). Chips
mais novos só terminam mais rápido.

**Vocês veem meus arquivos alguma vez?** Não. Não existe nenhum caminho de
upload — o recurso que enviaria sua mídia para nós simplesmente não existe.

## Conclusão

A verificação no dispositivo te dá uma segunda opinião de nível forense,
**privada por concepção e rápida o bastante para usar de verdade** — antes de
confiar numa mídia, e antes de compartilhá-la. Novo no assunto? Comece por
[o que é um deepfake](/pt/blog/what-is-a-deepfake).
