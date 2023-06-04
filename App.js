import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Image, Text } from 'react-native';
import { styles } from './style';

const API_KEY = '8fea875db776ddfc97976e0ad2458d6e';

const Formulario = () => {
  const [cidade, setCidade] = useState('');
  const [clima, setClima] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric`);

      if (response.ok) {
        const data = await response.json();
        setClima(data);
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao buscar o clima.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar o clima.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./img/logo.png')} style={styles.logo} />
      <TextInput 
        value={cidade}
        onChangeText={setCidade}
        style={styles.input}
        placeholder="Digite o nome da cidade"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ backgroundColor: '#FFFF', padding: 10, color: '#4F709C', borderRadius: 20 }}>
          Buscar clima 
        </Text>
      </TouchableOpacity>
       
      {clima && (
        <View style={{ color: '#FFFF', marginTop: 10 }}>
          <Text>Local: {clima.name}</Text>
          <Text>Temperatura: {clima.main.temp}°C</Text>
          <Text>Condição: {clima.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
};

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#4F709C', alignContent:'center', justifyContent:'center' }}>
      <Formulario />
    </View>
  );
}
