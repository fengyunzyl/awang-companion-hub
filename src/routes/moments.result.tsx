import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/moments/result')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/moments/result"!</div>
}
