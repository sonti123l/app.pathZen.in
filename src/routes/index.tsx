import { createFileRoute } from '@tanstack/react-router'
import PathZenApp from '@/components/core/Index'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <PathZenApp/>
    </div>
  )
}
