import { createFileRoute } from '@tanstack/react-router'
import Login from '@/components/core/LoginComponent'


export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><Login/></div>
}
