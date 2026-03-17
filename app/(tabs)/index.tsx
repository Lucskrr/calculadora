import React, { useState } from 'react';
import { Alert, Button, ScrollView, Text, View } from 'react-native';

export default function Calculator() {
  const [firstNumber, setFirstNumber] = useState('');
  const [operator, setOperator] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isResult, setIsResult] = useState(false);

  function handleNumber(num: number) {
    if (isResult) {
      setFirstNumber(String(num));
      setOperator('');
      setSecondNumber('');
      setIsResult(false);
    } else if (operator) {
      setSecondNumber(secondNumber + String(num));
    } else {
      setFirstNumber(firstNumber + String(num));
    }
  }

  function handleOperator(selectedOperator: string) {
    if (!firstNumber && selectedOperator !== '-') return;

    if (!firstNumber && selectedOperator === '-') {
      setFirstNumber('-');
      return;
    }

    setOperator(selectedOperator);
    setIsResult(false);
  }

  function handleSquareRoot() {
    let targetNumber = operator ? secondNumber : firstNumber;
    if (!targetNumber || targetNumber === '-') return;

    let val = parseFloat(targetNumber);
    if (val < 0) {
      Alert.alert("Erro", "Número inválido para raiz quadrada.");
      clear();
      return;
    }

    let res = Math.sqrt(val);
    const expressao = `√${targetNumber} = ${res}`;
    setHistory([expressao, ...history]);

    if (operator) {
      setSecondNumber(String(res));
    } else {
      setFirstNumber(String(res));
      setIsResult(true);
    }
  }

  function clear() {
    setFirstNumber('');
    setOperator('');
    setSecondNumber('');
    setIsResult(false);
  }

  function clearHistory() {
    setHistory([]);
  }

  function handleDelete() {
    if (isResult) {
      setIsResult(false);
    }

    if (secondNumber) {
      setSecondNumber(secondNumber.slice(0, -1));
    } else if (operator) {
      setOperator('');
    } else if (firstNumber) {
      setFirstNumber(firstNumber.slice(0, -1));
    }
  }

  function calculate() {
    if (!firstNumber || !operator || !secondNumber || secondNumber === '-') return;

    const n1 = parseFloat(firstNumber);
    const n2 = parseFloat(secondNumber);
    let result = 0;

    if (operator === '/' && n2 === 0) {
      Alert.alert("Erro", "Não é possível dividir por zero.");
      clear();
      return;
    }

    switch (operator) {
      case '+': result = n1 + n2; break;
      case '-': result = n1 - n2; break;
      case '*': result = n1 * n2; break;
      case '/': result = n1 / n2; break;
    }

    const expressao = `${firstNumber} ${operator} ${secondNumber} = ${result}`;
    setHistory([expressao, ...history]);

    setFirstNumber(String(result));
    setOperator('');
    setSecondNumber('');
    setIsResult(true);
  }

  const displayString = `${firstNumber} ${operator} ${secondNumber}`.trim() || '0';

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 40, backgroundColor: '#fff' }}>

      <View style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Histórico:</Text>
        <ScrollView>
          {history.map((item, index) => (
            <Text key={index} style={{ fontSize: 16, color: '#555', marginBottom: 5 }}>{item}</Text>
          ))}
        </ScrollView>
        {history.length > 0 && <Button title="Limpar Histórico" onPress={clearHistory} />}
      </View>

      <View style={{ marginBottom: 20, borderWidth: 1, borderColor: '#000', padding: 20 }}>
        <Text style={{ fontSize: 32, textAlign: 'right', color: '#000' }}>{displayString}</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Button title=" C " onPress={clear} />
        <Button title=" DEL " onPress={handleDelete} />
        <Button title="  √  " onPress={handleSquareRoot} />
        <Button title="  /  " onPress={() => handleOperator('/')} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Button title="  7  " onPress={() => handleNumber(7)} />
        <Button title="  8  " onPress={() => handleNumber(8)} />
        <Button title="  9  " onPress={() => handleNumber(9)} />
        <Button title="  *  " onPress={() => handleOperator('*')} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Button title="  4  " onPress={() => handleNumber(4)} />
        <Button title="  5  " onPress={() => handleNumber(5)} />
        <Button title="  6  " onPress={() => handleNumber(6)} />
        <Button title="  -  " onPress={() => handleOperator('-')} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Button title="  1  " onPress={() => handleNumber(1)} />
        <Button title="  2  " onPress={() => handleNumber(2)} />
        <Button title="  3  " onPress={() => handleNumber(3)} />
        <Button title="  +  " onPress={() => handleOperator('+')} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={{ width: 40 }} />
        <Button title="  0  " onPress={() => handleNumber(0)} />
        <View style={{ width: 40 }} />
        <Button title="  =  " onPress={calculate} />
      </View>

    </View>
  );
}