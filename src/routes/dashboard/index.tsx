import { createFileRoute } from '@tanstack/react-router'
import AppLayout from '@/components/layout/AppLayout'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <AppLayout />
    </div>
  )
}
