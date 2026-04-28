import { createFileRoute } from '@tanstack/react-router'
import B99Trivia from '../components/B99Trivia'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <B99Trivia />
}
