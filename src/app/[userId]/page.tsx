import { gql } from '@/__generated__'
import QueryResult from '@/components/lib/query-result'
import { getClient } from '@/lib/graphql-client'

interface UserDetailPageProps {
  params: {
    userId: string
  }
}

import * as z from 'zod'

const formSchema = z.object({
  id: z.number(),
  displayName: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
})

// GET_USER query to retrieve a single user
const GET_USER = gql(`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      username
      displayName
    }
  }
`)

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { data, loading, error } = await getClient().query({
    query: GET_USER,
    variables: { id: parseInt(params.userId) },
  })

  return (
    <main>
      <h1>User Detail Page</h1>
      <QueryResult data={data} loading={loading} error={error}>
        ID: {params.userId} - {data.user.username} - {data.user.displayName}
      </QueryResult>
    </main>
  )
}
