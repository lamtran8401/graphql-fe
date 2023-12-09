import { User } from '@/__generated__/graphql'
import QueryResult from '@/components/lib/query-result'
import { getClient } from '@/lib/graphql-client'
import Link from 'next/link'
import { gql } from '../__generated__'

// GET_USERS query to retrieve all users
const GET_USERS = gql(`
  query GetUsers {
    users {
      id
      username
      displayName
    }
  }
`)

export default async function Home() {
  const { data, loading, error } = await getClient().query({
    query: GET_USERS,
  })

  return (
    <main>
      <QueryResult data={data} loading={loading} error={error}>
        {data?.users?.map((user: User) => (
          <div key={user.id}>
            <Link href={`/${user.id}`} className="">
              {user.id} - {user.username} - {user.displayName}
            </Link>
          </div>
        ))}
      </QueryResult>
    </main>
  )
}
