import { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Text, ActivityIndicator, Animated } from 'react-native';
import auth from '@react-native-firebase/auth';
import { FirebaseError } from 'firebase/app';

export default function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [scaleAnim] = useState(new Animated.Value(0.8));

    Animated.parallel([
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
        })
    ]).start();

    const signUp = async () => {
        setLoading(true);
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            alert('Verifique o seu email!');
        } catch (e: any) {
            const err = e as FirebaseError;
            alert('Não foi possivel cadastrar: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const signIn = async () => {
        setLoading(true);
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (e: any) {
            const err = e as FirebaseError;
            alert('Não foi possivel entrar: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Animated.View 
                style={[
                    styles.background, 
                    { 
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }] 
                    }
                ]}
            />
            
            <KeyboardAvoidingView behavior='padding' style={styles.keyboardView}>
                <Animated.View 
                    style={[
                        styles.content,
                        { 
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }] 
                        }
                    ]}
                >
                    <View style={styles.logoPlaceholder}>
                        <Text style={styles.logoText}>🔐</Text>
                    </View>
                    
                    <Text style={styles.title}>Bem-vindo de volta</Text>
                    <Text style={styles.subtitle}>Faça login para continuar</Text>
                    
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            placeholder='Email'
                            placeholderTextColor="#aaa"
                        />
                        <View style={styles.inputLine} />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholder='Senha'
                            placeholderTextColor="#aaa"
                        />
                        <View style={styles.inputLine} />
                    </View>
                    
                    {loading ? (
                        <ActivityIndicator size="large" color="#6C63FF" style={styles.loader} />
                    ) : (
                        <>
                            <TouchableOpacity 
                                style={styles.loginButton} 
                                onPress={signIn}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.buttonText}>Entrar</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={styles.signupButton} 
                                onPress={signUp}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.signupButtonText}>Criar Conta</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                </Animated.View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#6C63FF',
        transform: [{ scale: 1.2 }],
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        marginHorizontal: 30,
        padding: 30,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    logoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#6C63FF',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    logoText: {
        fontSize: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 25,
    },
    input: {
        height: 50,
        fontSize: 16,
        color: '#333',
        paddingHorizontal: 0,
    },
    inputLine: {
        height: 1,
        backgroundColor: '#ddd',
        marginTop: 5,
    },
    loginButton: {
        backgroundColor: '#6C63FF',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#6C63FF',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupButton: {
        borderWidth: 1,
        borderColor: '#6C63FF',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    signupButtonText: {
        color: '#6C63FF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPassword: {
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
    },
    loader: {
        marginVertical: 30,
    },
});