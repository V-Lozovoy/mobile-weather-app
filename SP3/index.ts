// ДАНО — не змінюйте.
// Точка входу, названа в "main" у package.json. Вона передає App.tsx нативному хосту,
// саме тому App.tsx — єдина точка входу, яку ви чіпаете. P2 замінить цей файл на точку
// входу, яку приносить роутер; сьогодні роутера немає.
import { registerRootComponent } from 'expo'

import App from './App'

registerRootComponent(App)
