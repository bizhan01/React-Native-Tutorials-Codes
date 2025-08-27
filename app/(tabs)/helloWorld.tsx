import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#6A11CB', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.welcomeText}>Hello World!</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.messageContainer}>
        <ThemedText style={styles.messageText}>
          Welcome to your new React Native app!
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerText}>
          Built with ❤️ using React Native
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 40,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#6A11CB',
    textShadowColor: 'rgba(106, 17, 203, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  messageContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#6A11CB',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  messageText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#2D3436',
    lineHeight: 32,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#636E72',
    fontStyle: 'italic',
  },
});