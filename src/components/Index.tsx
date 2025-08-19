import React, { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Pressable, StyleSheet, Animated, Easing } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const carreras = [
  { label: 'Ingeniería en Informática', value: 'Ingenieria en Informatica' },
  { label: 'Ingeniería Civil', value: 'Ingenieria Civil' },
  { label: 'Medicina', value: 'Medicina' },
  { label: 'Administración de Empresas', value: 'Administracion de Empresas' },
];

const Index = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    contrasenia: '',
    carrera: ''
  });
  const [isFocus, setIsFocus] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleView = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: isLogin ? 1 : -1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      })
    ]).start(() => {
      setIsLogin(!isLogin);
      // Reset form when toggling
      setFormData({
        nombreUsuario: '',
        contrasenia: '',
        carrera: ''
      });

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const IniciarSesion = async () => {
    if (formData.nombreUsuario == '' || formData.contrasenia == '') {
      alert("Campos Vacíos. Rellene los campos para continuar");
      return;
    }
    try {
      const result = await fetch("http://127.0.0.1:3000/api/usuario/IniciarSesion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await result.json();

      if (data.success) {
        router.push('/home');
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al conectar con el servidor");
    }
  };

  const Registrarse = async () => {
    if (formData.nombreUsuario == '' || formData.contrasenia == '' || formData.carrera == '') {
      alert("Campos Vacíos. Rellene todos los campos para continuar");
      return;
    }
    try {
      const result = await fetch("http://127.0.0.1:3000/api/usuario/crearUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await result.json();
      if (data.success) {
        alert("Usuario creado con éxito, ahora inicia sesión");
        setIsLogin(true);
      } else {
        alert(data.message || "Error al crear usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al conectar con el servidor");
    }
  };

  return (
    <View style={styles.container}>
      {isLogin ? (
        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: [0, 0, 50]
                })
              }]
            }
          ]}
        >
          <Text style={styles.title}>Iniciar Sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={formData.nombreUsuario}
            onChangeText={(text) => handleInputChange('nombreUsuario', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={formData.contrasenia}
            onChangeText={(text) => handleInputChange('contrasenia', text)}
          />

          <Pressable style={styles.button} onPress={IniciarSesion}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </Pressable>

          <Pressable onPress={toggleView}>
            <Text style={styles.toggleText}>¿No tienes cuenta? Regístrate</Text>
          </Pressable>
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: [-50, 0, 0]
                })
              }]
            }
          ]}
        >
          <Text style={styles.title}>Registro</Text>

          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={formData.nombreUsuario}
            onChangeText={(text) => handleInputChange('nombreUsuario', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={formData.contrasenia}
            onChangeText={(text) => handleInputChange('contrasenia', text)}
          />

          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: '#4285f4' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={carreras}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Selecciona tu carrera' : '...'}
            searchPlaceholder="Buscar..."
            value={formData.carrera}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              handleInputChange('carrera', item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? '#4285f4' : '#999'}
                name="book"
                size={20}
              />
            )}
          />

          <Pressable style={styles.button} onPress={Registrarse}>
            <Text style={styles.buttonText}>Crear cuenta</Text>
          </Pressable>

          <Pressable onPress={toggleView}>
            <Text style={styles.toggleText}>¿Ya tienes cuenta? Inicia sesión</Text>
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center'
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 8,
  },
  button: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#4285f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#4285f4',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Index;