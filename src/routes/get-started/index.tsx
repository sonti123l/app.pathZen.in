import { createFileRoute } from '@tanstack/react-router'
import Auth from '@/components/core/LoginComponent'

export const Route = createFileRoute('/get-started/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><Auth/></div>
}
