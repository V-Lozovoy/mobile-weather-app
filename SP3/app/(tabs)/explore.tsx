import { StyleSheet, Text, View } from 'react-native'

// ДАНО — заглушка, не чіпайте. Пошук приїде в SP4; сьогодні Explore існує, щоб
// у TODO(2) було що показати в другому табі.
export default function ExploreScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.hint}>Тут буде пошук міст — у SP4.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f6f8',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  hint: {
    fontSize: 15,
    color: '#6b7280',
    marginTop: 8,
  },
})
