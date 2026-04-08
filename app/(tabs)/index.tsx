import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    const expressao = `√${targetNumber} = ${res.toFixed(2)}`;
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

  function handleDelete() {
    if (isResult) setIsResult(false);
    if (secondNumber) setSecondNumber(secondNumber.slice(0, -1));
    else if (operator) setOperator('');
    else if (firstNumber) setFirstNumber(firstNumber.slice(0, -1));
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

  const CalcButton = ({ title, onPress, color = '#f0f0f0', textColor = '#000' }: any) => (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: color }]} 
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );

  const displayString = `${firstNumber} ${operator} ${secondNumber}`.trim() || '0';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Histórico</Text>
        <ScrollView>
          {history.map((item, index) => (
            <Text key={index} style={styles.historyItem}>{item}</Text>
          ))}
        </ScrollView>
        {history.length > 0 && (
          <TouchableOpacity onPress={() => setHistory([])}>
            <Text style={styles.clearHistoryText}>Limpar Histórico</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.display}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {displayString}
        </Text>
      </View>

      <View style={styles.keyboard}>
        <View style={styles.row}>
          <CalcButton title="C" color="#ff1111" textColor="#fffff" onPress={clear} />
          <CalcButton title="DEL" color="#ffbb11" onPress={handleDelete} />
          <CalcButton title="√" color="#44bb11" onPress={handleSquareRoot} />
          <CalcButton title="/" color="#1188ff" textColor="#fff" onPress={() => handleOperator('/')} />
        </View>

        <View style={styles.row}>
          <CalcButton title="7" onPress={() => handleNumber(7)} />
          <CalcButton title="8" onPress={() => handleNumber(8)} />
          <CalcButton title="9" onPress={() => handleNumber(9)} />
          <CalcButton title="*" color="#4488ff" textColor="#fff" onPress={() => handleOperator('*')} />
        </View>

        <View style={styles.row}>
          <CalcButton title="4" onPress={() => handleNumber(4)} />
          <CalcButton title="5" onPress={() => handleNumber(5)} />
          <CalcButton title="6" onPress={() => handleNumber(6)} />
          <CalcButton title="-" color="#4488ff" textColor="#fff" onPress={() => handleOperator('-')} />
        </View>

        <View style={styles.row}>
          <CalcButton title="1" onPress={() => handleNumber(1)} />
          <CalcButton title="2" onPress={() => handleNumber(2)} />
          <CalcButton title="3" onPress={() => handleNumber(3)} />
          <CalcButton title="+" color="#4488ff" textColor="#fff" onPress={() => handleOperator('+')} />
        </View>

        <View style={styles.row}>
          <View style={{ flex: 2.1 }}>
            <CalcButton title="0" onPress={() => handleNumber(0)} />
          </View>
          <View style={{ flex: 1.05 }}>
             <CalcButton title="=" color="#00C851" textColor="#fff" onPress={calculate} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  historyContainer: {
    height: 120, 
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  historyTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9999',
    marginBottom: 5,
  },
  historyItem: {
    fontSize: 14,
    color: '#688',
  },
  clearHistoryText: {
    textAlign: 'center',
    color: '#5577ff',
    fontSize: 12,
    marginTop: 5,
  },
  display: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 10,
  },
  displayText: {
    fontSize: 35,
    color: '#fff',
  },
  keyboard: {
    flex: 1, 
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    flex: 1, 
    marginBottom: 8,
  },
  button: {
    flex: 1, 
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
    height: '100%', 
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});