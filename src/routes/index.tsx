import { createFileRoute } from '@tanstack/react-router'
import Auth from '@/components/core/LoginComponent'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Auth />
    </div>
  )
}
