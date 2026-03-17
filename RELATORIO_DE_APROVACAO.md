# Relatório de Conformidade - Protótipo Calculadora Mobile

## 1. Requisitos Funcionais (RF)

RF-01. Inserir números de 0 a 9
Implementação: Função handleNumber recebe o parâmetro num e concatena à string do operando ativo.

RF-02. Escolha de operação (+, -, *, /, √)
Implementação: Função handleOperator define o estado do operador; função handleSquareRoot processa a raiz quadrada.

RF-03. Armazenamento de dados
Implementação: Uso de estados firstNumber, operator e secondNumber para segregação dos valores da operação.

RF-04. Cálculo via botão "="
Implementação: Função calculate executa o processamento matemático com base no operador armazenado.

RF-05. Exibição da expressão e resultado
Implementação: Variável displayString renderiza o fluxo da conta no visor; histórico registra o resultado final.

RF-09. Histórico de contas
Implementação: Estado history armazena o array de strings exibido via ScrollView.

RF-06. Botão C (Limpar)
Implementação: Função clear redefine todos os estados para valores vazios.

RF-07. Botão DEL (Apagar)
Implementação: Função handleDelete utiliza o método slice(0, -1) para remover o último caractere da string ativa.

RF-08. Bloqueio de divisão por zero
Implementação: Validação condicional em calculate que interrompe o fluxo e exibe Alert.alert.

RF-10. Raiz quadrada de número negativo
Implementação: Verificação em handleSquareRoot que impede o cálculo em valores menores que zero.

## 2. Regras de Negócio (RN)

RN-01. Dois operandos por vez
Implementação: Lógica de entrada restrita às variáveis firstNumber e secondNumber.

RN-02. Ignorar operador sem primeiro número
Implementação: Bloqueio inicial na função handleOperator, exceto para o sinal de subtração para definição de números negativos.

RN-03. Trava de cálculo incompleto
Implementação: Verificação de preenchimento de todos os campos obrigatórios em calculate antes de processar o resultado.

RN-04. Reinício de conta após resultado
Implementação: Flag isResult limpa os estados ao inserir um novo número após a conclusão de um cálculo.

RN-05. Reutilização de resultado como operando
Implementação: Se um operador for selecionado após o cálculo, o resultado é mantido como firstNumber para a próxima operação.

## 3. Requisitos de Interface e Critérios de Aceitação

RI-01 a RI-04. Interface
Implementação: Layout composto por ScrollView para histórico e View para visor de entrada. Teclado funcional utilizando componentes Button nativos para garantir área de toque e feedback.

CA-01 a CA-07. Critérios de Aceitação
Implementação: O sistema processa corretamente os casos de teste para soma, subtração, multiplicação, divisão, raiz e tratamentos de erro definidos (divisão por zero e raiz negativa).

---
Conclusão: O protótipo atende integralmente às especificações do documento de requisitos.