import { createFileRoute } from '@tanstack/react-router'
import LoginMotionCard from '@/components/core/Login'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <LoginMotionCard />
    </div>
  )
}
