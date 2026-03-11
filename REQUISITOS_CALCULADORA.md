# Requisitos mínimos — Calculadora Mobile

## 1) Objetivo

Desenvolver uma calculadora mobile que execute operações matemáticas básicas com foco na lógica.

## 2) Escopo mínimo

A aplicação deve realizar estas operações:

- Adição (`+`)
- Subtração (`-`)
- Multiplicação (`*`)
- Divisão (`/`)
- Módulo (`mod`, resto da divisão)

## 3) Requisitos funcionais

RF-01. O usuário deve conseguir inserir números de 0 a 9.

RF-02. O usuário deve conseguir escolher uma operação entre `+`, `-`, `*`, `/` e `mod`.

RF-03. O sistema deve armazenar:

- primeiro número
- operador
- segundo número

RF-04. Ao pressionar `=`, o sistema deve calcular o resultado da operação selecionada.

RF-05. O sistema deve exibir o resultado no visor.

RF-06. O botão `C` (limpar) deve resetar toda a conta atual.

RF-07. O botão `DEL` (apagar) deve remover apenas o último caractere digitado.

RF-08. Em divisão por zero, o sistema deve bloquear o cálculo e mostrar mensagem de erro: `Não é possível dividir por zero`.

RF-10. Em `mod` com divisor zero, o sistema deve bloquear o cálculo e mostrar mensagem de erro: `Não é possível calcular módulo com zero`.

## 4) Regras de negócio

RN-01. A calculadora opera com dois operandos por vez.

RN-02. Se o usuário pressionar operador sem ter digitado o primeiro número, o sistema ignora a ação.

RN-03. Se o usuário pressionar `=` sem ter os dois números completos, o sistema não calcula.

RN-04. Após mostrar resultado, se o usuário digitar número, inicia nova conta.

RN-05. Após mostrar resultado, se o usuário escolher operador, o resultado vira o primeiro número da próxima conta.

## 5) Requisitos de interface (mínimos)

RI-01. Deve existir um visor no topo para mostrar expressão e resultado.

RI-02. Deve existir teclado com botões:

- Números `0` a `9`
- `+`, `-`, `*`, `/`, `mod`
- `=`
- `C`
- `DEL`

RI-03. Os botões devem ter tamanho adequado para toque em tela mobile.

RI-04. Feedback visual ao toque.

## 6) Critérios de aceitação

CA-01. Dado `7 + 3`, ao pressionar `=`, o resultado deve ser `10`.

CA-02. Dado `9 - 4`, ao pressionar `=`, o resultado deve ser `5`.

CA-03. Dado `6 * 8`, ao pressionar `=`, o resultado deve ser `48`.

CA-04. Dado `20 / 5`, ao pressionar `=`, o resultado deve ser `4`.

CA-05. Dado `10 mod 3`, ao pressionar `=`, o resultado deve ser `1`.

CA-06. Dado `5 / 0`, ao pressionar `=`, o sistema deve informar erro e não quebrar a aplicação.

CA-07. Dado `5 mod 0`, ao pressionar `=`, o sistema deve informar erro e não quebrar a aplicação.
